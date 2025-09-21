export type ImageResource = {
  image: HTMLImageElement;
  loaded: boolean;
  name: string;
};

class Resources {
  public toLoad: { [key: string]: string };
  public images: { [key: string]: ImageResource };

  constructor() {
    this.images = {};
    this.toLoad = {
      ground: 'sprites/ground.png',
      hero: 'sprites/hero-sheet.png',
      rod: 'sprites/rod.png',
      shadow: 'sprites/shadow.png',
      sky: 'sprites/sky.png',
      spritesheet: 'sprites/spritesheet.png',
    };

    Object.keys(this.toLoad).forEach((key: string) => {
      const image = new Image();
      image.src = this.toLoad[key];
      this.images[key] = { image, loaded: false, name: key };

      image.onload = () => {
        this.images[key].loaded = true;
      };
    });
  }
}

export const resources = new Resources();
