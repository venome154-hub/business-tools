"use client";

import { useState } from "react";

export default function CopyEmbed({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button className="secondary" type="button" onClick={() => {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }).catch(() => setCopied(false));
    }}>{copied ? "Copied" : "Copy embed code"}</button>
  );
}
