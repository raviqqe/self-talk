import { ApplicationInitializer } from "../../../application/application-initializer";
import { DocumentCreator } from "../../../application/document-creator";
import { DocumentLister } from "../../../application/document-lister";
import { DocumentUpdater } from "../../../application/document-updater";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { TextFileInserter } from "../../../application/text-file-inserter";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    document.createElement("div"),
    {} as ApplicationInitializer,
    {} as DocumentCreator,
    {} as DocumentLister,
    {} as DocumentUpdater,
    {} as SignInManager,
    {} as SignOutManager,
    {} as TextFileInserter,
    "url"
  ).render();
});
