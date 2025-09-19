'use client';
import Image from 'next/image';

export default function Qualifications() {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center lg:gap-30">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl text-white">คุณสมบัติผู้สมัคร</h1>
        <Image
          src={'/qua.png'}
          width={300}
          height={300}
          alt="qualification"
        ></Image>
      </div>
      <div className="flex flex-col items-start justify-around gap-5 lg:h-[350px]">
        <h1 className="text-white lg:max-w-[600px] lg:text-2xl">
          ⚪ นักเรียนที่กำลังศึกษาอยู่ในระดับมัธยมศึกษาตอนปลาย
        </h1>
        <h1 className="text-white lg:max-w-[600px] lg:text-2xl">
          ⚪ มีจำนวนสมาชิกในทีมทั้งหมด 3 คน และมาจากโรงเรียนเดียวกัน
          (สามารถสมัครได้มากกว่าหนึ่งทีมต่อหนึ่งโรงเรียน)
        </h1>
        <h1 className="text-white lg:max-w-[600px] lg:text-2xl">
          ⚪ ต้องมีคุณครูที่ปรึกษาประจำทีม 1 ท่าน
        </h1>
      </div>
    </div>
  );
}
