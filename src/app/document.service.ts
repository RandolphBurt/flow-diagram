import { Injectable } from '@angular/core';
import { Shape } from './shape'

@Injectable()
export class DocumentService {
  shapes: Shape[];

  constructor() {
    this.shapes = [];
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  findShape(event: MouseEvent) : Shape {
    for (let shape of this.shapes) {
      if (Math.pow(event.pageX - shape.x, 2) + Math.pow(event.pageY - shape.y, 2) <= Math.pow(shape.radius + shape.strokeWidth, 2)) {
        return shape;
      }
    }    
    return null;
  }
}
