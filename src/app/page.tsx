'use client';

import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

import Home from './components/Home';
import Qualifications from './components/Qualificatioins';
import TimelinePage from './components/timeline';

export default function Page() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pt-15 pb-15">
      <div data-aos="fade-up">
        <Home />
      </div>
      <div data-aos="fade-up">
        <Qualifications />
      </div>
      <div className="w-[40vw]" data-aos="fade-up">
        <TimelinePage />
      </div>
    </div>
  );
}
