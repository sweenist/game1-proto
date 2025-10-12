import { Hero } from '../actors/Hero';
import { Level, type LevelParams } from '../gameEngine/Level';
import { Sprite } from '../gameEngine/Sprite';
import { resources } from '../Resources';
import { gridCells } from '../utils/grid';
import { Vector2 } from '../utils/vector';
import mapContent from './config/overworld.txt?raw';
import levelConfig from './config/custom.config.json';

export class CustomLevel extends Level {
  mapAddresses: number[] = [];

  constructor(params: LevelParams) {
    super({ actorPosition: new Vector2(gridCells(3), gridCells(8)) });

    this.buildMap('customOverworld', 6, 5);

    const {
      treeA,
      treeB,
      treeC,
      treeD,
      rockA,
      rockB,
      rockC,
      rockD,
      resourceConfig,
    } = levelConfig;

    this.layoutObstacles(resourceConfig, treeA);
    this.layoutObstacles(resourceConfig, treeB);
    this.layoutObstacles(resourceConfig, treeC);
    this.layoutObstacles(resourceConfig, treeD);

    this.layoutObstacles(resourceConfig, rockA);
    this.layoutObstacles(resourceConfig, rockB);
    this.layoutObstacles(resourceConfig, rockC);
    this.layoutObstacles(resourceConfig, rockD);

    const hero = new Hero(params.actorPosition);
    this.addChild(hero);
  }

  buildMap(imageName: string, frameColumns: number, frameRows: number) {
    const lines = mapContent.split('\n');
    const columns = lines[0].split(',').length;
    const rows = lines.length;

    this.mapAddresses = lines
      .flatMap((s) => s.split(','))
      .map((value) => {
        value.replace(/^0/, '');
        return Number(value);
      });

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const tile = new Sprite({
          resource: resources.images[imageName],
          frameColumns,
          frameRows,
          frameSize: new Vector2(16, 16),
          frameIndex: this.mapAddresses[y * columns + x],
          position: new Vector2(gridCells(x), gridCells(y)),
        });
        console.info(
          `drawing index ${
            this.mapAddresses[y * columns + x]
          } at grid ${x}, ${y}`
        );
        tile.drawLayer = 'GROUND';

        this.addChild(tile);
      }
    }
  }
}
