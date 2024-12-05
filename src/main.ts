import configuration from "./configuration.json" with { type: "json" };
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { documentLister } from "./main/document-lister.js";
import { documentPresenter } from "./main/document-presenter.js";
import { documentUpdater } from "./main/document-updater.js";
import { errorReporter } from "./main/error-reporter.js";
import { signInManager } from "./main/sign-in-manager.js";
import { signOutManager } from "./main/sign-out-manager.js";
import { textFileInserter } from "./main/text-file-inserter.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    element,
    [authenticationPresenter, documentPresenter],
    documentLister,
    documentUpdater,
    signInManager,
    signOutManager,
    textFileInserter,
    configuration.repositoryUrl,
  ).render();

  // Disable default behavior on drop events.
  window.ondragover = (event: DragEvent) => event.preventDefault();
  window.ondrop = (event: DragEvent) => event.preventDefault();
} catch (error) {
  errorReporter.report(error);
}
