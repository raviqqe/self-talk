import { it } from "vitest";
import { type DocumentCreator } from "../application/document-creator.js";
import { type DocumentLister } from "../application/document-lister.js";
import { type DocumentUpdater } from "../application/document-updater.js";
import { type SignInManager } from "../application/sign-in-manager.js";
import { type SignOutManager } from "../application/sign-out-manager.js";
import { type TextFileInserter } from "../application/text-file-inserter.js";
import { ReactRenderer } from "./react.js";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    {} as DocumentCreator,
    {} as DocumentLister,
    {} as DocumentUpdater,
    {} as SignInManager,
    {} as SignOutManager,
    {} as TextFileInserter,
    "url",
  ).render();
});
