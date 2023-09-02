import { PieceColor } from "../../../../piece";
import { Rook } from "../rook";

export class BlackRook extends Rook {
    iconPath: string = "assets/black_rook.svg";
    color: PieceColor = PieceColor.Black;

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth)
    }
}

