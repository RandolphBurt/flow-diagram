import { Injectable, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Shape } from './shape';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {

  constructor(private documentService: DocumentService) {
    this.documentService.addShape(new Shape(50, 50, 40, 4, "green", "yellow"));
    this.documentService.addShape(new Shape(150, 150, 20, 2, "blue", "red"));
    this.documentService.addShape(new Shape(200, 200, 40, 4, "red", "orange"));
  }
}
