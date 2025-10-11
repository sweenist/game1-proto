import { Hero } from '../actors/Hero';
import { Npc } from '../actors/Npc';
import { flags, signals } from '../constants';
import { gameEvents } from '../gameEngine/Events';
import { Level, type LevelParams } from '../gameEngine/Level';
import { Sprite } from '../gameEngine/Sprite';
import { Exit } from '../objects/Exit';
import { Rod } from '../objects/Rod/Rod';
import { resources } from '../Resources';
import { gridCells } from '../utils/grid';
import { Vector2 } from '../utils/vector';
import { OutdoorLevel } from './Overworld';
import caveConfig from './config/cave.config.json';

export class CaveLevel extends Level {
  constructor(params: LevelParams) {
    super(params, caveConfig);

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

    const knight1 = new Npc({
      position: new Vector2(gridCells(5), gridCells(5)),
      body: {
        resource: resources.images['knight'],
        frameSize: new Vector2(32, 32),
        frameColumns: 2,
        frameRows: 1,
        frameIndex: 1,
        position: new Vector2(-8, -20),
      },
      content: [
        {
          message: 'Yo. Be careful, eh?',
          requires: [flags.caveKnightTalkedA],
          portraitFrame: 1,
        },
        {
          message: 'Yo, yo, yo! You a venturer?',
          addFlag: flags.caveKnightTalkedA,
          portraitFrame: 1,
        },
      ],
    });
    this.addChild(knight1);

    const knight2 = new Npc({
      position: new Vector2(gridCells(2), gridCells(7)),
      body: {
        resource: resources.images['knight'],
        frameSize: new Vector2(32, 32),
        frameColumns: 2,
        frameRows: 1,
        frameIndex: 1,
        position: new Vector2(-8, -20),
      },
      content: [
        {
          message:
            "Oh? You talked to the other guy, eh? A Venturer you be? Here's a key",
          requires: [flags.caveKnightTalkedA],
          addFlag: flags.caveKnightTalkedB,

          portraitFrame: 1,
        },
        {
          message: 'Get out! Guild members only, punk!',
          portraitFrame: 1,
        },
      ],
    });
    this.addChild(knight2);

    const rod = new Rod(gridCells(9), gridCells(7));
    this.addChild(rod);
  }

  ready(): void {
    gameEvents.on(signals.sceneExit, this, () => {
      gameEvents.emit(
        signals.levelChanging,
        new OutdoorLevel({
          actorPosition: new Vector2(gridCells(6), gridCells(4)),
        })
      );
    });
  }
}
