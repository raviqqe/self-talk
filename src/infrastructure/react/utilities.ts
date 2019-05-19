export type InsertImageFunction = (
  text: string,
  position: number,
  image: Blob
) => Promise<string>;
