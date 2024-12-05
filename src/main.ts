import { ApplicationInitializer } from "./application/application-initializer.js";
import { DocumentCreator } from "./application/document-creator.js";
import { DocumentDeleter } from "./application/document-deleter.js";
import { DocumentLister } from "./application/document-lister.js";
import { DocumentUpdater } from "./application/document-updater.js";
import { SignInManager } from "./application/sign-in-manager.js";
import { SignOutManager } from "./application/sign-out-manager.js";
import { authenticationController } from "./application/test.js";
import { TextFileInserter } from "./application/text-file-inserter.js";
import configuration from "./configuration.json" with { type: "json" };
import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter.js";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller.js";
import { DocumentRenderer } from "./infrastructure/document-renderer.js";
import { FirebaseStorageFileRepository } from "./infrastructure/firebase/firebase-storage-file-repository.js";
import { FirestoreDocumentRepository } from "./infrastructure/firebase/firestore-document-repository.js";
import { ReactRenderer } from "./infrastructure/react.js";
import { authenticationPresenter } from "./main/authentication-presenter.js";
import { errorReporter } from "./main/error-reporter.js";
import { firebaseApp } from "./main/firebase-app.js";

try {
  const documentRepository = new FirestoreDocumentRepository(firebaseApp);
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();
  const documentPresenter = new DocumentRenderer();

  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    element,
    [authenticationPresenter, documentPresenter],
    new ApplicationInitializer(
      authenticationController,
      authenticationPresenter,
    ),
    new DocumentCreator(
      documentRepository,
      documentPresenter,
      messagePresenter,
    ),
    new DocumentLister(documentRepository, documentPresenter),
    new DocumentUpdater(
      new DocumentDeleter(
        documentRepository,
        documentPresenter,
        confirmationController,
      ),
      documentRepository,
      documentPresenter,
      messagePresenter,
    ),
    new SignInManager(authenticationController, authenticationPresenter),
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
