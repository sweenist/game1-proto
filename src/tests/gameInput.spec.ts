import { describe, it, expect } from 'vitest';
import { DOWN, GameInput, LEFT, RIGHT, UP } from '../gameInput';

describe('gameInput', () => {
  const testCases = [
    { key: 'ArrowUp', expectedDirection: UP },
    { key: 'KeyW', expectedDirection: UP },
    { key: 'ArrowDown', expectedDirection: DOWN },
    { key: 'KeyS', expectedDirection: DOWN },
    { key: 'ArrowLeft', expectedDirection: LEFT },
    { key: 'KeyA', expectedDirection: LEFT },
    { key: 'ArrowRight', expectedDirection: RIGHT },
    { key: 'KeyD', expectedDirection: RIGHT },
  ];
  it.each(testCases)('should have direction $expectedDirection when $key is pressed', ({ key, expectedDirection }) => {
    const input = new GameInput();

    const event = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(event);

    expect(document).toBeDefined();
    expect(input.direction).toBe(expectedDirection);
  });

  it.each(testCases)('should remove $expectedDirection when releasing $key', ({ key, expectedDirection }) => {
    const input = new GameInput();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'KeyW' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'KeyA' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'KeyS' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'KeyD' }));

    expect(input.directions.length).toBe(4);

    const event = new KeyboardEvent('keyup', { key });
    document.dispatchEvent(event);

    expect(input.directions).not.toContain(expectedDirection);
  })
});