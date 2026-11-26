import assert from "node:assert/strict";
import test from "node:test";
import { blankDocument, handoffDocument, takeHandoff, writeHandoff } from "../lib/document-model.ts";

test("convert to quote and invoice keeps every line in local storage", () => {
  const memory = new Map<string, string>();
  const storage = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => { memory.set(key, value); },
    removeItem: (key: string) => { memory.delete(key); },
  };
  Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true });

  const state = blankDocument("estimate");
  state.notes = "Access as seen.";
  state.validUntil = "2026-12-15";
  state.items = [
    { description: "Walkthrough and measured sketch", quantity: "1", price: "180", tax: "", priceHigh: "260" },
    { description: "Materials allowance", quantity: "2", price: "40", tax: "0", priceHigh: "" },
    { description: "Contingency for concealed structure", quantity: "1", price: "0", tax: "", priceHigh: "750" },
  ];

  for (const target of ["quote", "invoice"] as const) {
    const payload = handoffDocument(state, target);
    assert.equal(payload.items.length, state.items.length);
    payload.items.forEach((item, index) => {
      const source = state.items[index];
      assert.ok(source);
      assert.equal(item.description, source.description);
      assert.equal(item.quantity, source.quantity);
      assert.equal(item.price, source.price);
      assert.equal(item.priceHigh, "");
    });
    assert.match(payload.notes, /Walkthrough and measured sketch: 180–260/);
    assert.match(payload.notes, /Contingency for concealed structure: 0–750/);
    assert.match(payload.notes, /Access as seen/);
    assert.equal(payload.number, "");
    assert.equal(payload.date, "");
    if (target === "invoice") assert.equal(payload.validUntil, "");
    if (target === "quote") assert.equal(payload.validUntil, "2026-12-15");

    writeHandoff({ to: target, payload });
    const stored = takeHandoff(target);
    assert.ok(stored?.payload?.items);
    assert.deepEqual(stored.payload.items.map((item) => item.description), state.items.map((item) => item.description));
    assert.deepEqual(stored.payload.items.map((item) => item.quantity), state.items.map((item) => item.quantity));
    assert.deepEqual(stored.payload.items.map((item) => item.price), state.items.map((item) => item.price));
    assert.equal(takeHandoff(target), null);
  }
});
