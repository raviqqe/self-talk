import { IDocument } from "../domain/document";
import { IAuthenticationController } from "./authentication-controller";
import { DocumentLister } from "./document-lister";

export interface IInitialState {
  signedIn: boolean;
  documents: IDocument[] | null;
}

export class ApplicationInitializer {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly documentLister: DocumentLister
  ) {}

  public async initialize(): Promise<IInitialState> {
    const signedIn: boolean = await this.authenticationController.isSignedIn();

    return {
      documents: signedIn ? await this.documentLister.list() : null,
      signedIn
    };
  }
}
