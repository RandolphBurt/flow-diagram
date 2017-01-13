import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Shape } from './shape';
import { Rectangle } from './rectangle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  shapes: Shape[];
  selectedShape : Shape = null;
  selectBox: Rectangle = null;

  constructor() {
    this.shapes = [];
    this.shapes.push(new Shape(50, 50, 40, 4, "green", "yellow"));
    this.shapes.push(new Shape(150, 150, 20, 2, "blue", "red"));
    this.shapes.push(new Shape(200, 200, 40, 4, "red", "orange"));
  }

  ngOnInit() {
    let mouseUp = Observable.fromEvent(document, 'mouseup');
    let mouseMove = Observable.fromEvent(document, 'mousemove');
    let mouseDown = Observable.fromEvent(document, 'mousedown');

    mouseDown
      .map((event : MouseEvent) => {
        this.selectBox = this.findShape(event) == null 
          ? this.selectBox = new Rectangle(event.pageX, event.pageY, 0, 0, 0, "black") 
          : null;
        return event;
      })
      .switchMap((event : MouseEvent) => {
        var drag = mouseMove.takeUntil(mouseUp);
        return drag;
      })
      .subscribe((event : any) => {
        if (this.selectBox !== null) {
          this.selectBox.setClosingCoordinates(event.pageX, event.pageY);
        }
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
