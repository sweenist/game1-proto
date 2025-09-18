export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new Vector2(this.x, this.y);
  }

  public toString(): string {
    return `X: ${this.x}, Y: ${this.y}`;
  }

  public static Zero(): Vector2 {
    return new Vector2(0, 0);
  }
}