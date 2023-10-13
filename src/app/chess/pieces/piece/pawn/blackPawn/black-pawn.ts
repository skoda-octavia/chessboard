import { Board } from "src/app/chess/board/board";
import { PieceColor } from "../../../piece";
import { Pawn } from "../pawn";

export class BlackPawn extends Pawn {
    color: PieceColor = PieceColor.Black;
    iconPath: string = "assets/black_pawn.svg"
    override movingDirection: number = 1
    override startingRow: number = 1; 

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board);
    }
}