export type InsertImagesFunction = (
  text: string,
  position: number,
  images: Blob[]
) => Promise<string>;
