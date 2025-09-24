import { GameObject } from './GameObject';
import type { Sprite } from './Sprite';
import { gameEvents } from './Events';

export class Level extends GameObject {
  background?: Sprite;
  walls: Set<string> = new Set<string>();

  constructor() {
    super();
  }

  destroy(): void {
    console.debug(`Unsubscribing ${this.constructor.name} event listeners`);
    gameEvents.unsubscribe(this);
    super.destroy();
  }
}
