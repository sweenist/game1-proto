export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export class GameInput {
  directions: string[] = [];

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" || e.key === "KeyW") {
        this.onArrowPressed(UP);
      }
      if (e.key === "ArrowDown" || e.key === "KeyS") {
        this.onArrowPressed(DOWN);
      }
      if (e.key === "ArrowLeft" || e.key === "KeyA") {
        this.onArrowPressed(LEFT);
      }
      if (e.key === "ArrowRight" || e.key === "KeyD") {
        this.onArrowPressed(RIGHT);
      }
    });


    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key === "KeyW") {
        this.onArrowReleased(UP);
      }
      if (e.key === "ArrowDown" || e.key === "KeyS") {
        this.onArrowReleased(DOWN);
      }
      if (e.key === "ArrowLeft" || e.key === "KeyA") {
        this.onArrowReleased(LEFT);
      }
      if (e.key === "ArrowRight" || e.key === "KeyD") {
        this.onArrowReleased(RIGHT);
      }
    });
  }

  get direction() { return this.directions[0]; }

  onArrowPressed(direction: string) {
    if (this.directions.indexOf(direction) === -1) {
      this.directions.unshift(direction);
    }
  }

  onArrowReleased(direction: string) {
    const index = this.directions.indexOf(direction);
    if (index > -1) {
      this.directions.splice(index, 1);
    }
  }
}