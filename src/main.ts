import './style.css';

import { GameLoop } from './gameEngine/GameLoop';
import { Main } from './gameEngine/Main';
import { OutdoorLevel } from './levels/OutdoorLevel';
import { CaveLevel } from './levels/CaveLevel';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

const mainScene = new Main({ ctx });

// mainScene.setLevel(new OutdoorLevel());
mainScene.setLevel(new CaveLevel());

const update = (deltaTime: number) => {
  mainScene.stepEntry(deltaTime, mainScene);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  mainScene.drawBackground(ctx);
  ctx.save();

  ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
  mainScene.draw(ctx, 0, 0);

  ctx.restore();

  mainScene.drawForeground(ctx);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
