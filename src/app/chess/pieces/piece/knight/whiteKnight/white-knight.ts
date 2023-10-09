import { Board } from "src/app/chess/board/board";
import { Field } from "src/app/chess/field/field";
import { PieceColor } from "../../../piece";
import { Knight } from "../knight";

export class WhiteKnight extends Knight {
    iconPath: string = "assets/white_knight.svg";
    color: PieceColor = PieceColor.White;

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board);
    }
}
