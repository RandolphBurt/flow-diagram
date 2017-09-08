export enum ShapeSelectorStatusFlags {
    None = 0,
    InShape = 1 << 0,
    InSurroundingBubble = 1 << 1,
    InShapeSelector = 1 << 2,
    InShapeSelectorList = 1 << 3
}

export abstract class Shape {
    static shapeSelectorAdditionalDistance: number = 50;
    
    shapeSelectorStatus: ShapeSelectorStatusFlags = ShapeSelectorStatusFlags.None;

    // Ideally might remove this and just check the shapeSelectorStatus flag isn't zero, 
    // however due to the order of events (mose leave firing before mouse enter) the 
    // shapeSelectorStatus flag can briefly go from InShape to None before going to InSurroundingBubble
    showShapeSelector: boolean = false;

    static strokeWidth: number = 2;

    constructor(
        public centreX: number, 
        public centreY: number, 
        public width: number,
        public height: number,
        public fillColour: string,
        public strokeColour: string) {
    }

    abstract isPointWithinShape(x: number, y: number, additionalBorder: number);
        
    moveTo(centreX: number, centreY: number) {
        this.centreX = centreX;
        this.centreY = centreY;
    }
}

export class Circle extends Shape {
    static defaultDiameter: number = 40;
  
    private radius: number;

    constructor(centreX: number, centreY: number) {
        super(centreX, centreY, Circle.defaultDiameter, Circle.defaultDiameter, "powderblue", "grey");
        this.radius = this.width / 2;
    }

    isPointWithinShape(x: number, y: number, additionalBorder: number = 0) {
        if (Math.pow(x - this.centreX, 2) + Math.pow(y - this.centreY, 2) <= Math.pow(this.radius + Shape.strokeWidth + additionalBorder, 2)) {
          return true;
        }
        return false;
    } 
}

export class Rectangle extends Shape {
    static defaultWidth: number = 60;
    static defaultHeight: number = 40;

    private topLeftX: number;
    private topLeftY: number;

    constructor(centreX: number, centreY: number) {
        super(centreX, centreY, Rectangle.defaultWidth, Rectangle.defaultHeight, "powderblue", "grey");
        this.setCoordinates();
    }

    private setCoordinates() {
        this.topLeftX = this.centreX - (this.width / 2);
        this.topLeftY = this.centreY - (this.height / 2);
    }

    moveTo(centreX: number, centreY: number) {
        super.moveTo(centreX, centreY);
        this.setCoordinates();
    }

    isPointWithinShape(x: number, y: number, additionalBorder: number = 0) {
        if (x >= (this.topLeftX - additionalBorder) && x <= (this.topLeftX + this.width + additionalBorder) && 
            y >= (this.topLeftY - additionalBorder) && y <= (this.topLeftY + this.height + additionalBorder)) {
          return true;
        }
        return false;
    } 
}

export class RoundedRectangle extends Shape {
    static defaultWidth: number = 60;
    static defaultHeight: number = 40;

    private topLeftX: number;
    private topLeftY: number;
    private roundLengthX: number;
    private roundLengthY: number;

    constructor(centreX: number, centreY: number) {
        super(centreX, centreY, Rectangle.defaultWidth, Rectangle.defaultHeight, "powderblue", "grey");
        this.roundLengthX = this.width / 4;
        this.roundLengthY = this.height / 2;
        this.setCoordinates();
    }

    private setCoordinates() {
        this.topLeftX = this.centreX - (this.width / 2);
        this.topLeftY = this.centreY - (this.height / 2);
    }

    moveTo(centreX: number, centreY: number) {
        super.moveTo(centreX, centreY);
        this.setCoordinates();
    }

    isPointWithinShape(x: number, y: number, additionalBorder: number = 0) {
        if (x >= (this.topLeftX - additionalBorder) && x <= (this.topLeftX + this.width + additionalBorder) && 
            y >= (this.topLeftY - additionalBorder) && y <= (this.topLeftY + this.height + additionalBorder)) {
          return true;
        }
        return false;
    } 
}

export class Diamond extends Shape {
    static defaultWidth: number = 60;
    static defaultHeight: number = 40;
    
    private leftX: number;
    private rightX: number;
    private topY: number;
    private bottomY: number;
    private points: string;
    private surroundingAreaPoints: string;
    
    constructor(centreX: number, centreY: number) {
        super(centreX, centreY, Diamond.defaultWidth, Diamond.defaultHeight, "powderblue", "grey");
        this.setCoordinates();
    }

    private setCoordinates() {
        this.leftX = this.centreX - (this.width / 2);
        this.rightX = this.centreX + (this.width / 2);
        this.topY = this.centreY - (this.height / 2);
        this.bottomY = this.centreY + (this.height / 2);
        this.points = `${this.leftX},${this.centreY} ${this.centreX},${this.topY} ${this.rightX},${this.centreY} ${this.centreX},${this.bottomY}`;
        this.surroundingAreaPoints = `
            ${this.leftX - Diamond.shapeSelectorAdditionalDistance},${this.centreY} 
            ${this.centreX},${this.topY - Diamond.shapeSelectorAdditionalDistance} 
            ${this.rightX + Diamond.shapeSelectorAdditionalDistance},${this.centreY} 
            ${this.centreX},${this.bottomY  + Diamond.shapeSelectorAdditionalDistance}`;
        }

    isPointWithinShape(x: number, y: number, additionalBorder: number) {
        var dx = Math.abs(x - this.centreX);
        var dy = Math.abs(y - this.centreY);
        var d = (dx / (this.width + (2 * additionalBorder))) + (dy / (this.height + (2 * additionalBorder)));
        return d <= 0.5;
    }

    moveTo(centreX: number, centreY: number) {
        super.moveTo(centreX, centreY);
        this.setCoordinates();
    }
}