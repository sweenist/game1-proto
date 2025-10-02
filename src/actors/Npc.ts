import { GameObject } from '../gameEngine/GameObject';
import { Sprite } from '../gameEngine/Sprite';
import { storyFlags } from '../gameEngine/StoryFlags';
import { resources } from '../Resources';
import type { DialogueScenario } from '../types';
import { Vector2 } from '../utils/vector';

export interface NpcParams {
  position?: Vector2;
  content: DialogueScenario[];
}

export class Npc extends GameObject {
  shadow: Sprite;
  body: Sprite;
  content: DialogueScenario[];

  constructor(params: NpcParams) {
    super(params.position);

    this.content = params.content;
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

  getContent(): DialogueScenario | null {
    const match = storyFlags.getScenario(this.content);
    if (!match) {
      console.warn(`No relevant dialog was found for ${this.content}`);
      return null;
    }
    return match;
  }
}
