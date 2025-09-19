'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center pt-10 lg:flex-row lg:gap-30 lg:pt-20">
      <div className="flex flex-col items-start justify-center gap-5">
        <div className="mt-60 flex items-center justify-center lg:gap-3">
          <h1 className="font-bold text-white lg:text-4xl">CALCTECH CAMP X</h1>
          <h1 className="rounded-2xl bg-white pt-1 pr-3 pb-1 pl-3 font-bold text-[#101557] lg:text-4xl">
            CASIO
          </h1>
          <h1 className="font-bold text-white lg:text-4xl">คืออะไร ?</h1>
        </div>
        <p className="max-w-[200px] text-left text-white lg:max-w-[500px] lg:text-2xl">
          calctech camp x casioคือค่ายการแข่งขัน
          ประกวดนวัตกรรมตามหลัก “ SDGs ”ที่จะพาน้องๆมารู้จัก
          และได้เรียนรู้ไปกับโลกของคณิตศาสตร์พร้อมกับ
          เครื่องคิดเลขวิทยาศาสตร์และนำความรู้ที่ได้มาประยุกต์
          กับนวัตรกรรมพร้อมทั้งกิจกรรม และ workshop ที่จัดขึ้นภายในค่ายเป็นเวลา 3 วัน 2 คืน
        </p>
      </div>
      <div>
        <Image
          src={'/เครื่องคิดเลข.png'}
          width={300}
          height={300}
          alt="คุณสมบัติ"
          className="mt-20 h-[250px] w-[150px] rounded-2xl lg:h-[500px] lg:w-[300px]"
        />
      </div>
    </div>
  );
}
