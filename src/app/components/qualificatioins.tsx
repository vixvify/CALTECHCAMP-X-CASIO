'use client';
import Image from 'next/image';

export default function Qualifications() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full items-center justify-center lg:gap-[30px] p-6">
 
      <div className="flex flex-col items-center justify-center mb-10 mr-20 lg:mb-0 gap-6">
        <h1 className="text-4xl font-bold text-white">คุณสมบัติผู้สมัคร</h1>
        <Image
          src="/qua.png"
          width={250}
          height={250}
          alt="qualification"
          className="drop-shadow-lg"
        />
      </div>

      <div className="flex flex-col items-start gap-4 lg:h-[300px] justify-around rounded-2xl border-2 border-white p-8 shadow-xl bg-black/20 backdrop-blur">
        <h1 className="text-white lg:max-w-[600px] lg:text-lg">
          ⚪ นักเรียนที่กำลังศึกษาอยู่ในระดับมัธยมศึกษาตอนปลาย
        </h1>
        <h1 className="text-white lg:max-w-[500px] lg:text-lg">
          ⚪ มีจำนวนสมาชิกในทีมทั้งหมด 3 คน และมาจากโรงเรียนเดียวกัน
          (สามารถสมัครได้มากกว่าหนึ่งทีมต่อหนึ่งโรงเรียน)
        </h1>
        <h1 className="text-white lg:max-w-[600px] lg:text-lg">
          ⚪ ต้องมีคุณครูที่ปรึกษาประจำทีม 1 ท่าน
        </h1>
      </div>
    </div>
  );
}
