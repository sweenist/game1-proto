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
      gameEvents.emit(signals.levelChange, new CaveLevel({ actorPosition: new Vector2(gridCells(2), gridCells(3)) }));
    });
  }

  defineWalls() {
    // Define walls by their grid positions
    this.walls.add(new Vector2(32, 32).toString()); // rock
    this.walls.add(new Vector2(48, 32).toString());
    this.walls.add(new Vector2(32, 48).toString());
    this.walls.add(new Vector2(48, 48).toString());
    this.walls.add(new Vector2(64, 48).toString()); // tree

    this.walls.add(new Vector2(64, 64).toString()); // squares
    this.walls.add(new Vector2(64, 80).toString());
    this.walls.add(new Vector2(80, 64).toString());
    this.walls.add(new Vector2(80, 80).toString());

    this.walls.add(new Vector2(112, 80).toString()); // water
    this.walls.add(new Vector2(128, 80).toString());
    this.walls.add(new Vector2(144, 80).toString());
    this.walls.add(new Vector2(160, 80).toString());
  }
}
