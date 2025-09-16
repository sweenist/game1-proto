import type { FrameIndexPattern } from "./FrameIndexPattern";

export class Animations {
  patterns: { [key: string]: FrameIndexPattern }
  activeKey: string;

  constructor(patterns: { [key: string]: FrameIndexPattern }) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame
  }

  step(deltaTime: number) {
    this.patterns[this.activeKey].step(deltaTime);
  }
}