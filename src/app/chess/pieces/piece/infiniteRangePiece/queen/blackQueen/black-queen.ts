import { PieceColor } from "../../../../piece";
import { Queen } from "../queen";

export class BlackQueen extends Queen {
    iconPath: string = "assets/black_queen.svg";
    color: PieceColor = PieceColor.Black;

    constructor(fieldHeight: number, fieldWidth: number) {
        super(fieldHeight, fieldWidth)
    }
}

