import { Component, OnInit } from '@angular/core';
import { Board } from '../chess/board/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent {
  board: Board;

  constructor() {
    this.board = new Board();
  }
}

