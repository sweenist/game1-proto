import { describe, it, expect } from 'vitest';
import { DOWN, GameInput, LEFT, RIGHT, UP } from '../src/gameInput';

describe('gameInput', () => {
  const testCases = [
    { key: 'ArrowUp', expectedDirection: UP },
    { key: 'w', expectedDirection: UP },
    { key: 'ArrowDown', expectedDirection: DOWN },
    { key: 's', expectedDirection: DOWN },
    { key: 'ArrowLeft', expectedDirection: LEFT },
    { key: 'a', expectedDirection: LEFT },
    { key: 'ArrowRight', expectedDirection: RIGHT },
    { key: 'd', expectedDirection: RIGHT },
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

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));

    expect(input.directions.length).toBe(4);

    const event = new KeyboardEvent('keyup', { key });
    document.dispatchEvent(event);

    expect(input.directions).not.toContain(expectedDirection);
  })
});