import { BoardComponent } from "src/app/board/board.component";
import { Field } from "../../field/field";
import { Piece, PieceColor } from "../../pieces/piece";
import { BlackBishop } from "../../pieces/piece/infiniteRangePiece/bishop/blackBishop/black-bishop";
import { WhiteBishop } from "../../pieces/piece/infiniteRangePiece/bishop/whiteBishop/white-bishop";
import { BlackQueen } from "../../pieces/piece/infiniteRangePiece/queen/blackQueen/black-queen";
import { WhiteQueen } from "../../pieces/piece/infiniteRangePiece/queen/whiteQueen/white-queen";
import { BlackRook } from "../../pieces/piece/infiniteRangePiece/rook/blackRook/black-rook";
import { WhiteRook } from "../../pieces/piece/infiniteRangePiece/rook/whiteRook/white-rook";
import { BlackKnight } from "../../pieces/piece/knight/blackKnight/black-knight";
import { WhiteKnight } from "../../pieces/piece/knight/whiteKnight/white-knight";
import { Pawn } from "../../pieces/piece/pawn/pawn";
import { Board } from "../board";
import { BoardGenerator } from "../board-generator";

export class pawnTransformationBoard {

    boardGenerator: BoardGenerator;
    boardComponent: BoardComponent;
    height: number;
    width: number;
    fields: Field[][] = [];
    pawn: any = null

    buttonClicked(height: number, width: number) {
        console.log("transformation field", height, width)
        var piece = this.fields[height][width].piece
        piece.fieldHeight = this.pawn.fieldHeight
        piece.fieldWidth = this.pawn.fieldWidth
        this.boardComponent.transformationVisible = false
        this.boardComponent.board.pawnTransformed(this.pawn, piece)
    }

    setTransBoard(color: PieceColor) {
        if (color == PieceColor.White) { this.setForWhite() }
        else {this.setForBlack()}
    }

    setForWhite() {
        this.fields[0][0].setPiece(new WhiteQueen(-1, -1, this.boardComponent.board))
        this.fields[0][1].setPiece(new WhiteRook(-1, -1, this.boardComponent.board))
        this.fields[0][2].setPiece(new WhiteBishop(-1, -1, this.boardComponent.board))
        this.fields[0][3].setPiece(new WhiteKnight(-1, -1, this.boardComponent.board))
    }
    
    setForBlack() {
        this.fields[0][0].setPiece(new BlackQueen(-1, -1, this.boardComponent.board))
        this.fields[0][1].setPiece(new BlackRook(-1, -1, this.boardComponent.board))
        this.fields[0][2].setPiece(new BlackBishop(-1, -1, this.boardComponent.board))
        this.fields[0][3].setPiece(new BlackKnight(-1, -1, this.boardComponent.board))
    }

    transformation(pawn: Pawn) {
        this.setTransBoard(pawn.color)
        this.boardComponent.transformationVisible = true
        this.pawn = pawn
    }

    constructor(height: number, width: number, boardComponent: BoardComponent) {
        this.boardComponent = boardComponent;
        this.height = height;
        this.width = width;
        this.boardGenerator = new BoardGenerator()
        this.boardGenerator.setBaseBoard(this, true)
        this.setForBlack()
    }

}