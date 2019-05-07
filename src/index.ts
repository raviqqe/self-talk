import { ApplicationInitializer } from "./application/application-initializer";
import { DocumentCreator } from "./application/document-creator";
import { DocumentLister } from "./application/document-lister";
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
import { DocumentDeleter } from "./application/document-deleter";

new FirebaseInitializer().initialize();

const authenticationController = new FirebaseAuthenticationController();
const documentRepository = new FirebaseDocumentRepository();
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
  new DocumentDeleter(documentRepository, confirmationController),
  new DocumentLister(documentRepository)
).render(element);
