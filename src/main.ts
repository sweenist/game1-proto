import './style.css'

import { resources } from './resource';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const ctx = canvas.getContext('2d')!;

const draw = () => {
  const sky = resources.images.sky;
  if (sky && sky.loaded) {
    ctx.drawImage(resources.images.sky.image, 0, 0);
  }

  const ground = resources.images.ground;
  if (ground && ground.loaded) {
    ctx.drawImage(resources.images.ground.image, 0, 0);
  }
}

setInterval(() => {
  draw();
}, 250);