export const ADS_ENABLED = false;

export default function AdSlot({ place }: { place: "after-result" | "in-article" }) {
  if (!ADS_ENABLED) return null;
  return <aside className={`ad-slot ad-slot--${place}`} aria-label="Advertisement"><span>Advertisement</span></aside>;
}
