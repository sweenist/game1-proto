import { GameObject } from './GameObject';
import type { Sprite } from './Sprite';
import { gameEvents } from './Events';
import type { Vector2 } from '../utils/vector';

export type LevelParams = {
  actorPosition: Vector2
}

export class Level extends GameObject {
  background?: Sprite;
  walls: Set<string> = new Set<string>();
  actorPosition: Vector2

  constructor(params: LevelParams) {
    super();

    this.actorPosition = params.actorPosition;
  }

  destroy(): void {
    console.debug(`Unsubscribing ${this.constructor.name} event listeners`);
    gameEvents.unsubscribe(this);
    super.destroy();
  }
}
