import { Hero } from '../actors/Hero';
import { Npc } from '../actors/Npc';
import { signals, fadeIn, fadeOut } from '../constants';
import { Inventory } from '../menu/Inventory';
import { SpriteText } from '../objects/TextBox/SpriteText';
import type { fader } from '../types';
import type { Vector2 } from '../utils/vector';
import { Camera } from './Camera';
import { gameEvents } from './Events';
import { GameInput } from './GameInput';
import { GameObject } from './GameObject';
import { Level } from './Level';
import { storyFlags } from './StoryFlags';

export interface MainGameParams {
  ctx: CanvasRenderingContext2D;
  position?: Vector2;
  level?: Level;
}

export class Main extends GameObject {
  level?: Level;
  camera: Camera;
  input: GameInput;
  //Fade Effect
  fadeAlpha: number = 0;
  fadeDirection: fader = fadeIn;
  isFading: boolean = false;
  onFadeOutComplete?: () => void;

  constructor(params: MainGameParams) {
    super(params.position);

    this.camera = new Camera(params.ctx.canvas);
    this.input = new GameInput();

    this.addChild(this.camera);
  }

  ready(): void {
    const inventory = new Inventory();

    this.addChild(inventory);

    gameEvents.on<Level>(signals.levelChanging, this, (newLevel) => {
      console.info(`Leaving ${this.level?.constructor.name ?? 'None'}`);
      this.startFade(() => this.setLevel(newLevel));
      console.info(`Loading ${newLevel?.constructor.name ?? 'Error'}`);
    });

    gameEvents.on<GameObject>(signals.heroInteraction, this, (interaction) => {
      if (interaction instanceof Npc) {
        //TODO: Implement ActionableObject
        const content = interaction.getContent();
        if (content === null) return;

        if (content.addFlag) {
          console.info('Add Flag:', content.addFlag);
          storyFlags.add(content.addFlag);
          storyFlags.enumerate();
        }

        const textBox = new SpriteText(content!);
        this.addChild(textBox);

        const textBoxId = gameEvents.on(
          signals.endTextInteraction,
          this,
          () => {
            textBox.destroy();
            gameEvents.off(textBoxId);
          }
        );
        gameEvents.emit(signals.startTextInteraction);
      }
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

    if (this.isFading) this.updateFade(deltaTime);
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    if (this.level?.background) {
      // if (this.isFading) {
      //   ctx.save();
      //   ctx.filter = `saturate(${100 - this.fadeAlpha * 100}%)`;
      //   this.level.background.draw(ctx, 0, 0);
      //   ctx.restore();
      // } else {
      this.level.background.draw(ctx, 0, 0);
      // }
    }
  }

  drawObjects(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer !== 'USER_INTERFACE') {
        // if (this.isFading && !(child instanceof Hero)) {
        //   ctx.save();
        //   ctx.filter = `saturate(${100 - (this.fadeAlpha * 100)}%)`;
        //   child.draw(ctx, 0, 0);
        //   ctx.restore();
        // } else {
        child.draw(ctx, 0, 0);
        // }
      }
    });
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => {
      if (child.drawLayer === 'USER_INTERFACE') {
        child.draw(ctx, 0, 0);
      }
    });

    if (this.isFading) {
      ctx.save();
      ctx.globalAlpha = 1 - this.fadeAlpha;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    }
  }

  startFade(onComplete: () => void) {
    this.isFading = true;
    this.fadeDirection = fadeOut;
    this.fadeAlpha = 0.75;
    this.onFadeOutComplete = onComplete;
  }

  updateFade(deltaTime: number) {
    const fadeSpeed = 0.002;
    this.fadeAlpha += this.fadeDirection * fadeSpeed * deltaTime;

    if (this.fadeDirection === fadeOut && this.fadeAlpha <= 0) {
      this.fadeAlpha = 0;
      this.fadeDirection = 1;
      if (this.onFadeOutComplete) this.onFadeOutComplete();
      this.onFadeOutComplete = undefined;
      gameEvents.emit<Level>(signals.levelChanged, this.level);
    } else if (this.fadeDirection === fadeIn && this.fadeAlpha >= 1) {
      this.fadeAlpha = fadeIn;
      this.isFading = false;
    }
  }
}
