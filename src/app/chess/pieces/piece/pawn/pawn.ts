import { Board } from "src/app/chess/board/board";
import { Piece, PieceColor } from "../../piece";

export abstract class Pawn extends Piece {

    abstract movingDirection: number;
    possibleMoves(colorBoard: PieceColor[][]): number[][] {
        return [[0]]
        
    }
    
    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board);
    }
}
