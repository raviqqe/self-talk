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
  readonly #auth: Auth;
  readonly #storage: FirebaseStorage;

  constructor(app: FirebaseApp) {
    this.#auth = getAuth(app);
    this.#storage = getStorage(app);
  }

  async create(file: Blob): Promise<string> {
    const child = ref(this.#files(), window.crypto.randomUUID());

    await uploadBytes(child, file);
    await updateMetadata(child, {
      cacheControl: `max-age=${60 * 60 * 24 * 365}`,
    });

    return getDownloadURL(child);
  }

  #files(): StorageReference {
    const user = this.#auth.currentUser;

    if (!user) {
      throw new Error("user not authenticated");
    }

    return ref(this.#storage, `users/${user.uid}/files`);
  }
}
