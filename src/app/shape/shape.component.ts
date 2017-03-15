import { Component, Input, OnInit } from '@angular/core';
import { Shape, ShapeSelectorStatusFlags } from '../shape'
import { ConstantsService } from "app/constants.service";

@Component({
  selector: '[app-shape]',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  @Input('app-shape') shape: Shape;

  surroundingBubbleActivationType: ShapeSelectorStatusFlags = ShapeSelectorStatusFlags.InSurroundingBubble;
  shapeActivationType: ShapeSelectorStatusFlags = ShapeSelectorStatusFlags.InShape;

  shapeSelectorAdditionalDistance: number = this.constantsService.shapeSelectorAdditionalDistance;

  constructor(private constantsService: ConstantsService) { }

  ngOnInit() {
  }

}
