import { ApplicationInitializer } from "./application/application-initializer";
import { DocumentCreator } from "./application/document-creator";
import { DocumentLister } from "./application/document-lister";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import {
  FirebaseAuthenticationController,
  FirebaseDocumentRepository,
  FirebaseInitializer
} from "./infrastructure/firebase";
import { ReactRenderer } from "./infrastructure/react";

new FirebaseInitializer().initialize();

const authenticationController = new FirebaseAuthenticationController();
const documentRepository = new FirebaseDocumentRepository();
const element = document.getElementById("root");

if (!element) {
  throw new Error("no room element");
}

new ReactRenderer(
  new ApplicationInitializer(authenticationController),
  new SignInManager(authenticationController),
  new SignOutManager(authenticationController),
  new DocumentCreator(documentRepository),
  new DocumentLister(documentRepository)
).render(element);
