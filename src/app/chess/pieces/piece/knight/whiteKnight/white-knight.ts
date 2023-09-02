import { PieceColor } from "../../../piece";
import { Knight } from "../knight";

export class WhiteKnight extends Knight {
    iconPath: string = "assets/white_knight.svg";
    color: PieceColor = PieceColor.White;

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth)
    }
}
