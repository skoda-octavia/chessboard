import { Piece, PieceColor } from "../../piece";

export abstract class Knight extends Piece {

    possibleMoves(colorBoard: PieceColor[][]) : number[][] {
        var possibleMoves = [];
        var boardHeight = colorBoard.length;
        console.log("colorBoard: ", colorBoard);
        var boardWidth = colorBoard[0].length;
        var moves = [
            [-2, 1],
            [-1, 2],
            [1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1]
        ]
        for ( let i = 0; i < moves.length; i++) {
            var y = moves[i][0] + this.fieldHeight;
            var x = moves[i][1] + this.fieldWidth;
            if (this.correctField(boardHeight, boardWidth, y, x)) {
                if (this.color != colorBoard[y][x]) {
                    possibleMoves.push([y, x])
                }
            }
        }
        return possibleMoves;
    }

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth);
    }
}
