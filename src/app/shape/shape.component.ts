import { Component, Input, OnInit } from '@angular/core';
import { Shape } from '../shape'
import { ConstantsService } from "app/constants.service";

@Component({
  selector: '[app-shape]',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  @Input('app-shape') shape: Shape;

  surroundingBubbleActivationType: string = 'inSurroundingBubble';
  shapeActivationType: string = 'inShape';

  shapeSelectorAdditionalDistance: number = this.constantsService.shapeSelectorAdditionalDistance;

  constructor(private constantsService: ConstantsService) { }

  ngOnInit() {
  }

}
