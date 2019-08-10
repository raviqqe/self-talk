import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { ApplicationInitializer } from "./application/application-initializer";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import { DocumentCreator } from "./application/document-creator";
import { DocumentDeleter } from "./application/document-deleter";
import { DocumentLister } from "./application/document-lister";
import { DocumentUpdater } from "./application/document-updater";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseDocumentRepository } from "./infrastructure/firebase/firebase-document-repository";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { FirebaseStorageFileRepository } from "./infrastructure/firebase/firebase-storage-file-repository";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { TextImageInserter } from "./application/text-image-inserter";
import configuration from "./configuration.json";

// Instantiate this at the very beginning to initialize Firebase's default app.
const firebaseInitializer = new FirebaseInitializer(
  configuration.firebase.projectId,
  configuration.firebase.apiKey
);
const errorReporter = new SentryErrorReporter(configuration.sentry.dsn);

async function main() {
  const authenticationController = new FirebaseAuthenticationController();
  const documentRepository = new FirebaseDocumentRepository();
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();

  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    new ApplicationInitializer(
      new InfrastructureInitializer(firebaseInitializer),
      authenticationController
    ),
    new DocumentCreator(documentRepository, messagePresenter),
    new DocumentLister(documentRepository),
    new DocumentUpdater(
      new DocumentDeleter(documentRepository, confirmationController),
      documentRepository,
      messagePresenter
    ),
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController),
    new TextImageInserter(new FirebaseStorageFileRepository()),
    configuration.repositoryURL
  ).render(element);

  // Disable default behavior on drop events.
  window.ondragover = event => event.preventDefault();
  window.ondrop = event => event.preventDefault();

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch(error => errorReporter.report(error));
