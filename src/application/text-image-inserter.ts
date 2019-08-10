import { IFileRepository } from "./file-repository";

export class TextImageInserter {
  constructor(private readonly imageRepository: IFileRepository) {}

  public async insert(
    text: string,
    position: number,
    images: File[]
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
