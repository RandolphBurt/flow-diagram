export enum ShapeSelectorStatusFlags {
    None = 0,
    InShape = 1 << 0,
    InSurroundingBubble = 1 << 1,
    InShapeSelector = 1 << 2,
    InShapeSelectorList = 1 << 3
}
export abstract class Shape {

    shapeSelectorStatus: ShapeSelectorStatusFlags = ShapeSelectorStatusFlags.None;

    // Ideally might remove this and just check the shapeSelectorStatus flag isn't zero, 
    // however due to the order of events (mose leave firing before mouse enter) the 
    // shapeSelectorStatus flag can briefly go from InShape to None before going to InSurroundingBubble
    showShapeSelector: boolean = false;

    static strokeWidth: number = 2;

    constructor(
        public x: number, 
        public y: number, 
        public radius: number,
        public fillColour: string,
        public strokeColour: string) {
    }

    abstract isPointWithinShape(x: number, y: number, additionalBorder: number);
        
    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class Circle extends Shape {
    constructor(
        x: number, 
        y: number, 
        radius: number,
        fillColour: string,
        strokeColour: string) {
            super(x, y, radius, fillColour, strokeColour);
    }

    isPointWithinShape(x: number, y: number, additionalBorder: number = 0) {
        if (Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) <= Math.pow(this.radius + Shape.strokeWidth + additionalBorder, 2)) {
          return true;
        }
        return false;
    } 
}