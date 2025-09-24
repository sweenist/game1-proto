import { Hero } from '@src/actors/Hero';
import { DOWN } from '@src/gameEngine/GameInput';
import { Vector2 } from '@src/utils/vector';
import { describe, expect, it } from 'vitest';

describe('Hero', () => {
  it('should be created with defaults', () => {
    const target = new Hero(new Vector2(24, 42));

    expect(target.position).toStrictEqual(new Vector2(24, 42));
    expect(target.shadow).toBeDefined();
    expect(target.body).toBeDefined();
    expect(target.facingDirection).toBe(DOWN);
    expect(target.children).toHaveLength(2);
  });
});
