import { it, expect, beforeEach, vi, type Mock } from "vitest";
import { TextFileInserter } from "./text-file-inserter.js";

const dummyFileUrl = "https://foo.com/bar";

let createMock: Mock;
let inserter: TextFileInserter;

beforeEach(() => {
  createMock = vi.fn(async () => dummyFileUrl);
  inserter = new TextFileInserter({ create: createMock });
});

it("inserts an image into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [{ type: "image/png" } as File])
  ).toBe(`foo![](${dummyFileUrl})bar`);
});

it("inserts multiple images into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [
      { type: "image/png" } as File,
      { type: "image/png" } as File,
    ])
  ).toBe(`foo![](${dummyFileUrl})\n\n![](${dummyFileUrl})bar`);
});

it("inserts a text file into a document", async () => {
  expect(
    await inserter.insert("foobar", 3, [
      { name: "foo", type: "text/plain" } as File,
    ])
  ).toBe(`foo[foo](${dummyFileUrl})bar`);
});
