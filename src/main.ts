import './style.css'

import { resources } from './resource';
import { Sprite } from './sprite';
import { Vector2 } from './utils/vector';
import { GameLoop } from './gameloop';
import { DOWN, GameInput, LEFT, RIGHT, UP } from './gameInput';
import { gridCells } from './utils/grid';
import { moveTowards } from './utils/moveUtils';

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
});
const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

let destinationTarget = hero.position.duplicate();
const input = new GameInput();

const update = (timeStep: number) => {
  const distance = moveTowards(hero.position, destinationTarget, 1);
  const hasArrived = distance < 1;
  if (hasArrived) {
    tryMove();
  }
  return;

}

const tryMove = () => {
  if (!input.direction) return;

  let nextX = destinationTarget.x;
  let nextY = destinationTarget.y;
  const gridSize = 16;

  if (input.direction === UP) {
    nextY -= gridSize;
    hero.frameIndex = 7
  }
  if (input.direction === DOWN) {
    nextY += gridSize;
    hero.frameIndex = 1;
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.frameIndex = 10;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.frameIndex = 4;
  }

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