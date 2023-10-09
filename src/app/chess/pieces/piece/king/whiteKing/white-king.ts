import { Board } from "src/app/chess/board/board";
import { Field } from "src/app/chess/field/field";
import { PieceColor } from "../../../piece";
import { King } from "../king";

export class WhiteKing extends King {
    iconPath: string = "assets/white_king.svg"
    color: PieceColor = PieceColor.White;


    override moveTo(height: number, width: number): void {
        if (this.fieldHeight == 7 && this.fieldWidth == 4 && height == 7) {
            if (width == 6) {
                this.moveRook(7, 7, 7, 5)
            }
            else if (width == 2) {
                this.moveRook(7, 0, 7, 3)
            }
        }
        
        
        this.fieldHeight = height;
        this.fieldWidth = width;

        if (!this.alreadyMoved) {
            this.alreadyMoved = true;
        }
    }

    constructor(fieldHeight: number, fieldWidth: number, board: Board) {
        super(fieldHeight, fieldWidth, board)
    }
}
