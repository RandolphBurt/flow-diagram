import { Injectable, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Circle } from './shape';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {

  constructor(private documentService: DocumentService) {
    this.documentService.addShape(new Circle(50, 50));
    this.documentService.addShape(new Circle(150, 150));
    this.documentService.addShape(new Circle(200, 200));
  }
}
