"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { currencyCodes } from "@/lib/locales";

export default function CurrencyField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const codes = useMemo(() => currencyCodes(), []);
  const [text, setText] = useState(value);
  const [open, setOpen] = useState(false);
  const picked = useRef(false);
  useEffect(() => { setText(value); }, [value]);

  const query = text.trim().toUpperCase();
  const known = codes.includes(query);
  const matches = codes.filter((code) => code.includes(query)).slice(0, 12);

  function choose(code: string) {
    picked.current = true;
    setText(code);
    onChange(code);
    setOpen(false);
  }

  return (
    <label className="currency-field">Currency
      <input
        role="combobox"
        aria-expanded={open}
        aria-controls="currency-options"
        aria-autocomplete="list"
        aria-label="Currency"
        value={text}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          if (picked.current) {
            picked.current = false;
            return;
          }
          const code = text.trim().toUpperCase();
          setText(code);
          onChange(code);
        }}
        onChange={(event) => {
          const next = event.target.value.toUpperCase();
          setText(next);
          setOpen(true);
          if (codes.includes(next.trim())) onChange(next.trim());
        }}
      />
      {open && matches.length > 0 && (
        <div className="currency-list" id="currency-options" role="listbox">
          {matches.map((code) => (
            <button key={code} type="button" role="option" aria-selected={code === query} onMouseDown={(event) => { event.preventDefault(); choose(code); }}>{code}</button>
          ))}
        </div>
      )}
      {query && !known && <span className="field-error">Unknown currency code</span>}
    </label>
  );
}
