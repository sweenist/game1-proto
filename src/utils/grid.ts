import { Vector2 } from "./vector";

export const gridCells = (n: number) => {
  return n * 16;
}

export const isSpaceFree = (walls: Set<string>, x: number, y: number) => {
  var checkPosition = new Vector2(x, y);

  return !walls.has(checkPosition.toString());
}