import { useEffect, useRef, useState } from 'react';
import type { Profile } from '../types';

// Decorative particle field — fixed positions so they don't reshuffle on re-render.
const PARTICLES = [
  { top: '12%', left: '8%', size: 6, delay: '0s', anim: 'animate-float' },
  { top: '22%', left: '82%', size: 4, delay: '0.6s', anim: 'animate-twinkle' },
  { top: '70%', left: '14%', size: 5, delay: '1.1s', anim: 'animate-float-slow' },
  { top: '82%', left: '76%', size: 7, delay: '0.3s', anim: 'animate-float' },
  { top: '38%', left: '48%', size: 3, delay: '1.4s', anim: 'animate-twinkle' },
  { top: '58%', left: '60%', size: 5, delay: '0.9s', anim: 'animate-float-slow' },
  { top: '16%', left: '34%', size: 4, delay: '1.7s', anim: 'animate-twinkle' },
  { top: '46%', left: '90%', size: 6, delay: '0.2s', anim: 'animate-float' },
  { top: '88%', left: '40%', size: 4, delay: '1.2s', anim: 'animate-twinkle' },
  { top: '30%', left: '20%', size: 5, delay: '0.5s', anim: 'animate-float-slow' },
  { top: '64%', left: '32%', size: 3, delay: '1.9s', anim: 'animate-twinkle' },
  { top: '8%', left: '64%', size: 5, delay: '0.8s', anim: 'animate-float' },
];

// Small bubbles that continuously rise around the profile photo.
const RISING_BUBBLES = [
  { left: '12%', size: 10, delay: '0s', dur: '4.5s' },
  { left: '24%', size: 6, delay: '1.2s', dur: '5.5s' },
  { left: '40%', size: 14, delay: '0.6s', dur: '4s' },
  { left: '54%', size: 8, delay: '2s', dur: '6s' },
  { left: '68%', size: 11, delay: '0.3s', dur: '5s' },
  { left: '80%', size: 7, delay: '1.6s', dur: '4.8s' },
  { left: '90%', size: 9, delay: '2.4s', dur: '5.2s' },
  { left: '34%', size: 5, delay: '3s', dur: '6.5s' },
];

// Paper aeroplanes that keep drifting around the profile photo (engineering vibe).
const PLANES = [
  { anim: 'plane-fly-1', dur: '11s', delay: '0s', size: 26, top: '8%', left: '-6%', trail: true },
  { anim: 'plane-fly-2', dur: '14s', delay: '2.5s', size: 20, top: '4%', left: '70%', trail: false },
  { anim: 'plane-fly-3', dur: '13s', delay: '5s', size: 22, top: '40%', left: '20%', trail: true },
  { anim: 'plane-fly-1', dur: '16s', delay: '7.5s', size: 16, top: '60%', left: '-10%', trail: false },
];

// A small paper-plane icon.
function PaperPlane({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2 11 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22 2 15 22l-4-9-9-4 20-7Z"
        fill="currentColor"
        fillOpacity="0.85"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Renders the name with each letter animated (continuous gradient + floating wave).
function AnimatedName({ name }: { name: string }) {
  let letterIndex = 0;
  return (
    <span className="relative inline-block whitespace-nowrap">
      {name.split(' ').map((word, wi, words) => (
        <span key={wi} className="inline-block">
          {word.split('').map((char) => {
            const i = letterIndex++;
            return (
              <span
                key={i}
                className="name-letter font-script"
                style={{ animationDelay: `${i * 0.12}s, ${i * 0.12}s` }}
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      {/* Glow sweep that keeps travelling across the name */}
      <span className="name-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </span>
  );
}

export default function Hero({ profile }: { profile: Profile }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [showBubble, setShowBubble] = useState(false);

  // On touch devices (no hover), auto-dismiss the greeting a few seconds after a tap.
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 5000);
    return () => clearTimeout(t);
  }, [showBubble]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 14, ry: px * 14 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section id="home" className="relative overflow-hidden bg-moto-navy text-white">
      {/* Animated aurora gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0a1f] via-[#1b1640] to-[#2a1d5e] bg-[length:200%_200%] animate-gradient-pan" />

      {/* Rich mesh-gradient overlay */}
      <div className="absolute inset-0 bg-aurora opacity-60 mix-blend-screen" />

      {/* Morphing aurora blobs */}
      <div className="absolute -right-24 -top-24 h-96 w-96 animate-aurora rounded-full bg-moto-blue/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 animate-aurora-slow rounded-full bg-moto-accent/30 blur-3xl" />
      <div className="absolute left-1/3 top-1/2 h-72 w-72 animate-pulse-glow rounded-full bg-moto-accent2/25 blur-3xl" />

      {/* Floating particle field */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full bg-white/70 shadow-glow-accent ${p.anim}`}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Faint moving grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="section-container relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <h1 className="mt-5 text-5xl font-extrabold leading-tight sm:text-7xl">
            <AnimatedName name={profile.name} />
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-200">{profile.title}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-moto-blue to-moto-blue-dark px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03]"
            >
              <span className="relative z-10">View portfolio</span>
              {/* Shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-moto-accent hover:bg-white/10 hover:text-moto-accent"
            >
              Get in touch
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {profile.location}
          </p>
        </div>

        {/* Single profile photo with interactive 3D tilt + spinning gradient ring */}
        <div
          className="relative flex animate-fade-up justify-center md:justify-end"
          style={{ perspective: '1000px' }}
        >
          {/* Paper aeroplanes drifting around the profile (engineering student vibe) */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-visible">
            {PLANES.map((p, i) => (
              <span
                key={i}
                className={`paper-plane ${p.trail ? 'trail' : ''}`}
                style={{
                  top: p.top,
                  left: p.left,
                  animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`,
                }}
              >
                <PaperPlane size={p.size} />
              </span>
            ))}
          </div>

          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseEnter={() => setShowBubble(true)}
            onMouseLeave={() => {
              reset();
              setShowBubble(false);
            }}
            onClick={() => setShowBubble((v) => !v)}
            role="button"
            tabIndex={0}
            aria-label="Say hello"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowBubble((v) => !v);
              }
            }}
            className="group relative cursor-pointer transition-transform duration-200 ease-out"
            style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
          >
            {/* Small bubbles continuously rising from the photo */}
            <div className="pointer-events-none absolute inset-x-0 bottom-4 top-0 z-20 overflow-visible">
              {RISING_BUBBLES.map((b, i) => (
                <span
                  key={i}
                  className="rising-bubble absolute bottom-0 rounded-full border border-white/70 bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.6)] backdrop-blur-[1px]"
                  style={{
                    left: b.left,
                    width: b.size,
                    height: b.size,
                    animationDelay: b.delay,
                    animationDuration: b.dur,
                  }}
                />
              ))}
            </div>

            {/* Greeting cloud — perched at the top-right corner of the photo */}
            {showBubble && (
              <div
                key={Date.now()}
                className="bubble-cloud pointer-events-none absolute -top-16 -right-12 z-30 w-60 sm:-right-20"
              >
                <div className="relative">
                  {/* Real fluffy cloud shape drawn with overlapping puffs + soft gradient */}
                  <svg
                    viewBox="0 0 220 150"
                    className="h-auto w-full drop-shadow-[0_12px_30px_rgba(124,92,255,0.45)]"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient id="cloudFill" cx="50%" cy="38%" r="75%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="70%" stopColor="#fdf2ff" />
                        <stop offset="100%" stopColor="#fce7f3" />
                      </radialGradient>
                    </defs>
                    <g fill="url(#cloudFill)" stroke="#f9a8d4" strokeWidth="1.5">
                      <circle cx="65" cy="72" r="38" />
                      <circle cx="110" cy="50" r="46" />
                      <circle cx="158" cy="72" r="36" />
                      <circle cx="92" cy="94" r="40" />
                      <circle cx="135" cy="94" r="38" />
                      <ellipse cx="110" cy="102" rx="86" ry="34" />
                    </g>
                    {/* little tail puffs pointing down-left toward the photo */}
                    <g fill="url(#cloudFill)" stroke="#f9a8d4" strokeWidth="1.5">
                      <circle cx="78" cy="128" r="12" />
                      <circle cx="60" cy="140" r="7" />
                    </g>
                  </svg>
                  {/* Cursive black greeting overlaid on the cloud */}
                  <p className="absolute inset-x-6 top-1/2 -translate-y-[58%] text-center font-script text-[1.35rem] font-bold leading-tight text-black">
                    Hi there! So glad you stopped by — let&apos;s connect!
                  </p>
                  {/* sparkles */}
                  <span className="bubble-spark absolute left-2 top-2 text-base">✨</span>
                  <span
                    className="bubble-spark absolute right-3 top-3 text-base"
                    style={{ animationDelay: '0.15s' }}
                  >
                    ⭐
                  </span>
                  <span
                    className="bubble-spark absolute right-6 bottom-2 text-sm"
                    style={{ animationDelay: '0.3s' }}
                  >
                    💫
                  </span>
                </div>
              </div>
            )}

            {/* Conic spinning glow */}
            <div className="absolute -inset-6 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#7C5CFF,#22D3EE,#F472B6,#7C5CFF)] opacity-60 blur-2xl transition group-hover:opacity-90" />
            {/* Morphing blob accent */}
            <div className="absolute -inset-3 animate-blob bg-gradient-to-tr from-moto-blue to-moto-accent opacity-70 blur-md transition group-hover:opacity-100" />
            {/* Pulsing pink halo ring */}
            <div className="absolute -inset-2 animate-pulse-glow rounded-full border-2 border-pink-400/70 shadow-[0_0_30px_rgba(244,114,182,0.6)]" />
            <div className="relative h-72 w-72 overflow-hidden rounded-full border-[6px] border-pink-400 shadow-[0_0_45px_-6px_rgba(244,114,182,0.8)] ring-4 ring-pink-300/40 transition-transform duration-500 group-hover:scale-105 sm:h-80 sm:w-80">
              <img
                src={profile.photoUrl}
                alt={`Portrait of ${profile.name}`}
                className="h-full w-full object-cover"
              />
              {/* Glossy sheen that follows the tilt */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(${135 + tilt.ry * 4}deg, rgba(255,255,255,0.28), transparent 55%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative flex justify-center pb-8">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="flex h-9 w-9 animate-bounce-subtle items-center justify-center rounded-full border border-white/25 text-white/70 transition hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
