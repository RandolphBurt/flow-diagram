import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  shapeFillColour: string = "powderblue";
  shapeStrokeColour: string = "grey";

  potentialShapeFillColour: string = "lightgrey";
  potentialShapeStrokeColour: string = "darkgrey";

  constructor() { }

}
