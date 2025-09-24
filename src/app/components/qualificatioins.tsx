'use client';
import Image from 'next/image';
import 'aos/dist/aos.css';

export default function Qualifications() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-6 md:gap-12 lg:flex-row lg:gap-16 lg:p-12">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
        <h1 className="text-4xl font-bold text-white md:text-3xl lg:text-4xl">
          คุณสมบัติผู้สมัคร
        </h1>
        <Image
          src="/qua.png"
          width={200}
          height={200}
          alt="qualification"
          className="drop-shadow-lg md:h-[220px] md:w-[220px] lg:h-[250px] lg:w-[250px]"
        />
      </div>

      <div className="flex w-full max-w-[700px] flex-col items-start gap-3 rounded-2xl border-2 border-white bg-black/20 p-4 shadow-xl backdrop-blur md:gap-4 md:p-6 lg:p-8">
        <h1 className="text-sm text-white md:text-base lg:text-lg">
          ⚪ นักเรียนที่กำลังศึกษาอยู่ในระดับมัธยมศึกษาตอนปลาย
        </h1>
        <h1 className="text-sm text-white md:text-base lg:text-lg">
          ⚪ มีจำนวนสมาชิกในทีมทั้งหมด 3 คน และมาจากโรงเรียนเดียวกัน
          (สามารถสมัครได้มากกว่าหนึ่งทีมต่อหนึ่งโรงเรียน)
        </h1>
        <h1 className="text-sm text-white md:text-base lg:text-lg">
          ⚪ ต้องมีคุณครูที่ปรึกษาประจำทีม 1 ท่าน
        </h1>
      </div>
    </div>
  );
}
