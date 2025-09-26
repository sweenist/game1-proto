import { signals } from '../constants';
import { Inventory } from '../menu/Inventory';
import { SpriteText } from '../objects/TextBox/SpriteText';
import { TextBox } from '../objects/TextBox/TextBox';
import type { Vector2 } from '../utils/vector';
import { Camera } from './Camera';
import { gameEvents } from './Events';
import { GameInput } from './GameInput';
import { GameObject } from './GameObject';
import { Level } from './Level';

export interface MainGameParams {
  ctx: CanvasRenderingContext2D;
  position?: Vector2;
  level?: Level;
}

export class Main extends GameObject {
  level?: Level;
  camera: Camera;
  input: GameInput;
  inventory: Inventory;
  textBox: GameObject;

  constructor(params: MainGameParams) {
    super(params.position);

    this.camera = new Camera(params.ctx.canvas);
    this.inventory = new Inventory();
    this.input = new GameInput();
    this.textBox = new SpriteText("This is some test text. Here's some length");
    // this.textBox = new TextBox();

    this.addChild(this.camera);
  }

  ready(): void {
    this.input.consolate = () => {
      this.debug(0);
      this.inventory.debug(1);
    };

    gameEvents.on<Level>(signals.levelChange, this, (newLevel) => {
      console.info(`Leaving ${this.level?.constructor.name ?? 'None'}`);
      this.setLevel(newLevel);
      console.info(`Loading ${this.level?.constructor.name ?? 'Error'}`);
    });
  }

  setLevel(level: Level) {
    if (this.level) {
      this.level.destroy();
    }

    this.level = level;
    this.addChild(this.level);
  }

  stepEntry(deltaTime: number, root: Main): void {
    super.stepEntry(deltaTime, root);
    this.inventory.stepEntry(deltaTime, this);
    this.textBox.stepEntry(deltaTime, this);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level?.background?.draw(ctx, 0, 0);
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.inventory.draw(
      ctx,
      this.inventory.position.x,
      this.inventory.position.y
    );

    this.textBox.draw(ctx, 0, 0);
  }
}
