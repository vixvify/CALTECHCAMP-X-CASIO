'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-10 gap-10 
                    md:pt-16 md:gap-16 
                    lg:flex-row lg:items-start lg:pt-20 lg:gap-24">
      <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left">
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
          <h1 className="font-bold text-white text-xl md:text-3xl lg:text-4xl">CALCTECH CAMP X</h1>
          <h1 className="rounded-2xl bg-white px-3 py-1 font-bold text-[#101557] text-xl md:text-3xl lg:text-4xl">
            CASIO
          </h1>
          <h1 className="font-bold text-white text-xl md:text-3xl lg:text-4xl">คืออะไร ?</h1>
        </div>
        <p className="max-w-[250px] text-sm text-white 
                      md:max-w-[500px] md:text-lg 
                      lg:max-w-[600px] lg:text-2xl">
          Calctech Camp x Casio ค่ายแข่งขันนวัตกรรมตามหลัก SDGs ที่พาน้องๆ 
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            เรียนรู้คณิตศาสตร์กับเครื่องคิดเลขวิทยาศาสตร์
          </span> 
          พร้อมกิจกรรมและเวิร์กชอปสุดเข้มข้นตลอด 3 วัน 2 คืน
        </p>
      </div>

      <div>
        <Image
          src={'/เครื่องคิดเลข.png'}
          width={300}
          height={300}
          alt="คุณสมบัติ"
          className="mt-10 h-[200px] w-[120px] rounded-2xl
                     md:h-[300px] md:w-[180px] md:mt-16
                     lg:h-[500px] lg:w-[300px] lg:mt-20"
        />
      </div>
    </div>
  );
}
