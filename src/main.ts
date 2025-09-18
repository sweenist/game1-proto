import './style.css'

import { resources } from './Resources';
import { Sprite } from './Sprite';
import { Vector2 } from './utils/vector';
import { GameLoop } from './Gameloop';
import { DOWN, GameInput, LEFT, RIGHT, UP } from './GameInput';
import { gridCells, isSpaceFree } from './utils/grid';
import { moveTowards } from './utils/moveUtils';
import { walls } from './levels/level1';
import { FrameIndexPattern } from './FrameIndexPattern';
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP } from './actors/heroAnimations';
import { Animations } from './Animations';
import { toTitleCase } from './utils/stringUtils';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

const sky = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(360, 180)
});

const ground = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(360, 180)
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  frameColumns: 3,
  frameRows: 8,
  frameIndex: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
  animations: new Animations({
    walkDown: new FrameIndexPattern(WALK_DOWN),
    walkUp: new FrameIndexPattern(WALK_UP),
    walkLeft: new FrameIndexPattern(WALK_LEFT),
    walkRight: new FrameIndexPattern(WALK_RIGHT),
    standDown: new FrameIndexPattern(STAND_DOWN),
    standUp: new FrameIndexPattern(STAND_UP),
    standLeft: new FrameIndexPattern(STAND_LEFT),
    standRight: new FrameIndexPattern(STAND_RIGHT),
  })
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

let destinationTarget = hero.position.duplicate();
let heroFacing = DOWN;
const input = new GameInput();

const update = (deltaTime: number) => {
  const distance = moveTowards(hero.position, destinationTarget, 1);
  const hasArrived = distance < 1;
  if (hasArrived) {
    tryMove();
  }

  hero.step(deltaTime);
  return;


}

const tryMove = () => {
  if (!input.direction) {
    hero.animations?.play("stand".concat(toTitleCase(heroFacing)));
    return;
  }

  let nextX = destinationTarget.x;
  let nextY = destinationTarget.y;

  const gridSize = 16;

  if (input.direction === UP) {
    nextY -= gridSize;
    hero.animations?.play("walkUp");
  }
  if (input.direction === DOWN) {
    nextY += gridSize;
    hero.animations?.play("walkDown");
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.animations?.play("walkLeft");
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.animations?.play("walkRight");
  }

  heroFacing = input.direction ?? heroFacing;

  if (!isSpaceFree(walls, nextX, nextY))
    return;
  destinationTarget = new Vector2(nextX, nextY);
  input.debugMessage = `Hero => pos:${hero.position}; frame: ${hero.frameIndex}`;
}

const draw = () => {
  //background first
  sky.draw(ctx, 0, 0);
  ground.draw(ctx, 0, 0);

  const heroOffset = new Vector2(-8, -21);

  shadow.draw(ctx, hero.position.x + heroOffset.x, hero.position.y + heroOffset.y);
  hero.draw(ctx, hero.position.x + heroOffset.x, hero.position.y + heroOffset.y);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();