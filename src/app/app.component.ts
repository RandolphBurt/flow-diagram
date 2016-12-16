import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Shape } from './shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  shapes: Shape[];
  selectedShape : Shape = null;

  constructor() {
    this.shapes = [];
    this.shapes.push(new Shape(50, 50, 40, 4, "green", "yellow"));
    this.shapes.push(new Shape(150, 150, 20, 2, "blue", "red"));
  }

  ngOnInit() {
    let mouseUp = Observable.fromEvent(document, 'mouseup');
    let mouseMove = Observable.fromEvent(document, 'mousemove');
    let mouseDown = Observable.fromEvent(document, 'mousedown');

    mouseDown
      .switchMap((event : MouseEvent) => {
        this.selectedShape = this.findShape(event);
        var drag = mouseMove.takeUntil(mouseUp);
        return drag;
      })
      .filter(() => this.selectedShape !== null)
      .subscribe((event : any) => {
        this.selectedShape.x = event.pageX;
        this.selectedShape.y = event.pageY; //clientY
      });
  }

  private findShape(event: MouseEvent) : Shape {
    for (let shape of this.shapes) {
      if (Math.pow(event.pageX - shape.x, 2) + Math.pow(event.pageY - shape.y, 2) < Math.pow(shape.radius + shape.strokeWidth, 2)) {
        return shape;
      }
    }    
    return null;
  }
}
