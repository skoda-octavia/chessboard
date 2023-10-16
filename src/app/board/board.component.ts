import { Component, OnInit } from '@angular/core';
import { Board } from '../chess/board/board';
import { pawnTransformationBoard } from '../chess/board/pawnTransBoard/PawnTransformationBoard';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  board: Board;
  pawnTransformationBoard: pawnTransformationBoard;
  transformationVisible = true;

  constructor() {
    this.board = new Board(8, 8);
    this.pawnTransformationBoard = new pawnTransformationBoard(4, 1, this.board)
    this.board.pawnTransBoard = this.pawnTransformationBoard
  }
}

