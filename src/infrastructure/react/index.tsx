import * as firebase from "firebase";
import React from "react";
import { render } from "react-dom";
import { ApplicationInitializer } from "../../application/application-initializer";
import { DocumentCreator } from "../../application/document-creator";
import { DocumentDeleter } from "../../application/document-deleter";
import { DocumentLister } from "../../application/document-lister";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { App } from "./App";
import { GlobalStyle } from "./style";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly documentCreator: DocumentCreator,
    private readonly documentDeleter: DocumentDeleter,
    private readonly documentLister: DocumentLister<
      firebase.firestore.DocumentSnapshot
    >
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          createDocument={(text: string) => this.documentCreator.create(text)}
          deleteDocument={(documentID: string) =>
            this.documentDeleter.delete(documentID)
          }
          initialize={() => this.applicationInitializer.initialize()}
          listDocuments={() => this.documentLister.list()}
          listMoreDocuments={() => this.documentLister.listMore()}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
