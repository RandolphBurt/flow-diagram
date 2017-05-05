import { Directive, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Shape, ShapeSelectorStatusFlags } from "app/shape";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { DocumentService } from "app/document.service";

@Directive({
  selector: '[appToggleShapeSelectorStatus]'
})
export class ToggleShapeSelectorStatusDirective {
  mouseEnter: EventEmitter<MouseEvent>;
  mouseLeave: EventEmitter<MouseEvent>;

  @Input() shape: Shape;
  @Input() activationType: ShapeSelectorStatusFlags;
  @Output() mouseOver: EventEmitter<any> = new EventEmitter<any>();

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
        this.documentService.activateShapeSelectorStatus(this.shape, this.activationType);
        
        if (this.mouseOver) {
          this.mouseOver.emit();
        }
      }
    });

    this.mouseLeave.subscribe((event: any) => {
      this.documentService.deactivateShapeSelectorStatus(this.shape, this.activationType);
    });
  }
}
