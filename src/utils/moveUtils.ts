import type { Sprite } from "../sprite";
import type { Vector2 } from "./vector";

export function moveTowards(actor: Sprite, destination: Vector2, speed: number) {
  let traverseX = destination.x - actor.position.x;
  let traverseY = destination.y - actor.position.y;

  let distance = Math.sqrt(traverseX ** 2 + traverseY ** 2);//euclidean distance

  if (distance < speed) {
    actor.position = destination;
  }
  else {
    const normailzedX = traverseX / distance;
    const normailzedY = traverseY / distance;

    actor.position.x += normailzedX * speed;
    actor.position.y += normailzedY * speed;

    traverseX = destination.x - actor.position.x;
    traverseY = destination.y - actor.position.y;
    distance = Math.sqrt(traverseX ** 2 + traverseY ** 2);
  }
  return distance;
}