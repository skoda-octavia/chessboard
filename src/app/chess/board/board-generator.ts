import { Field } from "../field/field";
import { Board } from "./board";
import { BlackBishop } from "../pieces/piece/infiniteRangePiece/bishop/blackBishop/black-bishop";
import { WhiteBishop } from "../pieces/piece/infiniteRangePiece/bishop/whiteBishop/white-bishop";
import { BlackQueen } from "../pieces/piece/infiniteRangePiece/queen/blackQueen/black-queen";
import { WhiteQueen } from "../pieces/piece/infiniteRangePiece/queen/whiteQueen/white-queen";
import { BlackRook } from "../pieces/piece/infiniteRangePiece/rook/blackRook/black-rook";
import { WhiteRook } from "../pieces/piece/infiniteRangePiece/rook/whiteRook/white-rook";
import { BlackKing } from "../pieces/piece/king/blackKing/black-king";
import { WhiteKing } from "../pieces/piece/king/whiteKing/white-king";

import { BlackKnight } from "../pieces/piece/knight/blackKnight/black-knight";
import { WhiteKnight } from "../pieces/piece/knight/whiteKnight/white-knight";
import { WhitePawn } from "../pieces/piece/pawn/whitePawn/white-pawn";
import { BlackPawn } from "../pieces/piece/pawn/blackPawn/black-pawn";

export class BoardGenerator {
    board: Board


    setBaseBoard() : void {
        this.board.height = 8;
        this.board.width = 8;
        var nextSquareWhite = true;
        for (let i = 0; i < this.board.width; i++) {
            this.board.fields.push([]);
            for (let j = 0; j < this.board.height; j++) {
                var field = new Field(nextSquareWhite, i, j);
                field.board = this.board;
                this.board.fields[i].push(field);
                nextSquareWhite = !nextSquareWhite;
            }
            if (this.board.width % 2 === 0) {
                nextSquareWhite = !nextSquareWhite;
            }
        }
    }



    setBasePosition() {
        this.board.fields[0][0].setPiece(new BlackRook(0, 0, this.board));
        this.board.fields[0][1].setPiece(new BlackKnight(0, 1, this.board));
        this.board.fields[0][2].setPiece(new BlackBishop(0, 2, this.board));
        this.board.fields[0][3].setPiece(new BlackQueen(0, 3, this.board));
        this.board.fields[0][4].setPiece(new BlackKing(0, 4, this.board));

        this.board.fields[0][5].setPiece(new BlackBishop(0, 5, this.board));
        this.board.fields[0][6].setPiece(new BlackKnight(0, 6, this.board));
        this.board.fields[0][7].setPiece(new BlackRook(0, 7, this.board));
        for (let i = 0; i < this.board.width; i++) { this.board.fields[1][i].setPiece(new BlackPawn(1, i, this.board)); }

        for (let i = 0; i < this.board.width; i++) { this.board.fields[6][i].setPiece(new WhitePawn(6, i, this.board)); }

        this.board.fields[7][0].setPiece(new WhiteRook(7, 0, this.board));
        this.board.fields[7][1].setPiece(new WhiteKnight(7, 1, this.board));
        this.board.fields[7][2].setPiece(new WhiteBishop(7, 2, this.board));
        this.board.fields[7][3].setPiece(new WhiteQueen(7, 3, this.board));
        this.board.fields[7][4].setPiece(new WhiteKing(7, 4, this.board));

        this.board.fields[7][5].setPiece(new WhiteBishop(7, 5, this.board));
        this.board.fields[7][6].setPiece(new WhiteKnight(7, 6, this.board));
        this.board.fields[7][7].setPiece(new WhiteRook(7, 7, this.board));
    }

    setBoard() {
        this.setBaseBoard();
        this.setBasePosition();
    }

    constructor(board: Board) {
        this.board = board;
    }
}