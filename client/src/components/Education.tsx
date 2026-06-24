import type { Education as Edu } from '../types';
import Reveal from './Reveal';
import Accordion from './Accordion';

export default function Education({ education }: { education: Edu[] }) {
  return (
    <section id="education" className="bg-white py-20 transition-colors dark:bg-moto-dark">
      <div className="section-container max-w-4xl">
        <Reveal>
          <p className="section-kicker">Qualifications</p>
          <h2 className="section-title">Educational Background</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            An overview of my academic qualifications and the foundational learning that shaped my
            technical mindset.
          </p>
        </Reveal>

        <ol className="mt-10 space-y-8 border-l-2 border-slate-100 pl-6 dark:border-white/10">
          {education.map((e, i) => (
            <Reveal key={i} delay={i * 120}>
              <li className="relative">
                <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-moto-blue dark:border-moto-dark" />
                <Accordion
                  defaultOpen={i === 0}
                  header={
                    <>
                      <p className="text-sm font-semibold text-moto-blue dark:text-moto-accent">{e.period}</p>
                      <h3 className="mt-1 text-lg font-bold text-moto-navy dark:text-white">{e.degree}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{e.institution}</p>
                    </>
                  }
                >
                  <div className="space-y-3 pt-1">
                    {e.score && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-moto-blue/10 px-3 py-1 text-sm font-semibold text-moto-blue dark:bg-moto-accent/10 dark:text-moto-accent">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M12 2l2.4 6.9H22l-6 4.3 2.3 7L12 16.9 5.7 20.2 8 13.2l-6-4.3h7.6z" />
                        </svg>
                        {e.score}
                      </span>
                    )}
                    {e.coursework && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Relevant Coursework
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {e.coursework}
                        </p>
                      </div>
                    )}
                    {e.details && (
                      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{e.details}</p>
                    )}
                  </div>
                </Accordion>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
