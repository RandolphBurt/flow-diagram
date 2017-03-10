import { Directive, HostListener, Input, EventEmitter, OnInit } from '@angular/core';
import { Shape } from "app/shape";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { DocumentService } from "app/document.service";

@Directive({
  selector: '[appActivateShapeSelector]'
})
export class ActivateShapeSelectorDirective implements OnInit {
  hover: EventEmitter<MouseEvent>;

  @Input() shape: Shape;

  @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent) {
    this.hover.emit(event);
  }

  constructor(private documentService: DocumentService) { 
      this.hover = new EventEmitter<MouseEvent>();
  }

  ngOnInit() {
    this.hover.subscribe((event : any) => {
      if (event.buttons === 0) {
        this.documentService.setActiveShapeSelectorShape(this.shape);
      }
    });    
  }
}
