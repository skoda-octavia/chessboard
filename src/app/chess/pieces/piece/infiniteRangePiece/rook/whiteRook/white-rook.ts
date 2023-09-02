import { PieceColor } from "../../../../piece";
import { Rook } from "../rook";

export class WhiteRook extends Rook {
    iconPath: string = "assets/white_rook.svg";
    color: PieceColor = PieceColor.White;

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth)
    }
}
