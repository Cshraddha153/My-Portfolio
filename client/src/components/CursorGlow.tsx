import { useEffect, useState } from 'react';

/**
 * A soft radial glow that follows the cursor for a premium, interactive feel.
 * Disabled automatically on touch / coarse-pointer devices.
 */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] hidden md:block"
      style={{
        background: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(124,92,255,0.12), transparent 70%)`,
      }}
    />
  );
}
