import { PieceColor } from "../../../piece";
import { Knight } from "../knight";

export class BlackKnight extends Knight {
    iconPath: string = "assets/black_knight.svg";
    color: PieceColor = PieceColor.Black;

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth)
    }
}
