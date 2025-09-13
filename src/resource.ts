type ImageResource = { image: HTMLImageElement, loaded: boolean };

class Resources {
  public toLoad: { [key: string]: string };
  public images: { [key: string]: ImageResource };

  constructor() {
    this.images = {};
    this.toLoad = {
      ground: "sprites/ground.png",
      sky: "sprites/sky.png",
    }

    Object.keys(this.toLoad).forEach((key: string) => {
      const image = new Image();
      image.src = this.toLoad[key];
      this.images[key] = { image, loaded: false };

      image.onload = () => {
        this.images[key].loaded = true;
        console.info(`Loaded ${key}`);
      }
    });
  }
}

export const resources = new Resources();