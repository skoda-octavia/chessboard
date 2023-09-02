import { Bishop } from "../bishop";
import { PieceColor } from "../../../../piece";

export class WhiteBishop extends Bishop {
    iconPath: string = "assets/white_bishop.svg";
    color: PieceColor = PieceColor.White;

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth)
    }
}
