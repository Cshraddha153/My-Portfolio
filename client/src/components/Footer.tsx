import type { ProfileLinks } from '../types';

export default function Footer({ name, links }: { name: string; links: ProfileLinks }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-moto-dark py-10 text-slate-400">
      <div className="section-container flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 font-bold text-white">
          <img src="/shraddha_image.jpg" alt="" className="h-6 w-6 rounded-full border-2 border-sky-400 object-cover" />
          {name}
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-sm">
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LinkedIn
            </a>
          )}
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
          )}
          {links.scholar && (
            <a href={links.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Google Scholar
            </a>
          )}
          {links.leetcode && (
            <a href={links.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LeetCode
            </a>
          )}
          {links.email && (
            <a href={links.email} className="hover:text-white">
              Email
            </a>
          )}
        </div>

        <p className="text-xs text-slate-500">
          &copy; {year} {name}. Personal portfolio.
        </p>
        <p className="max-w-xl text-xs text-slate-600">
          Thank you for taking the time to visit my portfolio. I appreciate your interest in my
          work.
        </p>
      </div>
    </footer>
  );
}
