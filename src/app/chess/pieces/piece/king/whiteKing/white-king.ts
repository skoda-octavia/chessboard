import { Board } from "src/app/chess/board/board";
import { PieceColor } from "../../../piece";
import { King } from "../king";

export class WhiteKing extends King {
    iconPath: string = "assets/white_king.svg"
    color: PieceColor = PieceColor.White;

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }
}
