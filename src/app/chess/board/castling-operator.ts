import { Field } from "../field/field";
import { PieceColor } from "../pieces/piece";
import { BlackRook } from "../pieces/piece/infiniteRangePiece/rook/blackRook/black-rook";
import { WhiteRook } from "../pieces/piece/infiniteRangePiece/rook/whiteRook/white-rook";
import { BlackKing } from "../pieces/piece/king/blackKing/black-king";
import { WhiteKing } from "../pieces/piece/king/whiteKing/white-king";
import { Board } from "./board";

export class CastlingOperator {

    fields: Field[][];
    board: Board;


    possibleWhiteCastlings() : number[][] {
        var possibleWhiteCastlings = []
        if (this.canWhiteQueenSideCastle()) {possibleWhiteCastlings.push([7, 2]);}
        if (this.canWhiteKingSideCastle()) {possibleWhiteCastlings.push([7, 6]);}
        return possibleWhiteCastlings;
    }

    possibleBlackCastlings() : number[][] {
        var possibleBlackCastlings = []
        if (this.canBlackQueenSideCastle()) {possibleBlackCastlings.push([0, 2]);}
        if (this.canBlackKingSideCastle()) {possibleBlackCastlings.push([0, 6]);}
        return possibleBlackCastlings;
    }


    canBlackQueenSideCastle() : boolean {
        if (
            !(this.fields[0][0].piece instanceof BlackRook) ||
            !(this.fields[0][4].piece instanceof BlackKing)
        ) { return false;}

        if ( this.piecesAlreadyMoved([[0, 0], [0, 4]])) { return false;}
        if (this.fieldsOccupied([[0, 1], [0, 2], [0, 3]])) { return false; }
        if (this.fieldsAttacked([[0, 4], [0, 3], [0, 2]], PieceColor.White)) {return false}

        return true;
    }


    canBlackKingSideCastle() : boolean {
        if (
            !(this.fields[0][7].piece instanceof BlackRook) ||
            !(this.fields[0][4].piece instanceof BlackKing)
        ) { return false;}

        if ( this.piecesAlreadyMoved([[0, 7], [0, 4]])) { return false;}
        if (this.fieldsOccupied([[0, 5], [0, 6]])) { return false; }
        if (this.fieldsAttacked([[0, 4], [0, 5], [0, 6]], PieceColor.White)) { return false; }

        return true;
    }
    canWhiteKingSideCastle(): boolean {
        // king and rook on places
        if (
            !(this.fields[7][7].piece instanceof WhiteRook) ||
            !(this.fields[7][4].piece instanceof WhiteKing)
        ) { return false;}

        if ( this.piecesAlreadyMoved([[7, 7], [7, 4]])) { return false;}
        if ( this.fieldsOccupied([[7, 5], [7, 6]])) { return false; }
        if (this.fieldsAttacked([[7, 4], [7, 5], [7, 6]], PieceColor.Black)) { return false; }
        
        return true;
    }

    canWhiteQueenSideCastle(): boolean {
        // king and rook on places
        if (
            !(this.fields[7][0].piece instanceof WhiteRook) ||
            !(this.fields[7][4].piece instanceof WhiteKing)
        ) { return false;}

        if ( this.piecesAlreadyMoved([[7, 0], [7, 4]])) { return false;}
        if ( this.fieldsOccupied([[7, 1], [7, 2], [7, 3]])) { return false; }
        if ( this.fieldsAttacked([[7, 1], [7, 2], [7, 3]], PieceColor.Black)) {return false;}

        return true;
    }


    fieldsAttacked(fieldsToCheck: number[][], byColor: PieceColor): boolean {

        var fieldsControlled = this.board.fieldsControlled(byColor);
        console.log("fields controlled", fieldsControlled)
        for (const fieldToCheck of fieldsToCheck) {
            var field = this.board.fields[fieldToCheck[0]][fieldToCheck[1]]
            if (fieldsControlled.has(field)) {
                return true;
            }
        }
        return false
    }

    piecesAlreadyMoved(fields: number[][], ) : boolean {
        try {
            for(const field of fields) {
                var height = field[0]
                var width = field[1]
                if (this.fields[height][width].piece.alreadyMoved) {return true;}
            }
        }
        catch (error) {
            console.error("invalid fields in castlingOpertor", error)
            return true;
        }
        return false;
    }

    fieldsOccupied (fields: number[][], ) : boolean {
        try {
            for(const field of fields) {
                var height = field[0]
                var width = field[1]
                if (this.fields[height][width].piece) {return true;}
            }
        }
        catch (error) {
            console.error("invalid fields in castlingOpertor", error)
            return true;
        }
        return false;
    }

    constructor(fields: Field[][], board: Board) {
        this.fields = fields;
        this.board = board;
    }
}