import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { Shape, ShapeSelectorStatusFlags } from "app/shape";
import { ShapeSelectionListPosition } from "app/shape-selection-list-position.enum";
import { DocumentService } from "app/document.service";

@Component({
  selector: '[app-shape-selector-list]',
  templateUrl: './shape-selector-list.component.html',
  styleUrls: ['./shape-selector-list.component.css']
})
export class ShapeSelectorListComponent implements OnInit, OnChanges {
  @Input('app-shape-selector-list') shape: Shape;
  @Input() position: ShapeSelectionListPosition;
  @Input() centreX: number;
  @Input() centreY: number;

  shapeListX: number;
  shapeListY: number;
  width: number;
  height: number;

  rectX: number;
  rectY: number;
  rectWidth: number;
  rectHeight: number;

  diamondPoints: string;

  doubleEndRectHeight: number;
  doubleEndRectWidth: number;
  doubleEndRectX: number;
  doubleEndRectY: number;  
  doubleEndRectInnerX: number;
  doubleEndRectInnerWidth: number;

  roundedRectX: number;
  roundedRectY: number;
  roundedRectRadiusX: number;
  roundedRectRadiusY: number;
  roundedRectWidth: number;
  roundedRectHeight: number;

  // Do this to expose the enum to our template
  public ShapeSelectorStatusFlags = ShapeSelectorStatusFlags;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

  offerRoundedRectangle() {
    let newShapeRadius: number = 20;
    let newShapeBorder: number = 2;

    const newShapeCentre: [number, number] = this.calculatePotentialShapeCentre(newShapeRadius, newShapeBorder);

    let potentialNewShape: Shape = new Shape(newShapeCentre[0], newShapeCentre[1], newShapeRadius, newShapeBorder, "red", "orange");
    
    this.documentService.createPotentialShape(potentialNewShape);
  }

  offerRectangle() {
    let newShapeRadius: number = 20;
    let newShapeBorder: number = 2;

    const newShapeCentre: [number, number] = this.calculatePotentialShapeCentre(newShapeRadius, newShapeBorder);

    let potentialNewShape: Shape = new Shape(newShapeCentre[0], newShapeCentre[1], newShapeRadius, newShapeBorder, "green", "yellow");
    
    this.documentService.createPotentialShape(potentialNewShape);
  }

  offerBorderedRectangle() {
    let newShapeRadius: number = 20;
    let newShapeBorder: number = 2;

    const newShapeCentre: [number, number] = this.calculatePotentialShapeCentre(newShapeRadius, newShapeBorder);

    let potentialNewShape: Shape = new Shape(newShapeCentre[0], newShapeCentre[1], newShapeRadius, newShapeBorder, "yellow", "green");
    
    this.documentService.createPotentialShape(potentialNewShape);
  }

  offerDiamond() {
    let newShapeRadius: number = 20;
    let newShapeBorder: number = 2;

    const newShapeCentre: [number, number] = this.calculatePotentialShapeCentre(newShapeRadius, newShapeBorder);

    let potentialNewShape: Shape = new Shape(newShapeCentre[0], newShapeCentre[1], newShapeRadius, newShapeBorder, "blue", "red");
    
    this.documentService.createPotentialShape(potentialNewShape);
  }

  removeOfferedShape() {
    this.documentService.clearPotentialShape();
  }

  promoteOfferedShape() {
    this.documentService.promotePotentialShape();
    this.documentService.clearActiveShape();
  }

  private calculatePotentialShapeCentre(newShapeRadius: number, newShapeBorder: number) : [number, number] {
    let newShapeX: number = this.centreX;
    let newShapeY: number = this.centreY;

    if (this.position == ShapeSelectionListPosition.Top || this.position == ShapeSelectionListPosition.Bottom) {
      const offset: number = (this.height / 2) + newShapeRadius + newShapeBorder;
      newShapeY += this.position == ShapeSelectionListPosition.Bottom ? offset : -offset;
    } else {
      const offset: number = (this.width / 2) + newShapeRadius + newShapeBorder;
      newShapeX += this.position == ShapeSelectionListPosition.Right ? offset : -offset;
    }
    return [newShapeX, newShapeY];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.position == ShapeSelectionListPosition.Top || this.position == ShapeSelectionListPosition.Bottom) {
      let currentShape = 0;
      let shapeCount = 4;
      let shapeWidth = 16;
      let shapeHeight = 12;
      let borderWidth = 4;
      let borderHeight = 6;
      
      this.width = shapeCount * shapeWidth + ((shapeCount + 1) * borderWidth); 
      this.height = shapeHeight + (2 * borderHeight);

      // Shape 1 - rectangle
      this.rectHeight = shapeHeight;
      this.rectWidth = shapeWidth;      
      this.rectX = this.centreX - (this.width / 2) + borderWidth;
      this.rectY = this.centreY - (this.height / 2) + borderHeight;

      // Shape 2 - diamond
      currentShape++;
      let shapeLeft = this.centreX - (this.width / 2) + borderWidth + (currentShape * (borderWidth + shapeWidth));
      this.diamondPoints = `
        ${shapeLeft},                   ${this.centreY} 
        ${shapeLeft + (shapeWidth / 2)},${this.centreY - (this.height / 2) + borderHeight}
        ${shapeLeft + shapeWidth},      ${this.centreY} 
        ${shapeLeft + (shapeWidth / 2)},${this.centreY + (this.height / 2) - borderHeight}`;

      // Shape 3 - rectange with inner double ended border
      currentShape++;
      let doubleEndRectInnerBorder = 3;
      this.doubleEndRectHeight = shapeHeight;
      this.doubleEndRectWidth = shapeWidth;      
      this.doubleEndRectX = this.centreX - (this.width / 2) + borderWidth + (currentShape * (borderWidth + shapeWidth));
      this.doubleEndRectY = this.centreY - (this.height / 2) + borderHeight;     
      this.doubleEndRectInnerX = this.doubleEndRectX + doubleEndRectInnerBorder;
      this.doubleEndRectInnerWidth = shapeWidth - (2 * doubleEndRectInnerBorder);

      // Shape 4 - rounded corners rectangle
      currentShape++;
      this.roundedRectRadiusX = shapeWidth / 4;
      this.roundedRectRadiusY = shapeHeight / 2;
      this.roundedRectHeight = shapeHeight;
      this.roundedRectWidth = shapeWidth;      
      this.roundedRectX = this.centreX - (this.width / 2) + borderWidth + (currentShape * (borderWidth + shapeWidth));
      this.roundedRectY = this.centreY - (this.height / 2) + borderHeight;

    } else {
      let currentShape = 0;
      let shapeCount = 4;
      let shapeWidth = 16;
      let shapeHeight = 12;
      let borderWidth = 6;
      let borderHeight = 6;

      this.height = shapeCount * shapeHeight + ((shapeCount + 1) * borderHeight); 
      this.width = shapeWidth + (2 * borderWidth);;

      // Shape 1 - rectangle
      this.rectHeight = shapeHeight;
      this.rectWidth = shapeWidth;      
      this.rectX = this.centreX - (this.width / 2) + borderWidth;
      this.rectY = this.centreY - (this.height / 2) + borderHeight + (currentShape * (borderHeight + shapeHeight));

      // Shape 2 - diamond
      currentShape++;
      let shapeTop = this.centreY - (this.height / 2) + borderHeight + (currentShape * (borderHeight + shapeHeight));
      this.diamondPoints = `
        ${this.centreX - (this.width / 2) + borderWidth},${shapeTop + (shapeHeight / 2)} 
        ${this.centreX},                                 ${shapeTop}
        ${this.centreX + (this.width / 2) - borderWidth},${shapeTop + (shapeHeight / 2)} 
        ${this.centreX},                                 ${shapeTop + shapeHeight}`;

      // Shape 3 - rectange with inner double ended border
      currentShape++;
      let doubleEndRectInnerBorder = 3;
      this.doubleEndRectHeight = shapeHeight;
      this.doubleEndRectWidth = shapeWidth;      
      this.doubleEndRectX = this.centreX - (this.width / 2) + borderWidth;
      this.doubleEndRectY = this.centreY - (this.height / 2) + borderHeight + (currentShape * (borderHeight + shapeHeight));
      this.doubleEndRectInnerX = this.doubleEndRectX + doubleEndRectInnerBorder;
      this.doubleEndRectInnerWidth = shapeWidth - (2 * doubleEndRectInnerBorder);

      // Shape 4 - rounded corners rectangle
      currentShape++;
      this.roundedRectRadiusX = shapeWidth / 4;
      this.roundedRectRadiusY = shapeHeight / 2;
      this.roundedRectHeight = shapeHeight;
      this.roundedRectWidth = shapeWidth;      
      this.roundedRectX = this.centreX - (this.width / 2) + borderWidth;
      this.roundedRectY = this.centreY - (this.height / 2) + borderHeight + (currentShape * (borderHeight + shapeHeight));
    }

    this.shapeListX = this.centreX - (this.width / 2);
    this.shapeListY = this.centreY - (this.height / 2);
  }
}
