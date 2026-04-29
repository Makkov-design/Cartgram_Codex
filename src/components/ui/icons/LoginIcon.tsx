export function LoginIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M14 7V5.5C14 4.12 12.88 3 11.5 3H6.5C5.12 3 4 4.12 4 5.5V18.5C4 19.88 5.12 21 6.5 21H11.5C12.88 21 14 19.88 14 18.5V17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12H20M20 12L17 9M20 12L17 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
