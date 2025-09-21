import { Animations } from '../gameEngine/Animations';
import { FrameIndexPattern } from '../gameEngine/FrameIndexPattern';
import { DOWN, LEFT, RIGHT, UP } from '../gameEngine/GameInput';
import { GameObject } from '../gameEngine/GameObject';
import { walls } from '../levels/level1';
import { resources } from '../Resources';
import { Sprite } from '../gameEngine/Sprite';
import { isSpaceFree } from '../utils/grid';
import { toTitleCase } from '../utils/stringUtils';
import { Vector2 } from '../utils/vector';
import {
  WALK_DOWN,
  WALK_UP,
  WALK_LEFT,
  WALK_RIGHT,
  STAND_DOWN,
  STAND_UP,
  STAND_LEFT,
  STAND_RIGHT,
} from './heroAnimations';
import { moveTowards } from '../utils/moveUtils';
import type { Scene } from '../gameEngine/Scene';
import { gameEvents } from '../gameEngine/Events';
import { signals } from '../constants';

export class Hero extends GameObject {
  facingDirection: string;
  destinationPosition: Vector2;
  body: Sprite;
  shadow: Sprite;

  constructor(x: number, y: number) {
    super(new Vector2(x, y));
    this.shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(this.shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      frameColumns: 3,
      frameRows: 8,
      frameIndex: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
      }),
    });

    this.addChild(this.body);

    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
  }

  step(_deltaTime: number, root: Scene) {
    const distance = moveTowards(this.position, this.destinationPosition, 1);
    const hasArrived = distance < 1;
    if (hasArrived) {
      this.tryMove(root);
    }

    gameEvents.emit(signals.heroPosition, this.position);
  }

  tryMove(root: Scene) {
    const { input } = root;

    if (!input.direction) {
      this.body.animations?.play(
        'stand'.concat(toTitleCase(this.facingDirection))
      );
      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    const gridSize = 16;

    if (input.direction === UP) {
      nextY -= gridSize;
      this.body.animations?.play('walkUp');
    }
    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations?.play('walkDown');
    }
    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations?.play('walkLeft');
    }
    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations?.play('walkRight');
    }

    this.facingDirection = input.direction ?? this.facingDirection;

    if (!isSpaceFree(walls, nextX, nextY)) return;

    this.destinationPosition = new Vector2(nextX, nextY);
  }
}
