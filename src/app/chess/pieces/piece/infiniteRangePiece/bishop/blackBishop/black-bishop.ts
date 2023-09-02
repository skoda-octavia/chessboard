import { Bishop } from "../bishop";
import { PieceColor } from "../../../../piece";

export class BlackBishop extends Bishop {
    iconPath: string = "assets/black_bishop.svg";
    color: PieceColor = PieceColor.Black;

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth)
    }
}