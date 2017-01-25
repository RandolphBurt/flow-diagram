import { Component, Input, OnInit } from '@angular/core';
import { Shape } from '../shape'

@Component({
  selector: '[app-shape]',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  @Input('app-shape') shape: Shape;

  constructor() { }

  ngOnInit() {
  }

}
