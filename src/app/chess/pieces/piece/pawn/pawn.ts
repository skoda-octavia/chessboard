import { Board } from "src/app/chess/board/board";
import { Field } from "src/app/chess/field/field";
import { Piece, PieceColor } from "../../piece";

export abstract class Pawn extends Piece {

    abstract movingDirection: number;
    abstract startingRow: number;
    leftEnPassant: boolean = false;
    rightEnPassant: boolean = false;


    differentColorPiece(y: number, x: number, colorMap: PieceColor[][]): boolean {
        var color = colorMap[y][x]
        if (color != PieceColor.None && color != this.color) { return true }
        return false;

    }

    possibleMoves(colorBoard: PieceColor[][]): number[][] {
        var possibleMoves = [];
        var capturingFields = [
            [this.fieldHeight + this.movingDirection, this.fieldWidth + 1],
            [this.fieldHeight + this.movingDirection, this.fieldWidth - 1]
        ]
        for (const capturingField of capturingFields) {
            if (this.correctField(8, 8, capturingField[0], capturingField[1]) &&
                this.differentColorPiece(capturingField[0], capturingField[1], colorBoard)
            ) {
                possibleMoves.push(capturingField)
            }
        }


        var nextY = this.fieldHeight + this.movingDirection
        var nextX = this.fieldWidth
        var possibleMovingFields = [[nextY, nextX]] 
        if (this.fieldHeight == this.startingRow) {
            possibleMovingFields.push([nextY + this.movingDirection, this.fieldWidth])
        }
        for (const movingField of possibleMovingFields) {
            nextY = movingField[0];
            nextX = movingField[1];
            if (colorBoard[nextY][nextX] == PieceColor.None) { possibleMoves.push([nextY, nextX]) }
        }

        if (this.rightEnPassant) { possibleMoves.push([this.fieldHeight + this.movingDirection, this.fieldWidth + 1]) }
        if (this.leftEnPassant) { possibleMoves.push([this.fieldHeight + this.movingDirection, this.fieldWidth - 1]) }
        

        return possibleMoves
        
    }

    markEnPassant(field: Field, right: boolean) {
        if (field.piece != null) {
            if (field.piece instanceof Pawn && field.piece.color != this.color) {
                if (right) { field.piece.rightEnPassant = true }
                else {field.piece.leftEnPassant = true}
            }
        }
    }

    override moveTo(height: number, width: number): void {
        if (this.fieldHeight == this.startingRow && Math.abs(height - this.fieldHeight) == 2) {
            if (this.fieldWidth != 0) {
                var leftField = this.board.fields[height][width - 1]
                this.markEnPassant(leftField, true)
            }
            if (this.fieldWidth != 7) {
                var rightField = this.board.fields[height][width + 1]
                this.markEnPassant(rightField, false)
            }
        }
        
        this.fieldHeight = height;
        this.fieldWidth = width;
    }

    anyPieceMoved() {
        this.leftEnPassant = false;
        this.rightEnPassant = false;
    }
    


    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board);
    }
}
