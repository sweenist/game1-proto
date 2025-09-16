import type { animationConfiguration } from "./actors/heroAnimations";
import type { ImageResource } from "./resource";
import { Vector2 } from "./utils/vector";

export interface SpriteParams {
  resource: ImageResource;
  frameSize?: Vector2;
  frameColumns?: number;
  frameRows?: number;
  frameIndex?: number;
  scale?: number;
  position?: Vector2;
  animation?: animationConfiguration;
}

export class Sprite {
  resource: ImageResource;
  frameSize: Vector2;
  frameColumns: number;
  frameRows: number;
  frameIndex: number;
  frameMap: Map<number, Vector2> = new Map();
  scale: number;
  position: Vector2;
  animation?: animationConfiguration | null;

  constructor(params: SpriteParams) {
    this.resource = params.resource;
    this.frameSize = params.frameSize ?? new Vector2(16, 16);
    this.frameColumns = params.frameColumns ?? 1;
    this.frameRows = params.frameRows ?? 1;
    this.frameIndex = params.frameIndex ?? 0;
    this.scale = params.scale ?? 1;
    this.position = params.position ?? new Vector2(0, 0);
    this.animation = params.animation;

    this.buildFrameMap();
  }

  buildFrameMap() {
    let index = 0;

    for (let row = 0; row < this.frameRows; row++) {
      for (let col = 0; col < this.frameColumns; col++) {
        this.frameMap.set(index, new Vector2(col * this.frameSize.x, row * this.frameSize.y));
        index++;
      }
    }
  }

  step(deltaTime: number) {
    if (!this.animation) return;

    //TODO. implement
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.loaded) {
      return
    }

    let frameCoordX = 0;
    let frameCoordY = 0;

    const frame = this.frameMap.get(this.frameIndex);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    );
  }
}