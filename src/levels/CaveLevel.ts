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
import { OutdoorLevel } from './OutdoorLevel';

export class CaveLevel extends Level {
  constructor(params: LevelParams) {
    super(params);

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

    const hero = new Hero(this.actorPosition);
    this.addChild(hero);

    const rod = new Rod(gridCells(9), gridCells(7));
    this.addChild(rod);

    this.defineWalls();
  }

  ready(): void {
    gameEvents.on(signals.sceneExit, this, () => {
      console.info(`Called from ${this.constructor.name} in Cavelevel`);
      gameEvents.emit(
        signals.levelChange,
        new OutdoorLevel({
          actorPosition: new Vector2(gridCells(6), gridCells(4)),
        })
      );
    });
  }

  defineWalls(): void {
    //Vertical edges
    Array.from({ length: 7 }, (_, i) => i).forEach((y) => {
      this.walls.add(new Vector2(gridCells(1), gridCells(y + 1)).toString());
      this.walls.add(new Vector2(gridCells(18), gridCells(y + 1)).toString());
    });

    //Horizontal edges
    Array.from({ length: 17 }, (_, i) => i).forEach((x) => {
      this.walls.add(new Vector2(gridCells(x + 1), gridCells(0)).toString());
      this.walls.add(new Vector2(gridCells(x + 1), gridCells(8)).toString());
    });

    const rocks = [
      new Vector2(gridCells(2), gridCells(4)),
      new Vector2(gridCells(9), gridCells(1)),
      new Vector2(gridCells(12), gridCells(2)),
      new Vector2(gridCells(13), gridCells(2)),
      new Vector2(gridCells(13), gridCells(3)),
      new Vector2(gridCells(16), gridCells(5)),
    ];

    const water = [
      new Vector2(gridCells(6), gridCells(6)),
      new Vector2(gridCells(7), gridCells(6)),
      new Vector2(gridCells(8), gridCells(6)),
      new Vector2(gridCells(11), gridCells(6)),
      new Vector2(gridCells(12), gridCells(6)),
      new Vector2(gridCells(13), gridCells(6)),
      new Vector2(gridCells(15), gridCells(2)),
      new Vector2(gridCells(16), gridCells(2)),
    ];

    rocks.concat(water).forEach((obj) => this.walls.add(obj.toString()));
  }
}
