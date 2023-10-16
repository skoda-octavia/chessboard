import { Field } from "../../field/field";
import { Board } from "../board";
import { BoardGenerator } from "../board-generator";

export class pawnTransformationBoard {

    boardGenerator: BoardGenerator;
    board: Board;
    height: number;
    width: number;
    fields: Field[][] = [];

    constructor(height: number, width: number, board: Board) {
        this.board = board;
        this.height = height;
        this.width = width;
        this.boardGenerator = new BoardGenerator()
        this.boardGenerator.setBaseBoard(this, true)
    }

}