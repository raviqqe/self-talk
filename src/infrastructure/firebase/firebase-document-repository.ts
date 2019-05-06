import * as firebase from "firebase/app";
import "firebase/firestore";
import { last } from "lodash";
import {
  IDocumentRepository,
  IListResult
} from "../../application/document-repository";
import { IDocument } from "../../domain/document";

export class FirebaseDocumentRepository
  implements IDocumentRepository<firebase.firestore.DocumentSnapshot> {
  public async create(document: IDocument): Promise<void> {
    const reference = this.collection().doc(document.id);
    reference.set(document);
  }

  public async list(
    limit: number
  ): Promise<IListResult<firebase.firestore.DocumentSnapshot>> {
    const snapshots = (await this.query()
      .limit(limit)
      .get()).docs;

    return {
      cursor: last(snapshots) || null,
      documents: snapshots.map(snapshot => snapshot.data() as IDocument)
    };
  }

  public async listFromCursor(
    cursor: firebase.firestore.DocumentSnapshot,
    limit: number
  ): Promise<IListResult<firebase.firestore.DocumentSnapshot>> {
    const snapshots = (await this.query()
      .startAfter(cursor)
      .limit(limit)
      .get()).docs;

    return {
      cursor: last(snapshots) || null,
      documents: snapshots.map(snapshot => snapshot.data() as IDocument)
    };
  }

  private query(): firebase.firestore.Query {
    return this.collection().orderBy("createdAt", "desc");
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
