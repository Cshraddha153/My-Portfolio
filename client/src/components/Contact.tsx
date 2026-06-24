import { useState, type FormEvent } from 'react';
import type { ProfileLinks } from '../types';
import { sendContact } from '../api';

interface Status {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function Contact({ email, links }: { email: string; links: ProfileLinks }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>({ type: 'idle' });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ type: 'loading' });
    try {
      const res = await sendContact(form);
      setStatus({ type: 'success', message: res.message });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong.',
      });
    }
  }

  const inputClass =
    'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-moto-accent focus:ring-2 focus:ring-moto-accent/40';

  return (
    <section id="contact" className="bg-moto-navy py-20 text-white">
      <div className="section-container grid gap-12 md:grid-cols-2">
        <div>
          <p className="section-kicker text-moto-accent">Let's Connect</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Get in touch</h2>
          <p className="mt-4 max-w-md text-slate-300">
            Interested in my work or just want to connect? Send a message and I'll
            respond as soon as possible.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 text-slate-200 transition hover:text-moto-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {email}
            </a>
            <div className="flex gap-4 pt-2">
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:bg-white/10"
                >
                  LinkedIn
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:bg-white/10"
                >
                  GitHub
                </a>
              )}
              {links.scholar && (
                <a
                  href={links.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:bg-white/10"
                >
                  Google Scholar
                </a>
              )}
              {links.leetcode && (
                <a
                  href={links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:bg-white/10"
                >
                  LeetCode
                </a>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              maxLength={150}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              maxLength={2000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="How can I help?"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full rounded-lg bg-moto-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-moto-blue/30 transition hover:bg-moto-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.type === 'loading' ? 'Sending…' : 'Send message'}
          </button>

          {status.type === 'success' && (
            <p className="rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-300">
              {status.message}
            </p>
          )}
          {status.type === 'error' && (
            <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-300">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
