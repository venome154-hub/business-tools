import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { currencyOptions, isCurrencyCode, matchCurrencies } from "../lib/locales.ts";

const options = currencyOptions();
const codes = (query: string) => matchCurrencies(options, query).map((option) => option.code);

describe("currency search", () => {
  it("matches english names and codes", () => {
    assert.deepEqual(codes("yen"), ["JPY"]);
    assert.deepEqual(codes("euro"), ["EUR"]);
    assert.ok(codes("pound").includes("GBP"));
    assert.ok(codes("sum").includes("UZS"));
    assert.ok(codes("sum").includes("KGS"));
    assert.ok(codes("rupee").includes("INR"));
    assert.ok(codes("dirham").includes("AED"));
    assert.ok(codes("uz").includes("UZS"));
  });

  it("labels the option with the code and the english name", () => {
    const yen = matchCurrencies(options, "yen")[0];
    assert.equal(yen.label, "JPY — Japanese Yen");
  });

  it("offers nothing for an unknown code", () => {
    assert.deepEqual(codes("abc"), []);
    assert.equal(isCurrencyCode("abc"), false);
    assert.equal(isCurrencyCode("jpy"), true);
  });
});
