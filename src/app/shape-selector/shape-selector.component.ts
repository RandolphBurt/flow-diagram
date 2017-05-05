import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Shape, ShapeSelectorStatusFlags } from "app/shape";
import { ShapeSelectionListPosition } from "app/shape-selection-list-position.enum";

@Component({
  selector: '[app-shape-selector]',
  templateUrl: './shape-selector.component.html',
  styleUrls: ['./shape-selector.component.css']
})
export class ShapeSelectorComponent implements OnInit, OnChanges {
  @Input('app-shape-selector') shape: Shape;

  // Do this to expose the enum to our template
  public ShapeSelectionListPosition = ShapeSelectionListPosition;
  public ShapeSelectorStatusFlags = ShapeSelectorStatusFlags;

  points: string;
  topSelectorTransform: string;
  rightSelectorTransform: string;
  bottomSelectorTransform: string;
  leftSelectorTransform: string;

  selectionListPosition: ShapeSelectionListPosition;
  selectionListCentreX: number;
  selectionListCentreY: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.points = `
      ${this.shape.x - 10},${this.shape.y + 10} 
      ${this.shape.x + 10},${this.shape.y + 10}
      ${this.shape.x},${this.shape.y - 8}`;
    
    var offset = this.shape.radius + this.shape.strokeWidth + 7;
    this.topSelectorTransform = `translate(0, ${-1 * offset})`
    this.rightSelectorTransform = `translate(${offset}, 0) rotate(90, ${this.shape.x}, ${this.shape.y})`
    this.bottomSelectorTransform = `translate(0, ${offset}) rotate(180, ${this.shape.x}, ${this.shape.y})`
    this.leftSelectorTransform = `translate(${-1 * offset}, 0) rotate(270, ${this.shape.x}, ${this.shape.y})`
    this.selectionListPosition = ShapeSelectionListPosition.None;
  }

  activateShapeSelectionList(position: ShapeSelectionListPosition): void {
    this.selectionListPosition = position;

    var offset = this.shape.radius + this.shape.strokeWidth + 25;

    switch (position) {
      case ShapeSelectionListPosition.Top:
        this.selectionListCentreX = this.shape.x;
        this.selectionListCentreY = this.shape.y - offset;
        break;
      case ShapeSelectionListPosition.Bottom:
        this.selectionListCentreX = this.shape.x;
        this.selectionListCentreY = this.shape.y + offset;
        break;
      case ShapeSelectionListPosition.Left:
        this.selectionListCentreX = this.shape.x - offset;
        this.selectionListCentreY = this.shape.y;
        break;
      case ShapeSelectionListPosition.Right:
        this.selectionListCentreX = this.shape.x + offset;
        this.selectionListCentreY = this.shape.y;
        break;
    }
  }
}
