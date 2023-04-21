import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type ApplicationInitializer } from "../application/application-initializer.js";
import { type DocumentCreator } from "../application/document-creator.js";
import { type DocumentLister } from "../application/document-lister.js";
import { type DocumentUpdater } from "../application/document-updater.js";
import { type SignInManager } from "../application/sign-in-manager.js";
import { type SignOutManager } from "../application/sign-out-manager.js";
import { type TextFileInserter } from "../application/text-file-inserter.js";
import { type IDocument } from "../domain/document.js";
import { App, type IProps as IAppProps } from "./react/App.js";
import { GlobalStyle } from "./react/style.js";
import { type IRenderer } from "./renderer.js";

interface IPresenter {
  setRenderer(renderer: IRenderer): void;
}

interface IProps extends Pick<IAppProps, "documents" | "signedIn"> {}

export class ReactRenderer implements IRenderer {
  private readonly root: Root;
  private props: IProps = { documents: null, signedIn: null };

  constructor(
    element: HTMLElement,
    presenters: IPresenter[],
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly documentCreator: DocumentCreator,
    private readonly documentLister: DocumentLister,
    private readonly documentUpdater: DocumentUpdater,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly textFileInserter: TextFileInserter,
    private readonly repositoryUrl: string
  ) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }

    this.root = createRoot(element);
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

    this.root.render(
      <StrictMode>
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
          repositoryUrl={this.repositoryUrl}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          updateDocument={(document: IDocument) =>
            this.documentUpdater.update(document)
          }
        />
        <GlobalStyle />
      </StrictMode>
    );
  }
}
