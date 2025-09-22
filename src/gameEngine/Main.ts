import { Inventory } from '../menu/Inventory';
import { Camera } from './Camera';
import { GameInput } from './GameInput';
import { GameObject } from './GameObject';
import { Level } from './Level';

export interface MainGameParams {
  ctx: CanvasRenderingContext2D;
  level?: Level;
}

export class Main extends GameObject {
  level?: Level;
  camera: Camera;
  input: GameInput;
  inventory: Inventory;

  constructor(params: MainGameParams) {
    super();

    this.camera = new Camera(params.ctx.canvas);
    this.inventory = new Inventory();
    this.input = new GameInput();

    this.addChild(this.camera);
    this.addChild(this.inventory);
  }

  ready(): void {
    this.input.consolate = () => this.level?.debug(0);
  }

  setLevel(level: Level) {
    if (this.level) {
      this.level.destroy();
    }

    this.level = level;
    this.addChild(this.level);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level?.background?.draw(ctx, 0, 0);
    this.level?.draw(ctx, 0, 0);
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.inventory.draw(
      ctx,
      this.inventory.position.x,
      this.inventory.position.y
    );
  }
}
