import { Board } from "src/app/chess/board/board";
import { CastlingPiece } from "../../castlingPiece";
import { Piece, PieceColor } from "../../piece";

export abstract class King extends Piece implements CastlingPiece {

    board: Board;
    alreadyMoved: boolean = false;
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
        var possibleMoves = [];
        var boardHeight = colorBoard.length;
        var boardWidth = colorBoard[0].length;

        for (const direction of this.directions) {
            var tempY = this.fieldHeight + direction[0];
            var tempX = this.fieldWidth + direction[1];
            if (this.correctField(boardHeight, boardWidth, tempY, tempX)) {
                if (this.color != colorBoard[tempY][tempX]) {
                    possibleMoves.push([tempY, tempX])
                }
            }
        }
        var possibleCastlingMoves = this.board.possibleCastlingMoves(this.color)

        return [...possibleMoves, ...possibleCastlingMoves];
    }

    override moveTo(height: number, width: number): void {
        this.fieldHeight = height;
        this.fieldWidth = width;

        if (!this.alreadyMoved) {
            this.alreadyMoved = true;
        }
    }

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth)
        this.board = board;
    }
}
