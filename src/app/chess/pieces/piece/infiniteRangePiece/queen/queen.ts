import { PieceColor } from "../../../piece";
import { InfiniteRangePiece } from "../infinite-range-piece";

export abstract class Queen extends InfiniteRangePiece {

    directions: number[][] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ];

    possibleMoves(colorBoard: PieceColor[][]): number[][] {
        return this.possibleInfiniteRangeMoves(colorBoard);
        
    }
}
