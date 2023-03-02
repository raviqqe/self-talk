import { type IFileRepository } from "./file-repository.js";

export class TextFileInserter {
  constructor(private readonly fileRepository: IFileRepository) {}

  public async insert(
    text: string,
    position: number,
    files: File[]
  ): Promise<string> {
    return (
      text.slice(0, position) +
      (
        await Promise.all(
          files.map(async (file: File) => {
            const url = await this.fileRepository.create(file);

            return file.type.startsWith("image/")
              ? `![](${url})`
              : `[${file.name}](${url})`;
          })
        )
      ).join("\n\n") +
      text.slice(position)
    );
  }
}
