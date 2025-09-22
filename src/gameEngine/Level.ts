import { GameObject } from './GameObject';
import type { Sprite } from './Sprite';

export class Level extends GameObject {
  background?: Sprite;
  walls: Set<string> = new Set<string>();

  constructor() {
    super();
  }
}
