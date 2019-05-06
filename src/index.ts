import { ApplicationInitializer } from "./application/application-initializer";
import { DocumentCreator } from "./application/document-creator";
import { DocumentLister } from "./application/document-lister";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { AlertMessagePresenter } from "./infrastructure/alert-message-presenter";
import {
  FirebaseAuthenticationController,
  FirebaseDocumentRepository,
  FirebaseInitializer
} from "./infrastructure/firebase";
import { ReactRenderer } from "./infrastructure/react";

new FirebaseInitializer().initialize();

const authenticationController = new FirebaseAuthenticationController();
const documentRepository = new FirebaseDocumentRepository();
const messagePresenter = new AlertMessagePresenter();
const element = document.getElementById("root");

if (!element) {
  throw new Error("no root element");
}

new ReactRenderer(
  new ApplicationInitializer(authenticationController),
  new SignInManager(authenticationController),
  new SignOutManager(authenticationController),
  new DocumentCreator(documentRepository, messagePresenter),
  new DocumentLister(documentRepository)
).render(element);
