import { Directive, HostListener, Input, OnInit, EventEmitter } from '@angular/core';
import { Shape } from "app/shape";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { DocumentService } from "app/document.service";
import { ConstantsService } from "app/constants.service";

@Directive({
  selector: '[appDeactivateShapeSelector]'
})
export class DeactivateShapeSelectorDirective implements OnInit {

  mouseLeave: EventEmitter<MouseEvent>;

  @Input() shape: Shape;

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    this.mouseLeave.emit(event);
  }

  constructor(private documentService: DocumentService, private constantsService: ConstantsService) { 
      this.mouseLeave = new EventEmitter<MouseEvent>();
  }

  ngOnInit(): void {
    this.mouseLeave.subscribe((event : any) => {
      if (!this.documentService.isPointWithinShape(this.shape, event.pageX, event.pageY, this.constantsService.shapeSelectorAdditionalDistance)) {
        this.documentService.clearShapeSelector();
      }
    });    
  }
}
