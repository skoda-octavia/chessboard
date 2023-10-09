import { Board } from "src/app/chess/board/board";
import { Field } from "src/app/chess/field/field";
import { PieceColor } from "../../../../piece";
import { Rook } from "../rook";

export class WhiteRook extends Rook {
    iconPath: string = "assets/white_rook.svg";
    color: PieceColor = PieceColor.White;

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board);
    }
}
