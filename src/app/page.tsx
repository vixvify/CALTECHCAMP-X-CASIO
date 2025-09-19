'use client';

import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

import Home from './components/Home';
import Qualifications from './components/Qualificatioins';
import Timeline from './components/Timeline';

export default function Page() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-[#101557] pt-15">
      <div data-aos="fade-up">
        <Home />
      </div>
      <div data-aos="fade-up">
        <Qualifications />
      </div>
      <div data-aos="fade-up">
        <Timeline />
      </div>
    </div>
  );
}
