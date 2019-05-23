import { IImageRepository } from "./image-repository";

export class TextImageInserter {
  constructor(private readonly imageRepository: IImageRepository) {}

  public async insert(
    text: string,
    position: number,
    images: Blob[]
  ): Promise<string> {
    return (
      text.slice(0, position) +
      (await Promise.all(
        images.map(
          async (image: Blob) =>
            `![](${await this.imageRepository.create(image)})`
        )
      )).join(" ") +
      text.slice(position)
    );
  }
}
