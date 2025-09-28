export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class GameInput {
  directions: string[] = [];
  keys: { [key: string]: boolean } = {};
  lastKeys: { [key: string]: boolean } = {};
  debugMessage: string = '';
  consolate?: () => void;

  constructor() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

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
      if (e.key === 'D') {
        if (this.consolate) return this.consolate();
        this.printDebug();
      }
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;

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
      if (e.key === 'p') {
        console.info(this.constructor.name, 'How does type work?');
      }
    });
  }

  get direction() {
    return this.directions[0];
  }

  update() {
    this.lastKeys = { ...this.keys };
  }

  getActionJustPressed(keyCode: string) {
    const justPressed = this.keys[keyCode] && !this.lastKeys[keyCode];
    if (justPressed) console.debug(`${keyCode} was pressed`);
    return justPressed;
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
