'use client';
import Image from 'next/image';

export default function Qualifications() {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center lg:gap-30">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl text-white">คุณสมบัติผู้สมัคร</h1>
        <Image
          src={'/qua.png'}
          width={250}
          height={250}
          alt="qualification"
        ></Image>
      </div>
      <div className="flex flex-col items-start justify-around gap-1 lg:h-[300px]">
        <div>
          <h1 className="text-white lg:max-w-[600px] lg:text-xl">
            ⚪ นักเรียนที่กำลังศึกษาอยู่ในระดับมัธยมศึกษาตอนปลาย
          </h1>
          <h1 className="text-white lg:max-w-[550px] lg:text-xl">
            ⚪ มีจำนวนสมาชิกในทีมทั้งหมด 3 คน และมาจากโรงเรียนเดียวกัน
            (สามารถสมัครได้มากกว่าหนึ่งทีมต่อหนึ่งโรงเรียน)
          </h1>
          <h1 className="text-white lg:max-w-[600px] lg:text-xl">
            ⚪ ต้องมีคุณครูที่ปรึกษาประจำทีม 1 ท่าน
          </h1>
        </div>
      </div>
    </div>
  );
}
