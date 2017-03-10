import { Directive, HostListener, Input, OnInit, EventEmitter } from '@angular/core';
import { Shape } from "app/shape";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Directive({
  selector: '[appDeactivateShapeSelector]'
})
export class DeactivateShapeSelectorDirective implements OnInit {

  mouseLeave: EventEmitter<MouseEvent>;

  @Input() shape: Shape;

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    this.mouseLeave.emit(event);
  }

  constructor() { 
      this.mouseLeave = new EventEmitter<MouseEvent>();
  }

  ngOnInit(): void {
    this.mouseLeave.subscribe((event : any) => {
      this.shape.showShapeSelector = false;
    });    
  }
}
