import { signals } from '../constants';
import { gameEvents } from './Events';
import { GameObject } from './GameObject';
import { Vector2 } from '../utils/vector';

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

    this.canvas.addEventListener('resize', () => {
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;
    });

    gameEvents.on(signals.heroPosition, this, (value: Vector2) => {
      if (!value) return;

      const halfWidth = -this.halfActor + this.canvasWidth / 2;
      const halfHeight = -this.halfActor + this.canvasHeight / 2;

      this.position = new Vector2(-value.x + halfWidth, -value.y + halfHeight);
    });
  }
}
