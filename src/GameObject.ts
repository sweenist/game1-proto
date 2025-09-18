import type { Scene } from "./Scene";
import { Vector2 } from "./utils/vector";

export class GameObject {
  children: GameObject[] = [];
  position: Vector2;

  constructor(position?: Vector2) {
    this.position = position ?? Vector2.Zero();
  }

  stepEntry(deltaTime: number, root: Scene) {
    this.children.forEach((child) => child.stepEntry(deltaTime, root));

    this.step(deltaTime, root);
  }

  step(deltaTime: number, root?: Scene) {
    // override
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {

  }

  addChild(gameObject: GameObject) {
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    this.children = this.children.filter((g) => {
      return gameObject !== g
    });
  }
}