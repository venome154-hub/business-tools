"use client";

import { useMemo, useState } from "react";
import { currencyCodes } from "@/lib/locales";

export default function CurrencyField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [query, setQuery] = useState("");
  const codes = useMemo(() => currencyCodes(), []);
  const matches = codes.filter((code) => code.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8);

  function commit(next: string) {
    const code = next.trim().toUpperCase();
    if (codes.includes(code)) onChange(code);
    setQuery("");
  }

  return (
    <label className="currency-field">Currency
      <input
        value={query || value}
        onChange={(event) => setQuery(event.target.value.toUpperCase())}
        onBlur={() => commit(query || value)}
        aria-label="Currency"
        autoComplete="off"
      />
      {query && matches.length > 0 && (
        <div className="currency-list" role="listbox">
          {matches.map((code) => (
            <button key={code} type="button" onMouseDown={(event) => { event.preventDefault(); commit(code); }}>{code}</button>
          ))}
        </div>
      )}
    </label>
  );
}
