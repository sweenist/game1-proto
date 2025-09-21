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

  /*
  Returns whether a comparative vector matches the source vector.
  @param that a target vector to compare against.
  @returns true if the target vector components equal components of source vector.
  */
  equals(that: Vector2) {
    return this.x === that.x && this.y === that.y;
  }

  /*
  Returns whether a comparative vector rounds to the components of the source vector.
  @param that a transient vector to compare against.
  @returns true if the transient vector rounds to the source vector.
  */
  prettyClose(that: Vector2) {
    return Math.round(that.x) === this.x && Math.round(that.y) === this.y;
  }
}
