import { Bishop } from "../bishop";
import { PieceColor } from "../../../../piece";
import { Field } from "src/app/chess/field/field";
import { Board } from "src/app/chess/board/board";

export class WhiteBishop extends Bishop {
    iconPath: string = "assets/white_bishop.svg";
    color: PieceColor = PieceColor.White;

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }
}