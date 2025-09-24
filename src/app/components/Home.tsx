'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-24 lg:pt-30">
      <div className="flex flex-col items-center justify-center gap-5 text-center md:items-start md:text-left">
        <div className="mt-30 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-3">
          <h1 className="text-4xl font-bold text-white md:text-4xl lg:text-4xl">
            CALCTECH CAMP
          </h1>
          <h1 className="m-2 text-4xl font-bold text-white md:text-4xl lg:text-4xl">
            X
          </h1>
          <h1 className="rounded-2xl bg-white px-3 py-1 text-4xl font-bold text-[#101557] md:text-4xl lg:text-4xl">
            CASIO
          </h1>
          <h1 className="text-4xl font-bold text-white md:text-4xl lg:text-4xl">
            คืออะไร ?
          </h1>
        </div>
        <p className="max-w-[250px] text-lg text-white md:max-w-[500px] md:text-xl lg:max-w-[600px] lg:text-2xl">
          Calctech Camp x Casio ค่ายแข่งขันนวัตกรรมตามหลัก SDGs ที่พาน้องๆ
          <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text font-bold text-transparent">
            เรียนรู้คณิตศาสตร์กับเครื่องคิดเลขวิทยาศาสตร์
          </span>
          พร้อมกิจกรรมและเวิร์กชอปสุดเข้มข้นตลอด 3 วัน 2 คืน
        </p>
      </div>
      <div className="">
        <Image
          className="shadow-[0px_4px_18px_22px_rgba(0,_0,_0,_0.1)]"
          src={'/poster.png'}
          width={300}
          height={300}
          alt="poster"
        ></Image>
      </div>
    </div>
  );
}
