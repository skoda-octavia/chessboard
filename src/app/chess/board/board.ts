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



export class Board {
    fields: Field[][] = [];
    width: number = 0;
    height: number = 0;
    anyButtonClicked: boolean = false;
    markedField: any = null;
    colorMap: any = null;
    


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
            console.log('markPossible moves:', field);
            if (field.piece == null) { field.markedPossibleMove = true;}
            //if piece same color
            else if  (field.piece.color != pieceColor) { field.markedToCapture = true;}
            else { }
        }
    }

    canQueenSideCastle(pieceColor: PieceColor): boolean {
        if (pieceColor == PieceColor.White) { return this.canWhiteQueenCastle() }
        else if (pieceColor == PieceColor.Black) { return this.canBlackQueenCastle() }
        else {
            console.error("given color is none");
        }
        return true;
    }
    canBlackQueenCastle() {
        return true;
    }

    canWhiteQueenCastle(): boolean {
        
        // king and rook on places
        if (
            !(this.fields[7][0].piece instanceof WhiteRook) ||
            !(this.fields[7][4].piece instanceof WhiteKing)
        ) { return false;}
        
        // king and rook moved
        if (
            this.fields[7][0].piece.alreadyMoved ||
            this.fields[7][4].piece.alreadyMoved
        ) { return false;}

        // fields occupied
        if (
            this.fields[7][1].piece ||
            this.fields[7][2].piece ||
            this.fields[7][3].piece
        ) { return false; }
        
        

        return true;
    }

    firstButtonClicked(height: number, width: number) : void {
        //mark
        if (this.fields[height][width].piece) {
            this.markedField = this.fields[height][width];
            var possibleMoves = this.markedField.piece.possibleMoves(this.colorMap);
            //console.log('possibleFields,', possibleMoves);
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

    move(height: number, width: number) {
        this.colorMap
        [this.markedField.piece.fieldHeight]
        [this.markedField.piece.fieldWidth] =
            PieceColor.None;
        this.colorMap[height][width] = this.markedField.piece.color; 
        
        this.markedField.piece.moveTo(height, width);

        this.fields[height][width].piece = this.markedField.piece;
        console.log('new piece: ', this.fields[height][width].piece);
        this.markedField.piece = null;
    }

    capture(height: number, width: number) {
        this.fields[height][width].piece = null;
        this.move(height, width);
        console.log('color  map: ', this.colorMap);
        
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

    unmarkButtons(): void {
        this.anyButtonClicked = false;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.fields[i][j].unmark();
            }
        }
    }

    setBasePosition() {
        this.fields[0][0].setPiece(new BlackRook(0, 0));
        this.fields[0][1].setPiece(new BlackKnight(0, 1));
        this.fields[0][2].setPiece(new BlackBishop(0, 2));
        this.fields[0][3].setPiece(new BlackQueen(0, 3));
        this.fields[0][4].setPiece(new BlackKing(0, 4, this));
        this.fields[0][5].setPiece(new BlackBishop(0, 5));
        this.fields[0][6].setPiece(new BlackKnight(0, 6));
        this.fields[0][7].setPiece(new BlackRook(0, 7));
        // for (let i = 0; i < this.width; i++) { this.fields[1][i].setPiece(new BlackPawn()); }

        // for (let i = 0; i < this.width; i++) { this.fields[6][i].setPiece(new WhitePawn()); }
        
        this.fields[7][0].setPiece(new WhiteRook(7, 0));
        this.fields[7][1].setPiece(new WhiteKnight(7, 1));
        this.fields[7][2].setPiece(new WhiteBishop(7, 2));
        this.fields[7][3].setPiece(new WhiteQueen(7, 3));
        this.fields[7][4].setPiece(new WhiteKing(7, 4, this));
        this.fields[7][5].setPiece(new WhiteBishop(7, 5));
        this.fields[7][6].setPiece(new WhiteKnight(7, 6));
        this.fields[7][7].setPiece(new WhiteRook(7, 7));
        

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
    }
}
