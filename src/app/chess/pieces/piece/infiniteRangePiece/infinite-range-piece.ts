import { Board } from "src/app/chess/board/board";
import { Field } from "src/app/chess/field/field";
import { Piece, PieceColor } from "../../piece";



export abstract class InfiniteRangePiece extends Piece {
    
    abstract directions: number[][];


    possibleInfiniteRangeMoves(colorBoard: PieceColor[][]): number[][] {
        var boardWidth = colorBoard[0].length;

        var boardHeight = colorBoard.length;
        var possibleMoves = [];

        for (let i = 0; i < this.directions.length; i++) {
            var changeY = this.directions[i][0];
            var changeX = this.directions[i][1];

            var tempY = this.fieldHeight + changeY;
            var tempX = this.fieldWidth + changeX;

            while (this.correctField(boardHeight, boardWidth, tempY, tempX)) {
                var tempColor = colorBoard[tempY][tempX];
                if (tempColor == this.color) { break }
                possibleMoves.push([tempY, tempX]);
                if (tempColor != PieceColor.None) { break; }
                tempY += changeY;
                tempX += changeX;
            }
        }
        return possibleMoves;
    }

    
    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board);
    }
}
