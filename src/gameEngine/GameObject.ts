import { Vector2 } from '../utils/vector';
import { gameEvents } from './Events';
import type { Main } from './Main';

export class GameObject {
  children: GameObject[] = [];
  position: Vector2;
  parent?: GameObject | null;
  isReady: boolean = false;
  isSolid: boolean = false;
  drawLayer: 'DEFAULT' | 'GROUND' | 'SKY' | 'USER_INTERFACE' = 'DEFAULT';

  constructor(position?: Vector2) {
    this.position = position ?? Vector2.Zero();
  }

  ready(): void {
    // override
  }

  stepEntry(deltaTime: number, root: Main) {
    this.children.forEach((child) => child.stepEntry(deltaTime, root));
    if (!this.isReady) {
      this.isReady = true;
      this.ready();
    }
    this.step(deltaTime, root);
  }

  step(_deltaTime: number, _root?: Main) {
    // override
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    debug: boolean = false
  ) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    this.drawImage(ctx, drawPosX, drawPosY);

    this.getOrderedDrawSprites().forEach((child) =>
      child.draw(ctx, drawPosX, drawPosY)
    );
  }

  getOrderedDrawSprites() {
    return [...this.children].sort((src, target) => {
      if (target.drawLayer === 'GROUND') return 1;
      return src.position.y > target.position.y ? 1 : -1;
    });
  }

  drawImage(
    _ctx: CanvasRenderingContext2D,
    _x: number,
    _y: number,
    debug: boolean = false
  ) {
    // override
  }

  destroy() {
    this.children.forEach((child) => child.destroy());

    this.parent?.removeChild(this);
  }

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    console.debug(`Removing child ${this.constructor.name}`);
    gameEvents.unsubscribe(gameObject);
    this.children = this.children.filter((g) => {
      return gameObject !== g;
    });
    gameObject.parent = null;
  }

  debug(level: number) {
    const arrow = '-'.repeat(level + 1);

    console.debug(
      `${arrow}> ${this.constructor.name}, position: ${this.position} Parent: ${this.parent?.constructor.name}`
    );
    this.children.forEach((child) => {
      child.debug(level + 1);
    });
  }
}
