import { withDebugTracing } from "@angular/router";
import { CastlingPiece } from "../../../castlingPiece";
import { Piece, PieceColor } from "../../../piece";
import { InfiniteRangePiece } from "../infinite-range-piece";


export abstract class Rook extends InfiniteRangePiece implements CastlingPiece {
    
    alreadyMoved: boolean = false;
    directions: number[][] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    possibleMoves(colorBoard: PieceColor[][]): number[][] {
        return this.possibleInfiniteRangeMoves(colorBoard);
    }

    override moveTo(height: number, width: number): void {
    this.fieldHeight = height;
    this.fieldWidth = width;
    
    if (!this.alreadyMoved) {
        this.alreadyMoved = true;
    }
}
        
    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth);
    }
}
