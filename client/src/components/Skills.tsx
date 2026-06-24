import { useState } from 'react';
import type { SkillGroup } from '../types';
import Reveal from './Reveal';

// Emoji icon per category (falls back to a sparkle).
const ICONS: Record<string, string> = {
  Languages: '💻',
  Frontend: '🎨',
  Backend: '🧩',
  Databases: '🗄️',
  'Vector Databases': '🧮',
  'AI / ML': '🤖',
  'Tools & Frameworks': '🛠️',
  'Architecture & DevOps': '☁️',
};

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const icon = ICONS[group.category] ?? '✦';

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 dark:bg-white/5 ${
        open
          ? 'border-moto-blue/40 shadow-glow'
          : 'border-slate-200 hover:border-moto-blue/30 dark:border-white/10'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-moto-blue/15 to-moto-accent/15 text-xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
        <span className="flex-1">
          <span className="block text-base font-bold text-moto-navy dark:text-white">
            {group.category}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {group.items.length} {group.items.length === 1 ? 'skill' : 'skills'}
          </span>
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-moto-blue transition-all duration-300 dark:text-moto-accent ${
            open ? 'rotate-180 bg-moto-blue/10' : 'group-hover:bg-slate-100 dark:group-hover:bg-white/10'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Collapsible body (grid-rows trick for smooth height animation) */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2.5 px-5 pb-6 pt-1 sm:px-6">
            {group.items.map((skill, i) => (
              <span
                key={skill}
                style={{ transitionDelay: open ? `${i * 30}ms` : '0ms' }}
                className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-moto-navy transition-all duration-500 hover:-translate-y-0.5 hover:border-moto-blue hover:bg-moto-blue hover:text-white hover:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-moto-blue dark:hover:bg-moto-blue dark:hover:text-white ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="bg-slate-50 py-20 transition-colors dark:bg-[#120f24]">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">Areas of Expertise</p>
          <h2 className="section-title">Technical Skills</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            A look under the hood at the technologies driving my projects.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 80}>
              <SkillCard group={group} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
