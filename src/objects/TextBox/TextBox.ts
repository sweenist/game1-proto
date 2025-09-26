import { GameObject } from '../../gameEngine/GameObject';
import { Sprite } from '../../gameEngine/Sprite';
import { resources } from '../../Resources';
import { Vector2 } from '../../utils/vector';

export class TextBox extends GameObject {
  content: string;
  backdrop: Sprite;

  constructor() {
    super(new Vector2(36, 112));
    this.content = 'This is just a test. Testing... One... Two... Three...';
    this.backdrop = new Sprite({
      resource: resources.images['textbox'],
      frameSize: new Vector2(256, 64),
    });

    this.addChild(this.backdrop);
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // super.drawImage(ctx, x, y);
    this.backdrop.drawImage(ctx, x, y);

    // const MAX_WIDTH = 250;
    // const LINE_HEIGHT = 20;
    // const PADDING_LEFT = 10;
    // const PADDING_TOP = 12;
    // ctx.fillText(this.content, x + PADDING_LEFT, y + PADDING_TOP);
  }
}
