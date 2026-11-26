"use client";

import { useState } from "react";

export default function CopyEmbed({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="embed-copy">
      <label>
        Embed code
        <textarea className="embed-code" readOnly rows={4} value={code} />
      </label>
      <button className="secondary" type="button" onClick={() => {
        navigator.clipboard.writeText(code).then(() => setCopied(true)).catch(() => setCopied(false));
      }}>Copy embed code</button>
      {copied ? <p className="field-note">Embed code copied.</p> : null}
    </div>
  );
}
