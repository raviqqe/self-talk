import * as firebase from "firebase/app";
import "firebase/firestore";
import { IDocumentRepository } from "../../application/document-repository";
import { IDocumentInput } from "../../domain/document";

export class FirebaseDocumentRepository implements IDocumentRepository {
  public async create(input: IDocumentInput): Promise<void> {
    const reference = this.collection().doc();
    const document = { ...input, id: reference.id };
    reference.set(document);
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
