export interface IFileRepository {
  create(file: File): Promise<string>;
}
