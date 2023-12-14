export interface FileRepository {
  create(file: Blob): Promise<string>;
}
