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
    this.documentService.addShape(new Circle(50, 50, 40, "green", "yellow"));
    this.documentService.addShape(new Circle(150, 150, 20, "blue", "red"));
    this.documentService.addShape(new Circle(200, 200, 40, "red", "orange"));
  }
}
