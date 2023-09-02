import { Piece, PieceColor } from "../../../piece";
import { InfiniteRangePiece } from "../infinite-range-piece";

export abstract class Bishop extends InfiniteRangePiece {

    directions: number[][] = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ] 
    
    possibleMoves(colorBoard: PieceColor[][]): number[][] {

        return this.possibleInfiniteRangeMoves(colorBoard);

    }

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth);
    }
}
