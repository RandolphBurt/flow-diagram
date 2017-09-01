export enum ShapeSelectorStatusFlags {
    None = 0,
    InShape = 1 << 0,
    InSurroundingBubble = 1 << 1,
    InShapeSelector = 1 << 2,
    InShapeSelectorList = 1 << 3
}
export class Shape {

    public shapeSelectorStatus: ShapeSelectorStatusFlags = ShapeSelectorStatusFlags.None;

//    public inShape: boolean = false;
//    public inSurroundingBubble: boolean = false;
//    public inShapeSelector: boolean = false;

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
