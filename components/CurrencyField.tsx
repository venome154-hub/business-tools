"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { currencyOptions, isCurrencyCode, matchCurrencies, type CurrencyOption } from "@/lib/locales";

function optionId(code: string) {
  return `currency-option-${code}`;
}

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
  const [active, setActive] = useState(-1);
  const picked = useRef(false);
  const onValidChangeRef = useRef(onValidChange);
  onValidChangeRef.current = onValidChange;
  useEffect(() => { setText(value); }, [value]);

  const known = isCurrencyCode(text);
  const suggestions = matchCurrencies(options, text);
  const activeOption: CurrencyOption | undefined = open && active >= 0 ? suggestions[active] : undefined;
  const showError = Boolean(text.trim()) && !known && (!open || suggestions.length === 0);
  useEffect(() => {
    onValidChangeRef.current?.(known);
  }, [known]);
  useEffect(() => {
    if (!activeOption) return;
    document.getElementById(optionId(activeOption.code))?.scrollIntoView({ block: "nearest" });
  }, [activeOption]);

  function choose(code: string) {
    picked.current = true;
    setText(code);
    setActive(-1);
    onChange(code);
    setOpen(false);
  }

  function commit(raw: string) {
    const code = raw.trim().toUpperCase();
    if (!isCurrencyCode(code)) return;
    setText(code);
    onChange(code);
  }

  function move(delta: number) {
    if (!suggestions.length) return;
    setOpen(true);
    setActive((current) => {
      const index = current >= 0 && current < suggestions.length ? current : -1;
      if (index === -1) return delta > 0 ? 0 : suggestions.length - 1;
      return Math.max(0, Math.min(suggestions.length - 1, index + delta));
    });
  }

  return (
    <label className="currency-field">Currency
      <input
        role="combobox"
        aria-expanded={open}
        aria-controls="currency-options"
        aria-autocomplete="list"
        aria-label="Currency"
        aria-activedescendant={activeOption ? optionId(activeOption.code) : undefined}
        aria-invalid={showError ? true : undefined}
        value={text}
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          setActive(-1);
          if (picked.current) {
            picked.current = false;
            return;
          }
          commit(text);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            move(1);
            return;
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            move(-1);
            return;
          }
          if (event.key === "Enter" && open && suggestions[active]) {
            event.preventDefault();
            choose(suggestions[active].code);
            return;
          }
          if (event.key === "Escape" && open) {
            event.preventDefault();
            setOpen(false);
            setActive(-1);
            return;
          }
          if (event.key === "Tab" && open && suggestions[active]) choose(suggestions[active].code);
        }}
        onChange={(event) => {
          const next = event.target.value;
          setOpen(true);
          setActive(-1);
          if (isCurrencyCode(next)) {
            commit(next);
            return;
          }
          setText(next);
        }}
      />
      {open && suggestions.length > 0 && (
        <div className="currency-list" id="currency-options" role="listbox">
          {suggestions.map((option, index) => (
            <button key={option.code} id={optionId(option.code)} type="button" role="option" aria-selected={index === active} onMouseDown={(event) => { event.preventDefault(); choose(option.code); }}>{option.label}</button>
          ))}
        </div>
      )}
      {showError && <span className="field-error">Unknown currency code</span>}
    </label>
  );
}
