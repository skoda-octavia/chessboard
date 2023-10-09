import { Board } from "src/app/chess/board/board";
import { Field } from "src/app/chess/field/field";
import { PieceColor } from "../../../../piece";
import { Queen } from "../queen";

export class BlackQueen extends Queen {
    iconPath: string = "assets/black_queen.svg";
    color: PieceColor = PieceColor.Black;

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }
}

