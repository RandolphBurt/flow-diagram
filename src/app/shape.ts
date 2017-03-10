export class Shape {

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
