import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-white/10 dark:bg-moto-dark/90">
      <nav className="section-container flex h-16 items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 font-extrabold tracking-tight text-moto-navy transition-transform hover:scale-105 dark:text-white"
        >
          <img src="/shraddha_image.jpg" alt="" className="h-8 w-8 rounded-full border-2 border-sky-400 object-cover" />
          <span>{name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-slate-600 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-moto-blue after:transition-all hover:text-moto-blue hover:after:w-full dark:text-slate-300 dark:hover:text-moto-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md text-moto-navy dark:text-slate-200 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-slate-200 bg-white px-5 py-2 dark:border-white/10 dark:bg-moto-dark md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-slate-700 hover:text-moto-blue dark:text-slate-300 dark:hover:text-moto-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
