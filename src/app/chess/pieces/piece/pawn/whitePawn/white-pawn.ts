import { Board } from "src/app/chess/board/board";
import { PieceColor } from "../../../piece";
import { Pawn } from "../pawn";

export class WhitePawn extends Pawn {
    color: PieceColor = PieceColor.White;
    iconPath: string = "assets/white_pawn.svg"
    override movingDirection: number = -1
    override startingRow: number = 6

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board);
    }
}
