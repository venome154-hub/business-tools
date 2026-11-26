"use client";

import { useEffect, useState } from "react";

export default function BlankTemplateButton({ href, label }: { href: string; label: string }) {
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    let cancel = false;
    fetch(href).then((response) => response.blob()).then((next) => {
      if (!cancel) setBlob(next);
    }).catch(() => {
      if (!cancel) setBlob(null);
    });
    return () => { cancel = true; };
  }, [href]);

  return (
    <a
      className="btn-primary"
      href={href}
      download
      onClick={(event) => {
        if (!blob) return;
        event.preventDefault();
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = href.split("/").pop() || "template";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      }}
    >
      {label}
    </a>
  );
}
