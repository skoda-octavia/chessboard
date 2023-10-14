import { Board } from "src/app/chess/board/board";
import { CastlingPiece } from "../../castlingPiece";
import { Piece, PieceColor } from "../../piece";

export abstract class King extends Piece implements CastlingPiece {

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

    moveRook(fromY: number, fromX: number, toY: number, toX: number) {
        var tempPiece = this.board.fields[fromY][fromX].piece
        this.board.fields[fromY][fromX].piece = null
        this.board.fields[toY][toX].piece = tempPiece
        tempPiece.moveTo(toY, toX)
    }

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

        if (this.board.markedField == this.board.fields[this.fieldHeight][this.fieldWidth]) {
            var possibleCastlingMoves = this.board.possibleCastlingMoves(this.color)
            return [...possibleMoves, ...possibleCastlingMoves];
        }
        else {
            return possibleMoves
        }
    }



    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }
}
