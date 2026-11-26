export default function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="#2563EB" />
      <text x="14" y="19.5" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700">B</text>
    </svg>
  );
}
