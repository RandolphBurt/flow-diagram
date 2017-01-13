export class SelectBox {
    private x2: number;
    private y2: number;
    private startX: number;
    private startY: number;
    width: number;
    height: number;

    constructor(public x: number, public y: number) {
        this.startX = x;
        this.startY = y;
    }    

    setClosingCoordinates(x: number, y: number) {
        if (x < this.startX) {
            this.x = x;
            this.x2 = this.startX;
        } else {
            this.x2 = x;
            this.x = this.startX;
        }

        if (y < this.startY) {
            this.y = y;
            this.y2 = this.startY;
        } else {
            this.y2 = y;
            this.y = this.startY;
        }

        this.width = this.x2 - this.x;
        this.height = this.y2 - this.y;
    }
}