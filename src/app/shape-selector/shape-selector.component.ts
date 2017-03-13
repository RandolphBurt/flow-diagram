import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Shape } from "app/shape";

@Component({
  selector: '[app-shape-selector]',
  templateUrl: './shape-selector.component.html',
  styleUrls: ['./shape-selector.component.css']
})
export class ShapeSelectorComponent implements OnInit, OnChanges {
  @Input('app-shape-selector') shape: Shape;

  shapeSelectorActivationType: string = "inShapeSelector";

  points: string;
  topSelectorTransform: string;
  rightSelectorTransform: string;
  bottomSelectorTransform: string;
  leftSelectorTransform: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.points = `
      ${this.shape.x - 5},${this.shape.y + 5} 
      ${this.shape.x + 5},${this.shape.y + 5}
      ${this.shape.x},${this.shape.y - 4}`;
    
    var offset = this.shape.radius + this.shape.strokeWidth + 7;
    this.topSelectorTransform = `translate(0, ${-1 * offset})`
    this.rightSelectorTransform = `translate(${offset}, 0) rotate(90, ${this.shape.x}, ${this.shape.y})`
    this.bottomSelectorTransform = `translate(0, ${offset}) rotate(180, ${this.shape.x}, ${this.shape.y})`
    this.leftSelectorTransform = `translate(${-1 * offset}, 0) rotate(270, ${this.shape.x}, ${this.shape.y})`
  }
}
