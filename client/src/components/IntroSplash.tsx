import { useEffect, useState } from 'react';

/**
 * A one-time cinematic intro that plays on first load of the session.
 * Animated rings, a blurred-in greeting, and a letter-by-letter name reveal,
 * then the whole overlay fades away and unmounts.
 */
export default function IntroSplash({ name }: { name: string }) {
  const [phase, setPhase] = useState<'idle' | 'leaving' | 'gone'>(() =>
    typeof window !== 'undefined' && sessionStorage.getItem('introSeen') ? 'gone' : 'idle'
  );

  useEffect(() => {
    if (phase === 'gone') return;
    const leave = window.setTimeout(() => setPhase('leaving'), 2200);
    const done = window.setTimeout(() => {
      setPhase('gone');
      try {
        sessionStorage.setItem('introSeen', '1');
      } catch {
        /* ignore */
      }
    }, 3000);
    // Lock scroll while intro plays
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
      document.body.style.overflow = '';
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'gone') document.body.style.overflow = '';
  }, [phase]);

  if (phase === 'gone') return null;

  const letters = name.split('');

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-moto-dark transition-all duration-700 ${
        phase === 'leaving' ? 'pointer-events-none scale-110 opacity-0' : 'opacity-100'
      }`}
    >
      {/* Aurora wash */}
      <div className="absolute inset-0 bg-aurora opacity-70" />
      <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-moto-blue/30 blur-3xl" />

      {/* Expanding rings */}
      <span className="absolute h-40 w-40 animate-ring rounded-full border border-moto-accent/50" />
      <span
        className="absolute h-40 w-40 animate-ring rounded-full border border-moto-blue/50"
        style={{ animationDelay: '0.6s' }}
      />
      <span
        className="absolute h-40 w-40 animate-ring rounded-full border border-moto-accent2/50"
        style={{ animationDelay: '1.2s' }}
      />

      <div className="relative px-6 text-center">
        <p className="animate-reveal-blur text-xs font-semibold uppercase tracking-[0.4em] text-moto-accent">
          Welcome to the portfolio of
        </p>
        <h1 className="mt-4 flex flex-wrap justify-center text-4xl font-extrabold text-white sm:text-6xl">
          {letters.map((ch, i) => (
            <span
              key={i}
              className="animate-letter-up inline-block"
              style={{ animationDelay: `${0.5 + i * 0.06}s` }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>
        <div
          className="animate-reveal-blur mx-auto mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-moto-blue via-moto-accent to-moto-accent2"
          style={{ width: '160px', animationDelay: '1.4s' }}
        />
        <p
          className="animate-reveal-blur mt-6 text-sm font-medium tracking-wide text-slate-300 sm:text-base"
          style={{ animationDelay: '1.7s' }}
        >
          Crafting reliable software, one thoughtful line at a time.
        </p>
      </div>
    </div>
  );
}
