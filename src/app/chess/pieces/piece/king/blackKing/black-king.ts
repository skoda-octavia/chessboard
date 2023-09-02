import { Board } from "src/app/chess/board/board";
import { PieceColor } from "../../../piece";
import { King } from "../king";

export class BlackKing extends King {

    iconPath: string = "assets/black_king.svg"
    color: PieceColor = PieceColor.Black;

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }

}
