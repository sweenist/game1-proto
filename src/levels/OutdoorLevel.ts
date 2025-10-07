import { Hero } from '../actors/Hero';
import { signals } from '../constants';
import { gameEvents } from '../gameEngine/Events';
import { Level, type LevelParams } from '../gameEngine/Level';
import { Sprite } from '../gameEngine/Sprite';
import { Exit } from '../objects/Exit';
import { Rod } from '../objects/Rod/Rod';
import { resources } from '../Resources';
import { gridCells } from '../utils/grid';
import { Vector2 } from '../utils/vector';
import { CaveLevel } from './CaveLevel';
import wallConfig from './config/outdoor.config.json';

export class OutdoorLevel extends Level {
  constructor(params: LevelParams) {
    super(params, wallConfig);

    this.background = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(360, 180),
    });

    const ground = new Sprite({
      resource: resources.images.ground,
      frameSize: new Vector2(360, 180),
    });

    const exit = new Exit(gridCells(6), gridCells(3));
    const hero = new Hero(this.actorPosition);
    const rod = new Rod(gridCells(12), gridCells(4));

    this.addChild(ground);

    this.addChild(exit);
    this.addChild(hero);
    this.addChild(rod);
  }

  ready(): void {
    gameEvents.on(signals.sceneExit, this, () => {
      gameEvents.emit(
        signals.levelChange,
        new CaveLevel({
          actorPosition: new Vector2(gridCells(3), gridCells(6)),
        })
      );
    });
  }
}
