export type InsertImagesFunction = (
  text: string,
  position: number,
  images: File[]
) => Promise<string>;
