export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type DialogueScenario = {
  message: string;
  requires?: string[];
  bypass?: string[];
  addFlag?: string;
  portraitFrame?: number;
};
