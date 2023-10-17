import { NONE_TYPE } from "@angular/compiler";
import { Piece } from "../pieces/piece";

export class Field {
    color: string;
    piece: any = null;
    board: any = null;
    width: number = -1;
    height: number = -1;
    markedToMove: boolean = false;
    markedPossibleMove: boolean = false;
    markedToCapture: boolean = false;

    setPiece(newPiece: Piece) {
        this.piece = newPiece;
    }

    unmark() {
        this.markedToMove = false;
        this.markedPossibleMove = false;
        this.markedToCapture = false;
    }

    marked() : boolean {
        return this.markedToCapture || this.markedToMove || this.markedPossibleMove;
    }

    fieldMarked() {
        this.board.buttonClicked(this.height, this.width);
    }

    constructor(white: boolean, height: number, width: number) {
        if (white) { this.color = "burlywood"; }
        else { this.color = "saddlebrown"; }
        this.width = width;
        this.height = height;
    }
}
