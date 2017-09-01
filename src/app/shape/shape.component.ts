import { Component, Input, OnInit } from '@angular/core';
import { Shape, ShapeSelectorStatusFlags } from '../shape'
import { ConstantsService } from "app/constants.service";
import { DocumentService } from "app/document.service";

@Component({
  selector: '[app-shape]',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  @Input('app-shape') shape: Shape;
  @Input('app-is-potential-shape') isPotentialShape: boolean;

  // Made public so it can be accessed from the template
  public Shape = Shape;

  // Do this to expose the enum to our template
  public ShapeSelectorStatusFlags = ShapeSelectorStatusFlags;

  shapeSelectorAdditionalDistance: number = this.constantsService.shapeSelectorAdditionalDistance;
  potentialShapeFillColour: string = this.constantsService.potentialShapeFillColour;
  potentialShapeStrokeColour: string = this.constantsService.potentialShapeStrokeColour;

  constructor(private constantsService: ConstantsService, private documentService: DocumentService) { }

  ngOnInit() {
  }

  userClick() {
    this.documentService.clearShapeSelector();
  }
}
