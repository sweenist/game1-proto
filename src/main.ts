import './style.css'

import { resources } from './resource';
import { Sprite } from './sprite';
import { Vector2 } from './utils/vector';
import { GameLoop } from './gameloop';

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
});
const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroPosition = new Vector2(16 * 6, 16 * 5);

const update = (timeStep: number) => {
}

const draw = () => {
  //background first
  sky.draw(ctx, 0, 0);
  ground.draw(ctx, 0, 0);

  //foreground sprites
  const heroOffset = new Vector2(-8, -20);
  const heroPosX = heroPosition.x + heroOffset.x;
  const heroPosY = heroPosition.y + heroOffset.y;

  shadow.draw(ctx, heroPosX, heroPosY);
  hero.draw(ctx, heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw);
gameLoop.start();