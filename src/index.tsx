import { ApplicationInitializer } from "./application/application-initializer";
import { SignInManager } from "./application/sign-in-manager";
import { SignOutManager } from "./application/sign-out-manager";
import { FirebaseAuthenticationController } from "./infrastructure/firebase-authentication-controller";
import { FirebaseInitializer } from "./infrastructure/firebase-initializer";
import { ReactRenderer } from "./infrastructure/react";

new FirebaseInitializer().initialize();

const authenticationController = new FirebaseAuthenticationController();
const element = document.getElementById("root");

if (!element) {
  throw new Error("no room element");
}

new ReactRenderer(
  new ApplicationInitializer(authenticationController),
  new SignInManager(authenticationController),
  new SignOutManager(authenticationController)
).render(element);
