import { Directive, HostListener, Input, EventEmitter, OnInit } from '@angular/core';
import { Shape, ShapeSelectorStatusFlags } from "app/shape";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { DocumentService } from "app/document.service";

@Directive({
  selector: '[appToggleShapeSelector]'
})
export class ToggleShapeSelectorDirective {
  mouseEnter: EventEmitter<MouseEvent>;
  mouseLeave: EventEmitter<MouseEvent>;

  @Input() shape: Shape;
  @Input() activationType: ShapeSelectorStatusFlags;

  @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent) {
    this.mouseEnter.emit(event);
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    this.mouseLeave.emit(event);
  }

  constructor(private documentService: DocumentService) { 
      this.mouseEnter = new EventEmitter<MouseEvent>();
      this.mouseLeave = new EventEmitter<MouseEvent>();
  }

  ngOnInit() {
    this.mouseEnter.subscribe((event : any) => {
      // not pressing a button
      if (event.buttons === 0) {
        this.documentService.activateShapeSelector(this.shape, this.activationType);
      }
    });

    this.mouseLeave.subscribe((event: any) => {
      this.documentService.deactivateShapeSelector(this.shape, this.activationType);
    });
  }
}
