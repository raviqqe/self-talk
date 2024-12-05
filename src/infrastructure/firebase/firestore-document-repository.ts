import { last } from "es-toolkit";
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
import { type DocumentRepository } from "../../application/document-repository.js";
import { type Document } from "../../domain/document.js";

interface TimestampedDocument extends Document {
  createdAt: number;
}

export class FirestoreDocumentRepository implements DocumentRepository {
  private readonly auth: Auth;
  private readonly firestore: Firestore;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
  }

  public async create(document: Document): Promise<void> {
    await setDoc(doc(this.collection(), document.id), {
      ...document,
      createdAt: Math.floor(Date.now() / 1000), // Unix timestamp as number
    });
  }

  public async delete(documentId: string): Promise<void> {
    await deleteDoc(doc(this.collection(), documentId));
  }

  public async *list(count: number): AsyncIterable<Document[]> {
    let result = await getDocs(query(this.query(), limit(count)));

    while (result.docs.length > 0) {
      yield result.docs.map((snapshot) => snapshot.data() as Document);

      result = await getDocs(
        query(this.query(), startAfter(last(result.docs)), limit(count)),
      );
    }
  }

  public async update(document: Document): Promise<void> {
    await updateDoc(doc(this.collection(), document.id), { ...document });
  }

  private query(): Query {
    return query(this.collection(), orderBy("createdAt", "desc"));
  }

  private collection(): CollectionReference<TimestampedDocument> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return collection(
      doc(collection(this.firestore, "users"), user.uid),
      "documents",
    ) as CollectionReference<TimestampedDocument>;
  }
}
