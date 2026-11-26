"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { currencyOptions, isCurrencyCode, matchCurrencies } from "@/lib/locales";

export default function CurrencyField({
  value,
  onChange,
  onValidChange,
}: {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (valid: boolean) => void;
}) {
  const options = useMemo(() => currencyOptions(), []);
  const [text, setText] = useState(value);
  const [open, setOpen] = useState(false);
  const picked = useRef(false);
  const onValidChangeRef = useRef(onValidChange);
  onValidChangeRef.current = onValidChange;
  useEffect(() => { setText(value); }, [value]);

  const known = isCurrencyCode(text);
  const suggestions = matchCurrencies(options, text);
  const showError = Boolean(text.trim()) && !known && (!open || suggestions.length === 0);
  useEffect(() => {
    onValidChangeRef.current?.(known);
  }, [known]);

  function choose(code: string) {
    picked.current = true;
    setText(code);
    onChange(code);
    setOpen(false);
  }

  function commit(raw: string) {
    const code = raw.trim().toUpperCase();
    if (!isCurrencyCode(code)) return;
    setText(code);
    onChange(code);
  }

  return (
    <label className="currency-field">Currency
      <input
        role="combobox"
        aria-expanded={open}
        aria-controls="currency-options"
        aria-autocomplete="list"
        aria-label="Currency"
        aria-invalid={showError ? true : undefined}
        value={text}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          if (picked.current) {
            picked.current = false;
            return;
          }
          commit(text);
        }}
        onChange={(event) => {
          const next = event.target.value;
          setOpen(true);
          if (isCurrencyCode(next)) {
            commit(next);
            return;
          }
          setText(next);
        }}
      />
      {open && suggestions.length > 0 && (
        <div className="currency-list" id="currency-options" role="listbox">
          {suggestions.map((option) => (
            <button key={option.code} type="button" role="option" aria-selected={option.code === text.trim().toUpperCase()} onMouseDown={(event) => { event.preventDefault(); choose(option.code); }}>{option.label}</button>
          ))}
        </div>
      )}
      {showError && <span className="field-error">Unknown currency code</span>}
    </label>
  );
}
