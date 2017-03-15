import { Directive, ElementRef, HostListener, Input, OnInit, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Shape, ShapeSelectorStatusFlags } from './shape';
import { DocumentService } from "app/document.service";

@Directive({
  selector: '[flowDragAndDrop]'
})
export class FlowDragAndDropDirective implements OnInit {
  mouseDown: EventEmitter<MouseEvent>;
  mouseMove: EventEmitter<MouseEvent>;
  mouseUp: EventEmitter<MouseEvent>;

  @Input() shape: Shape;

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.mouseDown.emit(event);
    return false; // Call preventDefault() on the event
  }

  // Listen to document:mousemove and document:mouseup events as the mouse can move outside of the shape
  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.mouseMove.emit(event);
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    this.mouseUp.emit(event);
  }

  constructor(private documentService: DocumentService) {
    this.mouseDown = new EventEmitter<MouseEvent>();
    this.mouseMove = new EventEmitter<MouseEvent>();
    this.mouseUp = new EventEmitter<MouseEvent>();
  }

  ngOnInit() {
    var finished = this.mouseUp.map((event: any) => {
      this.documentService.activateShapeSelector(this.shape, ShapeSelectorStatusFlags.InShape);
    });

    this.mouseDown
      .switchMap((event : MouseEvent) => {
        var drag = this.mouseMove.takeUntil(finished);
        return drag;
      })
      .subscribe((event : any) => {
        this.documentService.clearShapeSelector();
        this.shape.moveTo(event.pageX, event.pageY);
      });    
  }
}
