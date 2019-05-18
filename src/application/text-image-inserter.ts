import { IImageRepository } from "./image-repository";

export class TextImageInserter {
  constructor(private readonly imageRepository: IImageRepository) {}

  public async insert(
    text: string,
    position: number,
    image: Blob
  ): Promise<string> {
    return (
      text.slice(0, position) +
      `![](${await this.imageRepository.create(image)})` +
      text.slice(position)
    );
  }
}
