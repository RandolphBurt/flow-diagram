import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  shapeSelectorAdditionalDistance: number = 50;

  shapeFillColour: string = "powderblue";
  shapeStrokeColour: string = "grey";

  potentialShapeFillColour: string = "lightgrey";
  potentialShapeStrokeColour: string = "darkgrey";

  constructor() { }

}
