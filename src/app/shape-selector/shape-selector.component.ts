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
      ${this.shape.centreX - 5},${this.shape.centreY + 5} 
      ${this.shape.centreX + 5},${this.shape.centreY + 5}
      ${this.shape.centreX},${this.shape.centreY - 4}`;
    
    var widthOffset = (this.shape.width / 2) + Shape.strokeWidth + 7;
    var heightOffset = (this.shape.height / 2) + Shape.strokeWidth + 7;
    this.topSelectorTransform = `translate(0, ${-1 * heightOffset})`
    this.rightSelectorTransform = `translate(${widthOffset}, 0) rotate(90, ${this.shape.centreX}, ${this.shape.centreY})`
    this.bottomSelectorTransform = `translate(0, ${heightOffset}) rotate(180, ${this.shape.centreX}, ${this.shape.centreY})`
    this.leftSelectorTransform = `translate(${-1 * widthOffset}, 0) rotate(270, ${this.shape.centreX}, ${this.shape.centreY})`
    this.selectionListPosition = ShapeSelectionListPosition.None;
  }

  activateShapeSelectionList(position: ShapeSelectionListPosition): void {
    this.selectionListPosition = position;

    var offset = (this.shape.width / 2) + Shape.strokeWidth + 30;

    switch (position) {
      case ShapeSelectionListPosition.Top:
        this.selectionListCentreX = this.shape.centreX;
        this.selectionListCentreY = this.shape.centreY - offset;
        break;
      case ShapeSelectionListPosition.Bottom:
        this.selectionListCentreX = this.shape.centreX;
        this.selectionListCentreY = this.shape.centreY + offset;
        break;
      case ShapeSelectionListPosition.Left:
        this.selectionListCentreX = this.shape.centreX - offset;
        this.selectionListCentreY = this.shape.centreY;
        break;
      case ShapeSelectionListPosition.Right:
        this.selectionListCentreX = this.shape.centreX + offset;
        this.selectionListCentreY = this.shape.centreY;
        break;
    }
  }
}
