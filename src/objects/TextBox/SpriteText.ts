import { GameObject } from '../../gameEngine/GameObject';
import { Sprite } from '../../gameEngine/Sprite';
import { resources } from '../../Resources';
import { Vector2 } from '../../utils/vector';
import { getCharacterFrame, getCharacterWidth } from './SpriteMapping';

type SpriteFontProps = {
  wordWidth: number;
  chars: {
    width: number;
    sprite: Sprite;
  }[];
};

export class SpriteText extends GameObject {
  content: string;
  backdrop: Sprite;
  words: SpriteFontProps[];
  constructor(content: string) {
    super(new Vector2(32, 112));
    this.content = content;

    this.backdrop = new Sprite({
      resource: resources.images['textbox'],
      frameSize: new Vector2(256, 64),
    });

    this.words = this.getFontSprites(content);
  }

  private getFontSprites(content: string): SpriteFontProps[] {
    return content.split(' ').map((word) => {
      let wordWidth = 0;
      const chars = word.split('').map((char) => {
        const charWidth = getCharacterWidth(char);
        wordWidth += charWidth;
        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.fontWhite,
            name: char,
            frameColumns: 13,
            frameRows: 6,
            frameIndex: getCharacterFrame(char),
          }),
        };
      });
      return {
        wordWidth,
        chars,
      };
    });
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    debug: boolean = false
  ): void {
    const positionOffset = new Vector2(
      x + this.position.x,
      y + this.position.y
    );
    this.backdrop.draw(ctx, positionOffset.x, positionOffset.y);
    this.drawImage(ctx, positionOffset.x, positionOffset.y);
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    debug: boolean = false
  ): void {
    const PADDING_LEFT = 7;
    const PADDING_TOP = 7;
    const LINE_MAX_WIDTH = 240;
    const LINE_VERTICAL_HEIGHT = 14;

    let cursorX = x + PADDING_LEFT;
    let cursorY = y + PADDING_TOP;

    this.words.forEach((word) => {
      const spaceRemaining = x + LINE_MAX_WIDTH - cursorX;
      if (spaceRemaining < word.wordWidth) {
        cursorY += LINE_VERTICAL_HEIGHT;
        cursorX = x + PADDING_LEFT;
      }
      word.chars.forEach((char) => {
        const { width, sprite } = char;

        const widthCharOffset = cursorX - 5;

        sprite.draw(ctx, widthCharOffset, cursorY);

        cursorX += width + 1;
      });

      cursorX += 3;
    });
  }
}
