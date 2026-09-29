export function WarrantMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect x="1.5" y="1.5" width="29" height="29" rx="4" className="stroke-fg" strokeWidth="1.4" />
      <path
        d="M8 9.5h2.2l2.55 8.2L15.4 9.5h1.2l2.65 8.2 2.55-8.2H24L19.7 22.5h-1.35L15.95 14.6 13.65 22.5H12.3L8 9.5Z"
        className="fill-fg"
      />
    </svg>
  );
}
