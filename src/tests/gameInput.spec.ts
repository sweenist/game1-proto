import { describe, it, expect, vi } from 'vitest';
import { GameInput, UP } from '../gameInput';

const input = new GameInput();

describe('gameInput', () => {
  it('should have a direction of recently pressed button', () => {
    const event = new KeyboardEvent('keydown, {key: "arrowUp"');
    document.dispatchEvent(event);

    expect(input.direction).toBe(UP);
  });
});
