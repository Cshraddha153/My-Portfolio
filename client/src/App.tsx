import { useEffect, useState } from 'react';
import type { Profile } from './types';
import { getProfile } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroSplash from './components/IntroSplash';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() =>
        setError(
          'We could not load the portfolio content. Please make sure the API server is running.'
        )
      );
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-moto-navy px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
          <p className="mt-3 text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-moto-navy">
        <div className="flex flex-col items-center gap-4 text-white">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          <p className="text-sm tracking-wide text-slate-300">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <IntroSplash name={profile.name} />
      <ScrollProgress />
      <CursorGlow />
      <Navbar name={profile.name} />
      <main>
        <Hero profile={profile} />
        <About beliefs={profile.beliefs} />
        <Skills skills={profile.skills} />
        <Education education={profile.education} />
        <Experience experience={profile.experience} />
        <Portfolio groups={profile.projects} />
        <Contact email={profile.email} links={profile.links} />
      </main>
      <Footer name={profile.name} links={profile.links} />
    </div>
  );
}
