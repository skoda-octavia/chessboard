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

    correctField(boardHeight: number, boardWidth: number, row: number, column: number) {
        console.log('h, w:', boardHeight, boardWidth);
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

    abstract possibleMoves(colorBoard: PieceColor[][]): number[][];

    constructor(fieldHeight: number, fieldWidth: number) {
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
    }
}
