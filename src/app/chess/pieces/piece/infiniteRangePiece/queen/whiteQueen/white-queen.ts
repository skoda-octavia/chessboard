import { Board } from "src/app/chess/board/board";
import { Field } from "src/app/chess/field/field";
import { PieceColor } from "src/app/chess/pieces/piece";
import { Queen } from "../queen";

export class WhiteQueen extends Queen {
    color: PieceColor = PieceColor.White;
    iconPath: string = "assets/white_queen.svg"

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }
}
