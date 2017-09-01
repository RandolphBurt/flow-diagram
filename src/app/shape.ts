export enum ShapeSelectorStatusFlags {
    None = 0,
    InShape = 1 << 0,
    InSurroundingBubble = 1 << 1,
    InShapeSelector = 1 << 2,
    InShapeSelectorList = 1 << 3
}
export class Shape {

    public shapeSelectorStatus: ShapeSelectorStatusFlags = ShapeSelectorStatusFlags.None;

    // Ideally might remove this and just check the shapeSelectorStatus flag isn't zero, 
    // however due to the order of events (mose leave firing before mouse enter) the 
    // shapeSelectorStatus flag can briefly go from InShape to None before going to InSurroundingBubble
    public showShapeSelector: boolean = false;

    constructor(
        public x: number, 
        public y: number, 
        public radius: number,
        public strokeWidth: number,
        public fillColour: string,
        public strokeColour: string) {
    }
    
    public moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
