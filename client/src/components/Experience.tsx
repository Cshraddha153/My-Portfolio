import type { Experience as Exp } from '../types';
import Reveal from './Reveal';
import Accordion from './Accordion';

export default function Experience({ experience }: { experience: Exp[] }) {
  return (
    <section id="experience" className="bg-slate-50 py-20 transition-colors dark:bg-[#120f24]">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">Work History</p>
          <h2 className="section-title">Industry Experience</h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">My professional journey building scalable software and intelligent systems in the industry.</p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {experience.map((x, i) => (
            <Reveal key={i} delay={i * 120}>
              <article className="card-glow rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 dark:bg-white/5 dark:ring-white/10 sm:p-8">
                <Accordion
                  header={
                    <>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl font-bold text-moto-navy dark:text-white">{x.role}</h3>
                        <span className="text-sm font-semibold text-moto-blue dark:text-moto-accent">{x.period}</span>
                      </div>
                      <p className="mt-1 font-medium text-slate-700 dark:text-slate-200">{x.company}</p>
                    </>
                  }
                >
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{x.summary}</p>

                  {x.achievements?.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {x.achievements.map((a, j) => (
                        <li key={j} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moto-accent" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </Accordion>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
