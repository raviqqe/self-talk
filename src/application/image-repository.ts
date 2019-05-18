export interface IImageRepository {
  create(image: Blob): Promise<string>;
}
