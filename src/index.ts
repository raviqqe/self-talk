import { ApplicationInitializer } from "./application/application-initializer";
import { DocumentCreator } from "./application/document-creator";
import { DocumentDeleter } from "./application/document-deleter";
import { DocumentLister } from "./application/document-lister";
import { DocumentUpdater } from "./application/document-updater";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import configuration from "./configuration.json";
import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import { FirebaseAuthenticationController } from "./infrastructure/firebase/firebase-authentication-controller";
import { FirebaseDocumentRepository } from "./infrastructure/firebase/firebase-document-repository";
import { FirebaseInitializer } from "./infrastructure/firebase/firebase-initializer";
import { InfrastructureInitializer } from "./infrastructure/infrastructure-initializer";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";

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
    configuration.repositoryURL
  ).render(element);

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch(error => errorReporter.report(error));
