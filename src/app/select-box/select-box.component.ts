import { Injectable, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { SelectBox } from '../select-box';
import { DocumentService } from '../document.service';

@Component({
  selector: '[app-select-box]',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
@Injectable()
export class SelectBoxComponent implements OnInit {
  selectBox: SelectBox = null;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    let mouseUp = Observable.fromEvent(document, 'mouseup');
    let mouseMove = Observable.fromEvent(document, 'mousemove');
    let mouseDown = Observable.fromEvent(document, 'mousedown');

    mouseDown
      .map((event : MouseEvent) => {       
        this.selectBox = this.documentService.findShape(event) == null 
          ? this.selectBox = new SelectBox(event.pageX, event.pageY) 
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
}
