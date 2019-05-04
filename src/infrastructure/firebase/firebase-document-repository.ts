import * as firebase from "firebase/app";
import "firebase/firestore";
import { IDocumentRepository } from "../../application/document-repository";
import { IDocument } from "../../domain/document";

export class FirebaseDocumentRepository implements IDocumentRepository {
  public async create(document: IDocument): Promise<void> {
    const reference = this.collection().doc(document.id);
    reference.set(document);
  }

  public async list(): Promise<IDocument[]> {
    return (await this.collection().get()).docs.map(
      snapshot => snapshot.data() as IDocument
    );
  }

  private collection(): firebase.firestore.CollectionReference {
    const user = firebase.auth().currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("documents");
  }
}
