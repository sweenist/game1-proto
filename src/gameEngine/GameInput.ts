export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class GameInput {
  directions: string[] = [];
  debugMessage: string = '';
  consolate?: () => void;

  constructor() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        this.onArrowPressed(UP);
      }
      if (e.key === 'ArrowDown' || e.key === 's') {
        this.onArrowPressed(DOWN);
      }
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        this.onArrowPressed(LEFT);
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        this.onArrowPressed(RIGHT);
      }
      if (e.key === ' ') {
        if (this.consolate) return this.consolate();
        this.printDebug();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        this.onArrowReleased(UP);
      }
      if (e.key === 'ArrowDown' || e.key === 's') {
        this.onArrowReleased(DOWN);
      }
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        this.onArrowReleased(LEFT);
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        this.onArrowReleased(RIGHT);
      }
    });
  }

  get direction() {
    return this.directions[0];
  }

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

  printDebug() {
    console.debug(this.debugMessage);
  }

  debugAction() {
    this.consolate?.();
  }
}
