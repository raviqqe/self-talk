import { SignOutManager } from "./application/sign-out-manager.js";
import { TextFileInserter } from "./application/text-file-inserter.js";
import configuration from "./configuration.json" with { type: "json" };
import { FirebaseStorageFileRepository } from "./infrastructure/firebase/firebase-storage-file-repository.js";
import { ReactRenderer } from "./infrastructure/react.js";
import { applicationInitializer } from "./main/application-initializer.js";
import { authenticationController } from "./main/authentication-controller.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { documentCreator } from "./main/document-creator.js";
import { documentLister } from "./main/document-lister.js";
import { documentPresenter } from "./main/document-presenter.js";
import { documentUpdater } from "./main/document-updater.js";
import { errorReporter } from "./main/error-reporter.js";
import { firebaseApp } from "./main/firebase-app.js";
import { signInManager } from "./main/sign-in-manager.js";

try {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    element,
    [authenticationPresenter, documentPresenter],
    applicationInitializer,
    documentCreator,
    documentLister,
    documentUpdater,
    signInManager,
    new SignOutManager(authenticationController, authenticationPresenter),
    new TextFileInserter(new FirebaseStorageFileRepository(firebaseApp)),
    configuration.repositoryUrl,
  ).render();

  // Disable default behavior on drop events.
  window.ondragover = (event: DragEvent) => event.preventDefault();
  window.ondrop = (event: DragEvent) => event.preventDefault();
} catch (error) {
  errorReporter.report(error);
}
