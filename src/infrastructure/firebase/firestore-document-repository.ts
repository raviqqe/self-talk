import { type FirebaseApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import {
  collection,
  type CollectionReference,
  deleteDoc,
  doc,
  type Firestore,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  type Query,
  setDoc,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { last } from "lodash";
import { type IDocumentRepository } from "../../application/document-repository.js";
import { type IDocument } from "../../domain/document.js";

interface ITimestampedDocument extends IDocument {
  createdAt: number;
}

export class FirestoreDocumentRepository implements IDocumentRepository {
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  public async create(document: IDocument): Promise<void> {
    await setDoc(doc(this.collection(), document.id), {
      ...document,
      createdAt: Math.floor(Date.now() / 1000), // Unix timestamp as number
    });
  }

  public async delete(documentId: string): Promise<void> {
    await deleteDoc(doc(this.collection(), documentId));
  }

  public async *list(count: number): AsyncIterable<IDocument[]> {
    let result = await getDocs(query(this.query(), limit(count)));

    while (result.docs.length > 0) {
      yield result.docs.map((snapshot) => snapshot.data() as IDocument);

      result = await getDocs(
        query(this.query(), startAfter(last(result.docs)), limit(count))
      );
    }
  }

  public async update(document: IDocument): Promise<void> {
    await updateDoc(doc(this.collection(), document.id), { ...document });
  }

  private query(): Query {
    return query(this.collection(), orderBy("createdAt", "desc"));
  }

  private collection(): CollectionReference<ITimestampedDocument> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return collection(
      doc(collection(this.firestore, "users"), user.uid),
      "documents"
    ) as CollectionReference<ITimestampedDocument>;
  }
}
