import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { ApplicationInitializer } from "./application/application-initializer";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import { DocumentCreator } from "./application/document-creator";
import { DocumentDeleter } from "./application/document-deleter";
import { DocumentLister } from "./application/document-lister";
import { DocumentUpdater } from "./application/document-updater";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirestoreDocumentRepository } from "./infrastructure/firebase/firestore-document-repository";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { FirebaseStorageFileRepository } from "./infrastructure/firebase/firebase-storage-file-repository";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { AuthenticationPresenter } from "./infrastructure/authentication-presenter";
import { DocumentPresenter } from "./infrastructure/document-presenter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { TextFileInserter } from "./application/text-file-inserter";
import configuration from "./configuration.json";

// Instantiate this at the very beginning to initialize Firebase's default app.
const firebaseInitializer = new FirebaseInitializer(
  configuration.firebase.projectId,
  configuration.firebase.apiKey
);
const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);

async function main() {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  const authenticationPresenter = new AuthenticationPresenter();
  const authenticationController = new FirebaseAuthenticationController();
  const documentRepository = new FirestoreDocumentRepository();
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();
  const documentPresenter = new DocumentPresenter();

  new ReactRenderer(
    element,
    [authenticationPresenter, documentPresenter],
    new ApplicationInitializer(
      authenticationController,
      authenticationPresenter,
      new InfrastructureInitializer(firebaseInitializer)
    ),
    new DocumentCreator(
      documentRepository,
      documentPresenter,
      messagePresenter
    ),
    new DocumentLister(documentRepository, documentPresenter),
    new DocumentUpdater(
      new DocumentDeleter(
        documentRepository,
        documentPresenter,
        confirmationController
      ),
      documentRepository,
      documentPresenter,
      messagePresenter
    ),
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController, authenticationPresenter),
    new TextFileInserter(new FirebaseStorageFileRepository()),
    configuration.repositoryURL
  ).render();

  // Disable default behavior on drop events.
  window.ondragover = (event: DragEvent) => event.preventDefault();
  window.ondrop = (event: DragEvent) => event.preventDefault();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch((error) => errorReporter.report(error));
