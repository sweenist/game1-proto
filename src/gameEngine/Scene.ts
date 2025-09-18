import type { GameInput } from './GameInput';
import { GameObject } from './GameObject';

export class Scene extends GameObject {
  input: GameInput;
  constructor(input: GameInput) {
    super();

    this.input = input;
  }
}