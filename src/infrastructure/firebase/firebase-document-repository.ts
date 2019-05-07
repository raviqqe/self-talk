import * as firebase from "firebase/app";
import "firebase/firestore";
import { last } from "lodash";
import {
  IDocumentRepository,
  IListResult
} from "../../application/document-repository";
import { IDocument } from "../../domain/document";

export class FirebaseDocumentRepository implements IDocumentRepository {
  public async create(document: IDocument): Promise<void> {
    const reference = this.collection().doc(document.id);
    reference.set(document);
  }

  public async delete(documentID: string): Promise<void> {
    await this.collection()
      .doc(documentID)
      .delete();
  }

  public async list(
    limit: number,
    cursor?: firebase.firestore.DocumentSnapshot
  ): Promise<IListResult> {
    const snapshots = (await (cursor
      ? this.query().startAfter(cursor)
      : this.query()
    )
      .limit(limit)
      .get()).docs;

    return {
      documents: snapshots.map(snapshot => snapshot.data() as IDocument),
      loadMore:
        snapshots.length === 0
          ? null
          : (limit: number): Promise<IListResult> =>
              this.list(limit, last(snapshots))
    };
  }

  public async update(document: IDocument): Promise<void> {
    await this.collection()
      .doc(document.id)
      .set(document);
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
