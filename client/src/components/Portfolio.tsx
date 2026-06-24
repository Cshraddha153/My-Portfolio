import type { ProjectGroup } from '../types';
import Reveal from './Reveal';
import Accordion from './Accordion';

export default function Portfolio({ groups }: { groups: ProjectGroup[] }) {
  return (
    <section id="portfolio" className="bg-white py-20 transition-colors dark:bg-moto-dark">
      <div className="section-container">
        <Reveal>
          <p className="section-kicker">Projects</p>
          <h2 className="section-title">Projects</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            A selection of software engineering builds, AI/ML systems, and published research work.
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Click a card to view the details.</p>
        </Reveal>

        <div className="mt-12 space-y-14">
          {groups.map((group, gi) => (
            <div key={group.category}>
              <Reveal>
                <h3 className="flex items-center gap-3 text-xl font-bold text-moto-navy dark:text-white">
                  <span className="h-6 w-1.5 rounded-full bg-moto-blue dark:bg-moto-accent" />
                  {group.category}
                </h3>
              </Reveal>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {group.items.map((item, i) => (
                  <Reveal key={item.title} delay={(i % 2) * 120}>
                    <article className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 p-6 shadow-sm hover:border-moto-blue/40 dark:border-white/10 dark:bg-white/5">
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-moto-blue/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                      <Accordion
                        header={
                          <h4 className="pr-2 text-lg font-bold text-moto-navy dark:text-white">{item.title}</h4>
                        }
                      >
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {item.description}
                        </p>

                        {item.links && item.links.length > 0 ? (
                          <div className="mt-4 flex flex-wrap gap-4">
                            {item.links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-moto-blue transition-all hover:gap-2 dark:text-moto-accent"
                              >
                                {link.label}
                                <span aria-hidden="true">&rarr;</span>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <span className="mt-4 block text-sm font-medium text-slate-400">Available on request</span>
                        )}
                      </Accordion>
                    </article>
                  </Reveal>
                ))}
              </div>

              {gi < groups.length - 1 && (
                <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
