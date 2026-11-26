"use client";

import { useEffect, useState } from "react";
import CopyEmbed from "@/components/CopyEmbed";

export default function EmbedCode({ code }: { code: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(window.self === window.top);
  }, []);
  if (!show) return null;
  return <CopyEmbed code={code} />;
}
