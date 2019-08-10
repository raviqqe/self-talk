import { ApplicationInitializer } from "../../../application/application-initializer";
import { DocumentCreator } from "../../../application/document-creator";
import { DocumentLister } from "../../../application/document-lister";
import { DocumentUpdater } from "../../../application/document-updater";
import { SignInManager } from "../../../application/sign-in-manager";
import { SignOutManager } from "../../../application/sign-out-manager";
import { TextImageInserter } from "../../../application/text-image-inserter";
import { ReactRenderer } from "..";

it("renders", () => {
  new ReactRenderer(
    {} as ApplicationInitializer,
    {} as DocumentCreator,
    {} as DocumentLister,
    {} as DocumentUpdater,
    {} as SignInManager,
    {} as SignOutManager,
    {} as TextImageInserter,
    "url"
  ).render(document.createElement("div"));
});
