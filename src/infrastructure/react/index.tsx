import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { DocumentCreator } from "../../application/document-creator";
import { DocumentLister } from "../../application/document-lister";
import { DocumentUpdater } from "../../application/document-updater";
import { IDocument } from "../../domain/document";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { TextFileInserter } from "../../application/text-file-inserter";
import { IRenderer } from "../renderer";
import { GlobalStyle } from "./style";
import { App, IProps as IAppProps } from "./App";

interface IPresenter {
  setRenderer(renderer: IRenderer): void;
}

interface IProps extends Pick<IAppProps, "documents" | "signedIn"> {}

export class ReactRenderer implements IRenderer {
  private props: IProps = { documents: null, signedIn: null };

  constructor(
    private readonly element: HTMLElement,
    presenters: IPresenter[],
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly documentCreator: DocumentCreator,
    private readonly documentLister: DocumentLister,
    private readonly documentUpdater: DocumentUpdater,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly textFileInserter: TextFileInserter,
    private readonly repositoryURL: string
  ) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }
  }

  public render(): void {
    this.renderProps({});
  }

  public renderDocuments(documents: IDocument[] | null): void {
    this.renderProps({ documents });
  }

  public renderSignedIn(signedIn: boolean): void {
    this.renderProps({ signedIn });
  }

  private renderProps(props: Partial<IProps>): void {
    this.props = { ...this.props, ...props };

    render(
      <>
        <App
          {...this.props}
          createDocument={(text: string) => this.documentCreator.create(text)}
          initialize={() => this.applicationInitializer.initialize()}
          insertFiles={(
            text: string,
            position: number,
            files: File[]
          ): Promise<string> =>
            this.textFileInserter.insert(text, position, files)
          }
          listDocuments={() => this.documentLister.list()}
          listMoreDocuments={() => this.documentLister.listMore()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          updateDocument={(document: IDocument) =>
            this.documentUpdater.update(document)
          }
        />
        <GlobalStyle />
      </>,
      this.element
    );
  }
}
