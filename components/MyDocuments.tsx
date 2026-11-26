"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DOC_PATHS, writeHandoff, type DocumentKind } from "@/lib/document-model";
import { KIND_CONFIG } from "@/lib/document-kinds";
import { deleteDocument, listDocuments, saveDocument, type StoredDocument } from "@/lib/drafts";
import { commitNumber, peekNumber } from "@/lib/numbers";

export default function MyDocuments() {
  const router = useRouter();
  const [rows, setRows] = useState<StoredDocument[]>([]);
  const [error, setError] = useState("");

  async function refresh() {
    try {
      setRows(await listDocuments());
    } catch {
      setError("Documents saved on this device could not be read.");
    }
  }

  useEffect(() => { void refresh(); }, []);

  function open(row: StoredDocument) {
    writeHandoff({ to: row.kind, draftId: row.id, payload: row.payload });
    router.push(DOC_PATHS[row.kind]);
  }

  async function duplicate(row: StoredDocument) {
    const prefix = KIND_CONFIG[row.kind].prefix;
    const number = peekNumber(prefix);
    const copy: StoredDocument = {
      ...row,
      id: crypto.randomUUID(),
      number,
      updatedAt: Date.now(),
      payload: { ...row.payload, number },
      label: `${row.label} copy`,
    };
    await saveDocument(copy);
    commitNumber(prefix, number);
    await refresh();
  }

  return (
    <section className="seo-content">
      <h1>My documents</h1>
      <p>The latest 20 documents you saved or downloaded stay in this browser. They are not sent to BizToolsBox.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      {rows.length === 0 && !error && <p>No documents saved on this device yet.</p>}
      <ul className="doc-list">
        {rows.map((row) => (
          <li key={row.id}>
            <div><strong>{KIND_CONFIG[row.kind as DocumentKind]?.heading || row.kind}</strong><span>{row.number} · {row.label}</span></div>
            <div className="profile-actions">
              <button type="button" className="secondary" onClick={() => open(row)}>Open</button>
              <button type="button" className="secondary" onClick={() => duplicate(row)}>Duplicate</button>
              <button type="button" className="secondary" onClick={async () => { await deleteDocument(row.id); await refresh(); }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
