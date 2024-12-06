import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type Document } from "../domain/document.js";
import { App, type Props as AppProps } from "./react/App.js";
import { globalStyle } from "./react/style.js";
import { type Renderer } from "./renderer.js";

interface Presenter {
  setRenderer(renderer: Renderer): void;
}

type Props = Pick<AppProps, "documents" | "signedIn">;

export class ReactRenderer implements Renderer {
  private readonly root: Root;
  private props: Props = { documents: null, signedIn: null };

  constructor(
    element: HTMLElement,
    presenters: Presenter[],
    private readonly repositoryUrl: string,
  ) {
    for (const presenter of presenters) {
      presenter.setRenderer(this);
    }

    this.root = createRoot(element);
  }

  public render(): void {
    this.renderProps({});
  }

  public renderDocuments(documents: Document[] | null): void {
    this.renderProps({ documents });
  }

  public renderSignedIn(signedIn: boolean): void {
    this.renderProps({ signedIn });
  }

  private renderProps(props: Partial<Props>): void {
    this.props = { ...this.props, ...props };

    this.root.render(
      <StrictMode>
        <style className={globalStyle} />
        <App {...this.props} repositoryUrl={this.repositoryUrl} />
      </StrictMode>,
    );
  }
}
