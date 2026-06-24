import { useState, type ReactNode } from 'react';

/**
 * Click-to-expand panel. The header is always visible; the detailed content
 * is hidden until the user clicks, then smoothly expands into view.
 */
export default function Accordion({
  header,
  children,
  defaultOpen = false,
}: {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group/acc flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0 flex-1">{header}</div>
        <span
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-moto-blue/30 text-moto-blue transition-all duration-300 group-hover/acc:bg-moto-blue group-hover/acc:text-white dark:border-white/15 dark:text-moto-accent ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
