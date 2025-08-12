import type { FirebaseApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import {
  type FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  type StorageReference,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import type { FileRepository } from "../../application/file-repository.js";

export class FirebaseStorageFileRepository implements FileRepository {
  private readonly auth: Auth;
  private readonly storage: FirebaseStorage;

  public constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
    this.storage = getStorage(app);
  }

  public async create(file: Blob): Promise<string> {
    const child = ref(this.files(), window.crypto.randomUUID());

    await uploadBytes(child, file);
    await updateMetadata(child, {
      cacheControl: `max-age=${60 * 60 * 24 * 365}`,
    });

    return getDownloadURL(child);
  }

  private files(): StorageReference {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return ref(this.storage, `users/${user.uid}/files`);
  }
}
