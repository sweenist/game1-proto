import { describe, it, expect } from "vitest";
import { moveTowards } from "../../src/utils/moveUtils";
import { Vector2 } from "../../src/utils/vector";

describe("moveTowards", () => {
  it("moves actor directly to destination if within speed (distance < speed)", () => {
    const actor = new Vector2( 0, 0 );
    const destination = new Vector2 ( 1, 0);
    const speed = 4;

    const distance = moveTowards(actor, destination, speed);

    expect(actor).toEqual(destination);
    expect(distance).toEqual(1);
  });

  it("moves actor towards destination by speed if distance >= speed", () => {
    const actor = new Vector2( 0, 0 );
    const destination = new Vector2 ( 3,4); //distance = 5
    const speed = 2;

    const distance = moveTowards(actor, destination, speed);

    // Should move 2 units towards (3,4) from (0,0)
    // Normalized direction: (0.6, 0.8)
    // New position: (0.6*2, 0.8*2) = (1.2, 1.6)
    expect(actor.x).toBeCloseTo(1.2);
    expect(actor.y).toBeCloseTo(1.6);

    // Remaining distance should be 5 - 2 = 3 (but recalc'd from new position)
    const expectedDistance = Math.sqrt(
      (destination.x - actor.x) ** 2 +
      (destination.y - actor.y) ** 2
    );
    expect(distance).toBeCloseTo(expectedDistance);
  });

  it("does not move if actor is already at destination", () => {
    const actor = new Vector2( 5,5 );
    const destination = new Vector2 ( 5,5);
    const speed = 1;

    const distance = moveTowards(actor, destination, speed);

    expect(actor).toEqual(destination);
    expect(distance).toBe(0);
  });
});