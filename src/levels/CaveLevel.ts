import { Hero } from '../actors/Hero';
import { signals } from '../constants';
import { gameEvents } from '../gameEngine/Events';
import { Level } from '../gameEngine/Level';
import { Sprite } from '../gameEngine/Sprite';
import { Exit } from '../objects/Exit';
import { Rod } from '../objects/Rod/Rod';
import { resources } from '../Resources';
import { gridCells } from '../utils/grid';
import { Vector2 } from '../utils/vector';
import { OutdoorLevel } from './OutdoorLevel';

export class CaveLevel extends Level {
  constructor() {
    super();

    this.background = new Sprite({
      resource: resources.images['caveBackground'],
      frameSize: new Vector2(320, 180),
    });

    const ground = new Sprite({
      resource: resources.images['caveForeground'],
      frameSize: new Vector2(320, 180),
    });
    this.addChild(ground);

    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    const hero = new Hero(gridCells(6), gridCells(5));
    this.addChild(hero);

    const rod = new Rod(gridCells(9), gridCells(7));
    this.addChild(rod);
  }

  ready(): void {
    gameEvents.on(signals.sceneExit, this, () => {
      console.info(`Called from ${this.constructor.name} in Cavelevel`);
      gameEvents.emit(signals.levelChange, new OutdoorLevel());
    });
  }
}
