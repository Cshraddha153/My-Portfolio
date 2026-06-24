import Reveal from './Reveal';

// Render a string with **bold** segments highlighted in the brand accent.
function renderEmphasis(text: string) {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-moto-blue dark:text-moto-accent">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function About({ beliefs }: { beliefs: string }) {
  return (
    <section id="about" className="bg-white py-20 transition-colors dark:bg-moto-dark">
      <div className="section-container max-w-4xl">
        <Reveal>
          <p className="section-kicker">Who I Am</p>
          <h2 className="section-title">The Engineer Behind the Code</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-200 sm:text-xl sm:leading-relaxed">
            {renderEmphasis(beliefs)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
