import { signals } from '../constants';
import { Inventory } from '../menu/Inventory';
import { SpriteText } from '../objects/TextBox/SpriteText';
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

  constructor(params: MainGameParams) {
    super(params.position);

    this.camera = new Camera(params.ctx.canvas);
    this.input = new GameInput();

    this.addChild(this.camera);
  }

  ready(): void {
    const inventory = new Inventory();

    this.addChild(inventory);

    gameEvents.on<Level>(signals.levelChange, this, (newLevel) => {
      console.info(`Leaving ${this.level?.constructor.name ?? 'None'}`);
      this.setLevel(newLevel);
      console.info(`Loading ${this.level?.constructor.name ?? 'Error'}`);
    });

    gameEvents.on(signals.heroInteraction, this, () => {
      const textBox = new SpriteText(
        "This is some test text. Here's some length! Now we have more to say..."
      );
      this.addChild(textBox);
      gameEvents.emit(signals.startTextInteraction);

      const textBoxId = gameEvents.on(signals.endTextInteraction, this, () => {
        textBox.destroy();
        gameEvents.off(textBoxId);
      });
    });

    this.input.consolate = () => {
      this.debug(0);
      inventory.debug(1);
    };
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
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level?.background?.draw(ctx, 0, 0);
  }

  drawObjects(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer !== 'USER_INTERFACE') {
        child.draw(ctx, 0, 0);
      }
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer === 'USER_INTERFACE') {
        child.draw(ctx, 0, 0);
      }
    });
  }
}
