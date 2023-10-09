import { Board } from "../board/board";
import { Field } from "../field/field";

export enum PieceColor {
    White = "white",
    Black = "black",
    None = "none"
}



export abstract class Piece {
    abstract iconPath: string;
    fieldHeight: number;
    fieldWidth: number;
    abstract color: PieceColor;
    board: Board;

    correctField(boardHeight: number, boardWidth: number, row: number, column: number) {
        if (!Number.isInteger(row) || row < 0 || row >= boardHeight) {
            return false;
        }
        if (!Number.isInteger(column) || column < 0 || column >= boardWidth) {
            return false;
        }
        return true;
    }

    moveTo(height: number, width: number) {
        this.fieldHeight = height;
        this.fieldWidth = width;
    }

    moveUnveiling(move: number[]): boolean {
        var checkedField = this.board.fields[move[0]][move[1]] 
        var oldPiece = checkedField.piece

        checkedField.piece = this
        this.board.fields[this.fieldHeight][this.fieldWidth].piece = null

        var answer = false

        if (this.color == PieceColor.White && this.board.whiteUnderCheck()) { answer = true }
        else if (this.color == PieceColor.Black && this.board.blackUnderCheck()) { answer = true }
        
        checkedField.piece = oldPiece
        this.board.fields[this.fieldHeight][this.fieldWidth].piece = this
        
        return answer;
    }

    abstract possibleMoves(colorBoard: PieceColor[][]): number[][];

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
        this.board = board
    }
}
