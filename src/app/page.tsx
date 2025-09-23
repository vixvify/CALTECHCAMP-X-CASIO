'use client';

import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

import Home from './components/Home';
import Qualifications from './components/qualificatioins';
import Timeline from './components/timeline';
import Place from './components/place';

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center pt-15 pb-15">
      <section data-aos="fade-up" id="home">
        <Home />
      </section>
      <section data-aos="fade-up" id="qualification">
        <Qualifications />
      </section>
      <section className="w-[40vw]" id="timeline">
        <h1 className="pb-20 text-left text-4xl font-bold text-white">กำหนดการ</h1>
        <Timeline />
      </section>
      <section data-aos="fade-up" id="place">
        <Place />
      </section>
    </div>
  );
}
