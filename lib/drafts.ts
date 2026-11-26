import type { DocumentKind, DocumentState } from "@/lib/document-model";

export type StoredDocument = {
  id: string;
  kind: DocumentKind;
  label: string;
  number: string;
  updatedAt: number;
  payload: DocumentState;
};

const DB_NAME = "biztoolsbox";
const STORE = "documents";
const LIMIT = 20;

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function listDocuments() {
  const db = await openDb();
  const rows = await new Promise<StoredDocument[]>((resolve, reject) => {
    const request = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
    request.onsuccess = () => resolve(request.result as StoredDocument[]);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return rows.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function saveDocument(document: StoredDocument) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(STORE, "readwrite").objectStore(STORE).put(document);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
  const rows = await new Promise<StoredDocument[]>((resolve, reject) => {
    const request = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
    request.onsuccess = () => resolve(request.result as StoredDocument[]);
    request.onerror = () => reject(request.error);
  });
  const extra = rows.sort((a, b) => b.updatedAt - a.updatedAt).slice(LIMIT);
  if (extra.length) {
    const tx = db.transaction(STORE, "readwrite");
    extra.forEach((row) => tx.objectStore(STORE).delete(row.id));
    await new Promise<void>((resolve) => { tx.oncomplete = () => resolve(); });
  }
  db.close();
}

export async function deleteDocument(id: string) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(STORE, "readwrite").objectStore(STORE).delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
  db.close();
}
