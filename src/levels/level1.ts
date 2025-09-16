import { Vector2 } from "../utils/vector";

export const walls = new Set<string>(); // use a value type... like string yuck

walls.add(new Vector2(64, 48).toString()); // tree

walls.add(new Vector2(64, 64).toString()); // squares
walls.add(new Vector2(64, 80).toString());
walls.add(new Vector2(80, 64).toString());
walls.add(new Vector2(80, 80).toString());

walls.add(new Vector2(112, 80).toString()); // water
walls.add(new Vector2(128, 80).toString());
walls.add(new Vector2(144, 80).toString());
walls.add(new Vector2(160, 80).toString());
