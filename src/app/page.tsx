'use client';

import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Head from 'next/head';
import Home from './components/Home';
import Qualifications from './components/qualificatioins';
import Timeline from './components/timeline';
import Place from './components/place';
import Footer from './components/Footer';

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
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-20 pt-15">
      <Head>
        <title>Calctech Camp X Casio</title>
        <meta
          name="description"
          content="ค่ายแข่งขันนวัตกรรมตามหลัก SDGs ที่พาน้องๆ เรียนรู้คณิตศาสตร์กับเครื่องคิดเลขวิทยาศาสตร์ พร้อมกิจกรรมและเวิร์กชอปสุดเข้มข้นตลอด 3 วัน 2 คืน"
        />
        <meta
          name="keywords"
          content="calctechcampxcasio, calctechcamp, calctech, casio"
        />
        <meta property="og:title" content="Calctech Camp X Casio" />
        <meta
          property="og:description"
          content="ค่ายแข่งขันนวัตกรรมตามหลัก SDGs ที่พาน้องๆ เรียนรู้คณิตศาสตร์กับเครื่องคิดเลขวิทยาศาสตร์ พร้อมกิจกรรมและเวิร์กชอปสุดเข้มข้นตลอด 3 วัน 2 คืน"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <section data-aos="fade-up" id="home">
        <Home />
      </section>
      <section data-aos="fade-up" id="qualification">
        <Qualifications />
      </section>
      <section className="w-[40vw]" id="timeline">
        <h1 className="pb-20 text-left text-4xl font-bold text-white">
          กำหนดการ
        </h1>
        <Timeline />
      </section>
      <section data-aos="fade-up" id="place">
        <Place />
      </section>
      <Footer />
    </div>
  );
}
