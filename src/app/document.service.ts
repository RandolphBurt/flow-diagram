import { Injectable } from '@angular/core';
import { Shape } from './shape'

@Injectable()
export class DocumentService {
  shapes: Shape[];
  activeShapeSelectorShape: Shape = null;

  constructor() {
    this.shapes = [];
  }

  private isPointWithinShape(shape: Shape, x: number, y: number, additionalBorder: number = 0) {
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

  setActiveShapeSelectorShape(shape: Shape) {
    if (this.activeShapeSelectorShape != null) {
      this.activeShapeSelectorShape.showShapeSelector = false;
    }
    this.activeShapeSelectorShape = shape;
    this.bringToFront(shape);
  }
}
