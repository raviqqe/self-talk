import { FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  Query,
  setDoc,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { last } from "lodash";
import { IDocumentRepository } from "../../application/document-repository";
import { IDocument } from "../../domain/document";

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
      createdAt: Math.floor(Date.now() / 1000), // Unix timestam as numberp
    });
  }

  public async delete(documentId: string): Promise<void> {
    await deleteDoc(doc(this.collection(), documentId));
  }

  public async *list(count: number): AsyncIterator<IDocument[], void> {
    let result = await getDocs(query(this.query(), limit(count)));

    while (result.docs.length > 0) {
      yield result.docs.map((snapshot) => snapshot.data() as IDocument);

      result = await getDocs(
        query(this.query(), startAfter(last(result.docs)), limit(count))
      );
    }
  }

  public async update(document: IDocument): Promise<void> {
    await updateDoc(doc(this.collection(), document.id), document);
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
