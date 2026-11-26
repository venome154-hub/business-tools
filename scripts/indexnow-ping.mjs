import fs from "node:fs";

const dryRun = process.argv.includes("--dry-run");
const key = process.env.INDEXNOW_KEY?.trim() ?? "";
const host = "www.biztoolsbox.online";
const site = `https://${host}`;
const statePath = process.env.INDEXNOW_STATE || ".indexnow-state.json";

if (!/^[a-f0-9]{32}$/.test(key)) {
  console.error("INDEXNOW_KEY must be 32 hex characters. Skipping IndexNow.");
  process.exit(0);
}

let xml = "";
try {
  const response = await fetch(`${site}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap status ${response.status}`);
  xml = await response.text();
} catch (error) {
  console.error("IndexNow could not read the sitemap.", error);
  process.exit(0);
}

const urls = [];
for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = block[1].match(/<loc>([^<]+)<\/loc>/);
  const lastmod = block[1].match(/<lastmod>([^<]+)<\/lastmod>/);
  if (loc) urls.push({ loc: loc[1], lastmod: lastmod?.[1] ?? "" });
}

let previous = {};
if (fs.existsSync(statePath)) previous = JSON.parse(fs.readFileSync(statePath, "utf8"));
const firstRun = Object.keys(previous).length === 0;
const changed = urls.filter((item) => firstRun || previous[item.loc] !== item.lastmod).slice(0, 10000);
const payload = {
  host,
  key,
  keyLocation: `${site}/${key}.txt`,
  urlList: changed.map((item) => item.loc),
};

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
} else if (payload.urlList.length === 0) {
  console.log("IndexNow: no URL changes since the last ping.");
} else {

try {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow response ${response.status}`);
  if (response.ok) {
    const next = { ...previous };
    for (const item of changed) next[item.loc] = item.lastmod;
    fs.writeFileSync(statePath, JSON.stringify(next));
  }
} catch (error) {
  console.error("IndexNow request failed.", error);
}
}
