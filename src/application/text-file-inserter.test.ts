import { TextFileInserter } from "./text-file-inserter";
import { it, expect, beforeEach, vi, Mock } from "vitest";

const dummyFileURL = "https://foo.com/bar";

let createMock: Mock;
let inserter: TextFileInserter;

beforeEach(() => {
  createMock = vi.fn(async () => dummyFileURL);
  inserter = new TextFileInserter({ create: createMock });
});

it("inserts an image into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [{ type: "image/png" } as File])
  ).toBe(`foo![](${dummyFileURL})bar`);
});

it("inserts multiple images into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [
      { type: "image/png" } as File,
      { type: "image/png" } as File,
    ])
  ).toBe(`foo![](${dummyFileURL})\n\n![](${dummyFileURL})bar`);
});

it("inserts a text file into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [
      { name: "foo", type: "text/plain" } as File,
    ])
  ).toBe(`foo[foo](${dummyFileURL})bar`);
});
