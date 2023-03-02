import { it } from "vitest";
import { type ApplicationInitializer } from "../../application/application-initializer";
import { type DocumentCreator } from "../../application/document-creator";
import { type DocumentLister } from "../../application/document-lister";
import { type DocumentUpdater } from "../../application/document-updater";
import { type SignInManager } from "../../application/sign-in-manager";
import { type SignOutManager } from "../../application/sign-out-manager";
import { type TextFileInserter } from "../../application/text-file-inserter";
import { ReactRenderer } from ".";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    [],
    { initialize: async () => {} } as ApplicationInitializer,
    {} as DocumentCreator,
    {} as DocumentLister,
    {} as DocumentUpdater,
    {} as SignInManager,
    {} as SignOutManager,
    {} as TextFileInserter,
    "url"
  ).render();
});
