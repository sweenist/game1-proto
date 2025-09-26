import { GameObject } from '../../gameEngine/GameObject';
import { Sprite } from '../../gameEngine/Sprite';
import { resources } from '../../Resources';
import { Vector2 } from '../../utils/vector';

export class SpriteText extends GameObject {
  content: string;
  backdrop: Sprite;
  constructor(content: string) {
    super(new Vector2(32, 112));
    this.content = content;

    this.backdrop = new Sprite({
      resource: resources.images['textbox'],
      frameSize: new Vector2(256, 64),
    });
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    this.backdrop.draw(ctx, this.position.x + x, this.position.y + y);
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {}
}
