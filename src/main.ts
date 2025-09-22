import './style.css';

import { GameLoop } from './gameEngine/GameLoop';
import { gameEvents } from './gameEngine/Events';
import { signals } from './constants';
import { Main } from './gameEngine/Main';
import { OutdoorLevel } from './levels/OutdoorLevel';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

const mainScene = new Main({ ctx });
mainScene.ready();
mainScene.setLevel(new OutdoorLevel());

gameEvents.on(signals.sceneExit, mainScene, () => {
  console.log('scene exit');
});

const update = (deltaTime: number) => {
  mainScene.stepEntry(deltaTime, mainScene);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);

  mainScene.drawBackground(ctx);

  ctx.restore();

  mainScene.drawForeground(ctx);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
