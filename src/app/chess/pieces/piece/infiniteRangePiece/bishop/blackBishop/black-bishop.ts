import { Bishop } from "../bishop";
import { PieceColor } from "../../../../piece";
import { Field } from "src/app/chess/field/field";
import { Board } from "src/app/chess/board/board";

export class BlackBishop extends Bishop {
    iconPath: string = "assets/black_bishop.svg";
    color: PieceColor = PieceColor.Black;

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }
}