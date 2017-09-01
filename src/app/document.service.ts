import { Injectable } from '@angular/core';
import { Shape, ShapeSelectorStatusFlags } from './shape'

@Injectable()
export class DocumentService {
  shapes: Shape[];
  activeShapeSelectorShape: Shape = null;
  potentialNewShape: Shape = null;

  constructor() {
    this.shapes = [];
  }
  
  clearActiveShape() {
    this.activeShapeSelectorShape.showShapeSelector = false;
    this.activeShapeSelectorShape.shapeSelectorStatus = ShapeSelectorStatusFlags.None;
    this.activeShapeSelectorShape = null;
  }
  
  isPointWithinShape(shape: Shape, x: number, y: number, additionalBorder: number = 0) {
      if (Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2) <= Math.pow(shape.radius + shape.strokeWidth + additionalBorder, 2)) {
        return true;
      }
      return false;
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

/*
  bringToFrontShapeAt(x: number, y: number) {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (this.isPointWithinShape(this.shapes[i], x, y)) {
        // move to the end of the array
        this.shapes.push(this.shapes.splice(i, 1)[0]);
      }
    }
  }
*/

  bringToFront(shape: Shape) {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      if (this.shapes[i] == shape) {
        // move to the end of the array
        this.shapes.push(this.shapes.splice(i, 1)[0]);
      }
    }
  }

  isEmptyPartOfCanvas(x: number, y: number) : boolean {
    if (this.findShape(x, y) != null) {
      return false;
    }

    if (this.activeShapeSelectorShape != null) {
      // TODO: See if intersecting the shape selector parts
    }

    return true;
  }

  // searches in reverse so finds top most shape first
  findShape(x: number, y: number, additionalBorder: number = 0) : Shape {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      let shape = this.shapes[i];
      if (this.isPointWithinShape(shape, x, y, additionalBorder)) {
        return shape;
      }
    }    
    return null;
  }

  clearShapeSelector() {
    if (this.activeShapeSelectorShape != null) {
      this.clearActiveShape();
    }
  }

  deactivateShapeSelectorStatus(shape: Shape, activationType: ShapeSelectorStatusFlags) {
    shape.shapeSelectorStatus &= ~activationType;

    setTimeout(() => {
      // Delay slightly as we may move from the shapeSelectorBubble around the shape, into the shape - and the order of events
      // means we leave one before entering the other - therefore the disabling action is delayed so we don't toggle the
      // showShapeSelector setting needlessly (thus causing an animation of the shape selector disappearing and then appearing)
      this.calculateIfShapeIsActive(shape);
    }, 0);    
  }

  activateShapeSelectorStatus(shape: Shape, activationType: ShapeSelectorStatusFlags) {
    if (this.activeShapeSelectorShape != null && this.activeShapeSelectorShape != shape) {
      this.clearActiveShape();
    }

    this.activeShapeSelectorShape = shape;
    this.activeShapeSelectorShape.shapeSelectorStatus |= activationType;
    this.calculateIfShapeIsActive(this.activeShapeSelectorShape);
  }

  calculateIfShapeIsActive(shape: Shape) {
    let previousShow = shape.showShapeSelector;

    shape.showShapeSelector = shape.shapeSelectorStatus != ShapeSelectorStatusFlags.None;

    if (shape.showShapeSelector == false && shape == this.activeShapeSelectorShape) {
      this.activeShapeSelectorShape = null;
    }

    if (shape.showShapeSelector && !previousShow) {
      this.bringToFront(shape);
    }
  }

  clearPotentialShape() {
    this.potentialNewShape = null;
  }

  createPotentialShape(shape: Shape) {
    this.potentialNewShape = shape;
  }

  promotePotentialShape() {
    if (this.potentialNewShape != null) {
      this.addShape(this.potentialNewShape);
      this.potentialNewShape = null;
    }
  }
}
