import './style.css';

import { resources } from './Resources';
import { Sprite } from './gameEngine/Sprite';
import { Vector2 } from './utils/vector';
import { GameLoop } from './gameEngine/GameLoop';
import { GameInput } from './gameEngine/GameInput';
import { Scene } from './gameEngine/Scene';
import { Hero } from './actors/Hero';
import { gridCells } from './utils/grid';
import { Camera } from './gameEngine/Camera';
import { Rod } from './objects/Rod/Rod';
import { Inventory } from './menu/Inventory';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

const input = new GameInput();
const mainScene = new Scene(input);

const sky = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(360, 180),
});

const ground = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(360, 180),
});

mainScene.addChild(ground);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const rod = new Rod(gridCells(12), gridCells(4));
mainScene.addChild(rod);

const camera = new Camera(canvas);
mainScene.addChild(camera);

input.consolate = () => mainScene.debug(0);

//Inventory
const inventory = new Inventory();

const update = (deltaTime: number) => {
  mainScene.stepEntry(deltaTime, mainScene);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  sky.draw(ctx, 0, 0);
  ctx.translate(camera.position.x, camera.position.y);

  mainScene.draw(ctx, 0, 0);

  ctx.restore();

  inventory.draw(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
