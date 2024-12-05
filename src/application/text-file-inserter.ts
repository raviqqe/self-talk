import { type FileRepository } from "./file-repository.js";

export class TextFileInserter {
  constructor(private readonly fileRepository: FileRepository) {}

  public async insert(
    text: string,
    offset: number,
    files: File[],
  ): Promise<string> {
    return (
      text.slice(0, offset) +
      (
        await Promise.all(
          files.map(async (file: File) => {
            const url = await this.fileRepository.create(file);

            return file.type.startsWith("image/")
              ? `![](${url})`
              : `[${file.name}](${url})`;
          }),
        )
      ).join("\n\n") +
      text.slice(offset)
    );
  }
}
