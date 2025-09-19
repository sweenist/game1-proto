import { signals } from "../constants";
import { gameEvents } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "../utils/vector";

export class Camera extends GameObject {
  canvas: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;
  halfActor = 8;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.canvas.addEventListener("resize", (ev: UIEvent) => {
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;
    })

    gameEvents.on(signals.heroPosition, this, (value: object | null) => {
      if (!value) return;

      const heroPosition = value as Vector2;
      const halfWidth = -this.halfActor + this.canvasWidth / 2;
      const halfHeight = -this.halfActor + this.canvasHeight / 2;

      this.position = new Vector2(
        -heroPosition.x + halfWidth,
        -heroPosition.y + halfHeight
      );
    });
  }
}