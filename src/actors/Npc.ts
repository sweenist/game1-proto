import { GameObject } from '../gameEngine/GameObject';
import { Sprite } from '../gameEngine/Sprite';
import { resources } from '../Resources';
import { Vector2 } from '../utils/vector';

export class Npc extends GameObject {
  shadow: Sprite;
  body: Sprite;

  constructor(position: Vector2) {
    super(position);

    this.isSolid = true;

    this.shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(this.shadow);

    this.body = new Sprite({
      resource: resources.images['knight'],
      frameSize: new Vector2(32, 32),
      frameColumns: 3,
      frameRows: 8,
      frameIndex: 1,
      position: new Vector2(-8, -20),
    });

    this.addChild(this.body);
  }
}
