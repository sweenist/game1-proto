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

export class OutdoorLevel extends Level {
  constructor(params: LevelParams) {
    super(params);

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

    this.defineWalls();
  }

  ready(): void {
    gameEvents.on(signals.sceneExit, this, () => {
      console.info(`Called from ${this.constructor.name} in Outdoorlevel`);
      gameEvents.emit(
        signals.levelChange,
        new CaveLevel({
          actorPosition: new Vector2(gridCells(2), gridCells(3)),
        })
      );
    });
  }

  defineWalls() {
    this.walls.add(new Vector2(gridCells(12), gridCells(6)).toString()); // rock
    this.walls.add(new Vector2(gridCells(13), gridCells(6)).toString());
    this.walls.add(new Vector2(gridCells(14), gridCells(6)).toString());

    this.walls.add(new Vector2(gridCells(4), gridCells(3)).toString()); // trees
    this.walls.add(new Vector2(gridCells(14), gridCells(2)).toString());
    this.walls.add(new Vector2(gridCells(13), gridCells(4)).toString());

    this.walls.add(new Vector2(gridCells(4), gridCells(4)).toString()); // squares
    this.walls.add(new Vector2(gridCells(4), gridCells(5)).toString());
    this.walls.add(new Vector2(gridCells(5), gridCells(4)).toString());
    this.walls.add(new Vector2(gridCells(5), gridCells(5)).toString());
    this.walls.add(new Vector2(gridCells(8), gridCells(3)).toString());
    this.walls.add(new Vector2(gridCells(9), gridCells(3)).toString());

    this.walls.add(new Vector2(gridCells(7), gridCells(5)).toString()); // water
    this.walls.add(new Vector2(gridCells(8), gridCells(5)).toString());
    this.walls.add(new Vector2(gridCells(9), gridCells(5)).toString());
    this.walls.add(new Vector2(gridCells(10), gridCells(5)).toString());

    this.walls.add(new Vector2(gridCells(14), gridCells(4)).toString()); // house

    //edges
    Array.from({ length: 4 }, (_, i) => i).forEach((y) => {
      this.walls.add(new Vector2(gridCells(2), gridCells(y + 3)).toString());
      this.walls.add(new Vector2(gridCells(16), gridCells(y + 3)).toString());
    });

    Array.from({ length: 13 }, (_, i) => i).forEach((x) => {
      this.walls.add(new Vector2(gridCells(x + 3), gridCells(1)).toString());
      this.walls.add(new Vector2(gridCells(x + 3), gridCells(7)).toString());
    });

    this.walls.add(new Vector2(gridCells(15), gridCells(2)).toString());
    this.walls.add(new Vector2(gridCells(4), gridCells(2)).toString());
    this.walls.add(new Vector2(gridCells(5), gridCells(2)).toString());
    this.walls.add(new Vector2(gridCells(6), gridCells(2)).toString());
  }
}
