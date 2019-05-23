import { TextImageInserter } from "../text-image-inserter";

const dummyImageURL: string = "https://foo.com/bar.png";

let createMock: jest.Mock;
let inserter: TextImageInserter;

beforeEach(() => {
  createMock = jest.fn(async () => dummyImageURL);
  inserter = new TextImageInserter({ create: createMock });
});

it("inserts an image into a document", async () => {
  expect(await inserter.insert("foobar", 3, [{} as Blob])).toBe(
    `foo![](${dummyImageURL})bar`
  );
});

it("inserts multiple images into a document", async () => {
  expect(await inserter.insert("foobar", 3, [{} as Blob, {} as Blob])).toBe(
    `foo![](${dummyImageURL}) ![](${dummyImageURL})bar`
  );
});
