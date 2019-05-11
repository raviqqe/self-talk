import { ApplicationInitializer } from "./application/application-initializer";
import { DocumentCreator } from "./application/document-creator";
import { DocumentDeleter } from "./application/document-deleter";
import { DocumentLister } from "./application/document-lister";
import { DocumentUpdater } from "./application/document-updater";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import { BuiltinConfirmationController } from "./infrastructure/builtin-confirmation-controller";
import {
  FirebaseAuthenticationController,
  FirebaseDocumentRepository,
  FirebaseInitializer
} from "./infrastructure/firebase";
import { ReactRenderer } from "./infrastructure/react";
import { SentryErrorReporter } from "./infrastructure/sentry-error-reporter";

const errorReporter = new SentryErrorReporter();

async function main() {
  await new FirebaseInitializer().initialize();

  const authenticationController = new FirebaseAuthenticationController();
  const documentRepository = new FirebaseDocumentRepository(errorReporter);
  const messagePresenter = new AlertMessagePresenter();
  const confirmationController = new BuiltinConfirmationController();

  const element = document.getElementById("root");

  if (!element) {
    throw new Error("no root element");
  }

  new ReactRenderer(
    new ApplicationInitializer(authenticationController),
    new SignInManager(authenticationController),
    new SignOutManager(authenticationController),
    new DocumentCreator(documentRepository, messagePresenter),
    new DocumentLister(documentRepository),
    new DocumentUpdater(
      new DocumentDeleter(documentRepository, confirmationController),
      documentRepository,
      messagePresenter
    )
  ).render(element);

  await navigator.serviceWorker.register("/service-worker.js");
}

main().catch(error => errorReporter.report(error));
