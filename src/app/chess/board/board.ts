import { Field } from "../field/field";
import { Piece, PieceColor } from "../pieces/piece";
import { BlackBishop } from "../pieces/piece/infiniteRangePiece/bishop/blackBishop/black-bishop";
import { WhiteBishop } from "../pieces/piece/infiniteRangePiece/bishop/whiteBishop/white-bishop";
import { BlackQueen } from "../pieces/piece/infiniteRangePiece/queen/blackQueen/black-queen";
import { WhiteQueen } from "../pieces/piece/infiniteRangePiece/queen/whiteQueen/white-queen";
import { BlackRook } from "../pieces/piece/infiniteRangePiece/rook/blackRook/black-rook";
import { WhiteRook } from "../pieces/piece/infiniteRangePiece/rook/whiteRook/white-rook";
import { BlackKing } from "../pieces/piece/king/blackKing/black-king";
import { WhiteKing } from "../pieces/piece/king/whiteKing/white-king";

import { BlackKnight } from "../pieces/piece/knight/blackKnight/black-knight";
import { WhiteKnight } from "../pieces/piece/knight/whiteKnight/white-knight";
import { CastlingOperator } from "./castling-operator";



export class Board {
    castlingOperator: CastlingOperator;
    fields: Field[][] = [];
    width: number = 0;
    height: number = 0;
    anyButtonClicked: boolean = false;
    markedField: any = null;
    colorMap: any = null;
    whiteInCheck: boolean = true;
    blackInCheck: boolean = true;
    whiteKing: any = null;
    blackKing: any = null;
    movingColor: PieceColor = PieceColor.White;


    changeMovingColor(): void {
        if (this.movingColor == PieceColor.White) { this.movingColor = PieceColor.Black }
        else if (this.movingColor == PieceColor.Black) { this.movingColor = PieceColor.White }
        else {
            console.error("error while changing movingColor")
        }
    }


    buttonClicked(height: number, width: number) : void {
        this.checkFieldArgs(height, width);
        if (this.anyButtonClicked) {
            this.secondButtonClicked(height, width)
        }
        else {
            this.firstButtonClicked(height, width)
        }
    }

    markPossibleMoves(possibleMoves: number[][], pieceColor : PieceColor) {
        for (let i = 0; i < possibleMoves.length; i++) {

            var y = possibleMoves[i][0];
            var x = possibleMoves[i][1];
            var field = this.fields[y][x];

            if (field.piece == null) { field.markedPossibleMove = true;}
            //if piece same color
            else if  (field.piece.color != pieceColor) { field.markedToCapture = true;}
            else { }
        }
    }

    firstButtonClicked(height: number, width: number) : void {
        //mark
        if (this.fields[height][width].piece && this.fields[height][width].piece.color == this.movingColor) {
            this.markedField = this.fields[height][width];
            var possibleMoves = this.markedField.piece.possibleMoves(this.colorMap);
            
            this.markPossibleMoves(possibleMoves, this.markedField.piece.color)
            this.fields[height][width].markedToMove = true;
            this.anyButtonClicked = true;
        }
    }

    secondButtonClicked(height: number, width: number) : void {
        //console.log('sec but field: ', this.fields[height][width]);
        if (!this.fields[height][width].marked()) { }
        if (this.fields[height][width].markedPossibleMove) {
            this.move(height, width)
            this.unmarkButtons();
        }
        else if (this.fields[height][width].markedToCapture) {
            this.capture(height, width)
            this.unmarkButtons();
        }
        else if (this.fields[height][width].markedToMove) {
            this.unmarkButtons();
        }
    }

    fieldsControlled(byColor: PieceColor): Set<Field> {
        var controlledFields = new Set<Field>()
        var tempPiece;
        for (let i = 0; i < this.fields.length; i++) {
            for (let j = 0; j < this.fields[0].length; j++) {
                if (this.fields[i][j].piece) {
                    tempPiece = this.fields[i][j].piece;
                    if (tempPiece.color == byColor) {
                        var possibleMoves = tempPiece.possibleMoves(this.colorMap);
                        for (const field of possibleMoves) {
                            var fieldHeight = field[0]
                            var fieldWidth = field[1]
                            controlledFields.add(this.fields[fieldHeight][fieldWidth]);
                        }
                    }
                }
            }
        }
        return controlledFields
    }

    unmarkButtons(): void {
        this.anyButtonClicked = false;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.fields[i][j].unmark();
            }
        }
    }

    possibleCastlingMoves(color: PieceColor) : number[][] {
        this.generateColorMap();
        
        switch (color) {
            case PieceColor.White:
                return this.castlingOperator.possibleWhiteCastlings();

            case PieceColor.Black:
                return this.castlingOperator.possibleBlackCastlings();
            default:
                console.error("invalid color in possibleCastlingMoves")
            }
        return [[]];
    }

    move(height: number, width: number) {
        this.colorMap
        [this.markedField.piece.fieldHeight]
        [this.markedField.piece.fieldWidth] =
            PieceColor.None;
        this.colorMap[height][width] = this.markedField.piece.color;

        this.markedField.piece.moveTo(height, width);

        this.fields[height][width].piece = this.markedField.piece;
        this.markedField.piece = null;

        this.changeMovingColor()
        this.markCheck()

        console.log("board", this)

    }

    capture(height: number, width: number) {
        this.fields[height][width].piece = null;
        this.move(height, width);

        this.markCheck()

    }

    whiteUnderCheck(): boolean {
        var fieldsControlledByBlack = this.fieldsControlled(PieceColor.Black)
        var whiteKingHeight = this.whiteKing.fieldHeight
        var whiteKingWidth = this.whiteKing.fieldWidth
        var whiteKingField = this.fields[whiteKingHeight][whiteKingWidth]
        if (fieldsControlledByBlack.has(whiteKingField)) { return true }
        else { return false }
    }

    blackUnderCheck(): boolean {
        var fieldsControlledByWhite = this.fieldsControlled(PieceColor.White)
        var blackKingHeight = this.blackKing.fieldHeight
        var blackKingWidth = this.blackKing.fieldWidth
        var blackKingField = this.fields[blackKingHeight][blackKingWidth]
        if (fieldsControlledByWhite.has(blackKingField)) { return true }
        else { return false }
        
    }

    markCheck() {
        if (this.blackUnderCheck()) { this.blackInCheck = true }
        else { this.blackInCheck = false }
        

        if (this.whiteUnderCheck()) { this.whiteInCheck = true }
        else { this.whiteInCheck = false }
    }

    checkFieldArgs(height: number, width: number) : void {
        if (!Number.isInteger(height) || height < 0 || height >= this.height) {
            console.error(" height: ${height} is invalid", height)
        }
        if (!Number.isInteger(width) || width < 0 && width >= this.width) {
            console.error("width: ${width} is invalid", width)
        }
    }

    setBaseBoard() : void {
        this.height = 8;
        this.width = 8;
        var nextSquareWhite = true;
        for (let i = 0; i < this.width; i++) {
            this.fields.push([]);
            for (let j = 0; j < this.height; j++) {
                var field = new Field(nextSquareWhite, i, j);
                field.board = this;
                this.fields[i].push(field);
                nextSquareWhite = !nextSquareWhite;
            }
            if (this.width % 2 === 0) {
                nextSquareWhite = !nextSquareWhite;
            }
        }
    }



    setBasePosition() {
        this.fields[0][0].setPiece(new BlackRook(0, 0, this));
        this.fields[0][1].setPiece(new BlackKnight(0, 1, this));
        this.fields[0][2].setPiece(new BlackBishop(0, 2, this));
        this.fields[0][3].setPiece(new BlackQueen(0, 3, this));
        this.fields[0][4].setPiece(new BlackKing(0, 4, this));
        this.blackKing = this.fields[0][4].piece

        this.fields[0][5].setPiece(new BlackBishop(0, 5, this));
        this.fields[0][6].setPiece(new BlackKnight(0, 6, this));
        this.fields[0][7].setPiece(new BlackRook(0, 7, this));
        // for (let i = 0; i < this.width; i++) { this.fields[1][i].setPiece(new BlackPawn()); }

        // for (let i = 0; i < this.width; i++) { this.fields[6][i].setPiece(new WhitePawn()); }

        this.fields[7][0].setPiece(new WhiteRook(7, 0, this));
        this.fields[7][1].setPiece(new WhiteKnight(7, 1, this));
        this.fields[7][2].setPiece(new WhiteBishop(7, 2, this));
        this.fields[7][3].setPiece(new WhiteQueen(7, 3, this));
        this.fields[7][4].setPiece(new WhiteKing(7, 4, this));
        this.whiteKing = this.fields[7][4].piece;

        this.fields[7][5].setPiece(new WhiteBishop(7, 5, this));
        this.fields[7][6].setPiece(new WhiteKnight(7, 6, this));
        this.fields[7][7].setPiece(new WhiteRook(7, 7, this));


    }

    generateColorMap() {
        var colorMap = [];
        for (let i = 0; i < this.height; i++) {
            var row = [];
            for (let j = 0; j < this.width; j++) {
                if (this.fields[i][j].piece) {
                    row.push(this.fields[i][j].piece.color);
                }
                else {
                    row.push(PieceColor.None);
                }
            }
            colorMap.push(row);
        }
        this.colorMap = colorMap;
        return colorMap;
    }

    constructor() {
        this.setBaseBoard();
        this.setBasePosition();
        this.colorMap = this.generateColorMap();
        this.castlingOperator = new CastlingOperator(this.fields, this);
    }
}
