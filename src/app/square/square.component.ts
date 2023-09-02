import { transition } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Field } from 'src/app/chess/field/field';

@Component({
  selector: 'app-square',
  styleUrls: ['./square.component.css'],
  templateUrl: './square.component.html',
  
})
export class SquareComponent  {


  @Input() field: Field = new Field(true, -1, -1);
  marked: boolean = false;



  onSquareClick() {
    this.field.fieldMarked();
  }

}