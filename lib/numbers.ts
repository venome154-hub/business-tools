const KEY = "biztoolsbox-numbers";

function readMap(): Record<string, number> {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function peekNumber(prefix: string) {
  const next = (readMap()[prefix] ?? 0) + 1;
  return `${prefix}-${String(next).padStart(3, "0")}`;
}

export function commitNumber(prefix: string, value: string) {
  const match = value.trim().match(new RegExp(`^${prefix}-(\\d+)$`, "i"));
  if (!match) return;
  const used = Number(match[1]);
  if (!Number.isFinite(used)) return;
  const map = readMap();
  if (used > (map[prefix] ?? 0)) {
    map[prefix] = used;
    localStorage.setItem(KEY, JSON.stringify(map));
  }
}
