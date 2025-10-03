import { GameObject } from './GameObject';
import type { Sprite } from './Sprite';
import { gameEvents } from './Events';
import type { Vector2 } from '../utils/vector';

export interface WallConfig {
  walls: { x: number; y: number }[];
}

export type LevelParams = {
  actorPosition: Vector2;
};

export class Level extends GameObject {
  background?: Sprite;
  walls: Set<string> = new Set<string>();
  actorPosition: Vector2;

  constructor(params: LevelParams, config?: WallConfig) {
    super();

    this.actorPosition = params.actorPosition;
    this.defineWalls(config);
  }

  destroy(): void {
    console.debug(`Unsubscribing ${this.constructor.name} event listeners`);
    gameEvents.unsubscribe(this);
    super.destroy();
  }

  defineWalls(config?: WallConfig) {
    config?.walls.forEach(({ x, y }) => {
      this.walls.add(`x: ${x}, y: ${y}`);
    });
  }
}
