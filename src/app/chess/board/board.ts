import { BoardComponent } from "src/app/board/board.component";
import { Field } from "../field/field";
import { Piece, PieceColor } from "../pieces/piece";
import { BlackKing } from "../pieces/piece/king/blackKing/black-king";
import { WhiteKing } from "../pieces/piece/king/whiteKing/white-king";
import { Pawn } from "../pieces/piece/pawn/pawn";
import { BoardGenerator } from "./board-generator";
import { CastlingOperator } from "./castling-operator";
import { pawnTransformationBoard } from "./pawnTransBoard/PawnTransformationBoard";


export class Board {
    boardGenerator: BoardGenerator;
    castlingOperator: CastlingOperator;
    fields: Field[][] = [];
    width: number;
    height: number;
    anyButtonClicked: boolean = false;
    markedField: any = null;
    movingColor: PieceColor = PieceColor.White;
    pawns: Set<Pawn> = new Set()
    boardComponent: BoardComponent;

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

    possibleEnPassant(field: Field): boolean {
        if (!(this.markedField.piece instanceof Pawn)) {return false}

        if (this.markedField.height != 3 && this.markedField.height != 4) {return false}
        if (field.height != 2 && field.height != 5) {return false}
        if (Math.abs(this.markedField.height - field.height) != 1 || Math.abs(this.markedField.width - field.width) != 1) {return false}

        var neighboringPawnWidth = field.width
        var neighboringPawnHeight = this.markedField.height
        var neighboringField = this.fields[neighboringPawnHeight][neighboringPawnWidth]
        if (!(neighboringField.piece instanceof Pawn) || neighboringField.piece.color == this.movingColor) {return false}


        return true
    }

    markPossibleMoves(possibleMoves: number[][], pieceColor : PieceColor) {
        for (let i = 0; i < possibleMoves.length; i++) {
            var y = possibleMoves[i][0];
            var x = possibleMoves[i][1];
            var field = this.fields[y][x];

            if (this.moveUnveiling(field)) { continue }

            if (field.piece == null && this.possibleEnPassant(field)) {
                field.markedToCapture = true
                continue
            }

            if (field.piece == null) { field.markedPossibleMove = true;}
            else if  (field.piece.color != pieceColor) { field.markedToCapture = true;}
        }
    }

    firstButtonClicked(height: number, width: number) : void {
        if (this.fields[height][width].piece && this.fields[height][width].piece.color == this.movingColor) {
            this.markedField = this.fields[height][width];
            var possibleMoves = this.markedField.piece.possibleMoves(this.generateColorMap());

            this.markPossibleMoves(possibleMoves, this.markedField.piece.color)
            this.fields[height][width].markedToMove = true;
            this.anyButtonClicked = true;
        }
    }

    secondButtonClicked(height: number, width: number) : void {
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

    moveUnveiling(field: Field) : boolean {
        var answer;
        var oldPiece = field.piece
        field.piece = this.markedField.piece
        this.markedField.piece = null
        if (this.check(this.movingColor)) { answer = true }
        else { answer = false }

        this.markedField.piece = field.piece
        field.piece = oldPiece

        return answer;
    }

    fieldsControlled(byColor: PieceColor): Set<Field> {
        var controlledFields = new Set<Field>()
        var tempPiece;
        var colorMap = this.generateColorMap();
        for (let i = 0; i < this.fields.length; i++) {
            for (let j = 0; j < this.fields[0].length; j++) {
                if (this.fields[i][j].piece) {
                    tempPiece = this.fields[i][j].piece;
                    if (tempPiece.color == byColor) {
                        var possibleMoves = tempPiece.possibleMoves(colorMap);
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

    pawnToTransformation() {
        for (const pawn of this.pawns) {if (pawn.fieldHeight == 7 || pawn.fieldHeight == 0) {return pawn}}
        return null
    }

    pawnTransformed(pawn: Pawn, piece: Piece) {
        this.pawns.delete(pawn)
        this.fields[piece.fieldHeight][piece.fieldWidth].piece = piece
        this.movingColor = piece.color
        this.changeMovingColor()
    }

    move(height: number, width: number) {
        this.markedField.piece.moveTo(height, width);

        this.fields[height][width].piece = this.markedField.piece;
        this.markedField.piece = null;

        var pawnToTransform = this.pawnToTransformation() 
        this.unmarkEnPassant()

        if (pawnToTransform) { 
            this.movingColor = PieceColor.None
            this.boardComponent.pawnTransformationBoard.transformation(pawnToTransform)
        }
        
        else { this.changeMovingColor() }
        
    }

    capture(height: number, width: number) {
        if (this.fields[height][width].piece instanceof Pawn) {this.pawns.delete(this.fields[height][width].piece)}
        //only for EnPassant
        if (this.fields[height][width].piece == null) { this.captureEnPassant(height, width) }

        else {this.fields[height][width].piece = null;}
        this.move(height, width);
    }

    captureEnPassant(height: number, width: number) {
        var pawnHeight = this.markedField.height
        var pawnWidth = width
        this.pawns.delete(this.fields[pawnHeight][pawnWidth].piece)
        this.fields[pawnHeight][pawnWidth].piece = null

    }

    check(pieceColor: PieceColor): boolean {
        if (pieceColor == PieceColor.White) { return this.whiteUnderCheck() }
        else {return this.blackUnderCheck()}
    }

    unmarkEnPassant() {
        this.pawns.forEach(pawn => {
            if (pawn.color === this.movingColor) {
                pawn.anyPieceMoved();
            }
        });
    }

    whiteUnderCheck(): boolean {
        var fieldsControlledByBlack = this.fieldsControlled(PieceColor.Black)
        var whiteKingField = this.kingsField(PieceColor.White)
        if (fieldsControlledByBlack.has(whiteKingField)) { return true }
        else { return false }
    }


    blackUnderCheck(): boolean {
        var fieldsControlledByWhite = this.fieldsControlled(PieceColor.White)
        var blackKingField = this.kingsField(PieceColor.Black)
        if (fieldsControlledByWhite.has(blackKingField)) { return true }
        else { return false }
    }


    checkFieldArgs(height: number, width: number) : void {
        if (!Number.isInteger(height) || height < 0 || height >= this.height) {
            console.error(" height: ${height} is invalid", height)
        }
        if (!Number.isInteger(width) || width < 0 && width >= this.width) {
            console.error("width: ${width} is invalid", width)
        }
    }

    kingsField(color: PieceColor) : Field{
        for (let i = 0; i < this.fields.length; i++) {
            for (let j = 0; j < this.fields[0].length; j++) {
                var tempField = this.fields[i][j]
                if (color == PieceColor.White && tempField.piece instanceof WhiteKing) { return tempField }
                else if (color == PieceColor.Black && tempField.piece instanceof BlackKing) { return tempField }
            }
        }
        return new Field(true, 10, 10)
    }


    generateColorMap() {
        var colorMap = [];
        for (let i = 0; i < this.height; i++) {
            var row = [];
            for (let j = 0; j < this.width; j++) {
                if (this.fields[i][j].piece) {row.push(this.fields[i][j].piece.color);}
                else {row.push(PieceColor.None);}
            }
            colorMap.push(row);
        }
        return colorMap;
    }


    constructor(height: number, width: number, boardComponent: BoardComponent) {
        this.boardGenerator = new BoardGenerator();
        this.height = height
        this.width = width
        this.boardGenerator.setDefaultBoard(this)
        this.castlingOperator = new CastlingOperator(this.fields, this);
        this.boardComponent = boardComponent
    }
}
