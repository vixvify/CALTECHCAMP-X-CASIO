"use client";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center items-center lg:gap-30 h-[100vh] w-[100vw]">
      <div className=" flex flex-col justify-center items-center gap-10 ">
        <h1 className="text-2xl text-white">คุณสมบัตรผู้สมัคร</h1>
        <Image
          src={"/qua.png"}
          width={300}
          height={300}
          alt="qualification"
        ></Image>
      </div>
      <div className="flex flex-col justify-around items-start gap-5 lg:h-[350px]">
        <h1 className="lg:text-2xl text-white lg:max-w-[600px]">
          นักเรียนที่กำลังศึกษาอยู่ในระดับมัธยมศึกษาตอนปลาย
        </h1>
        <h1 className="lg:text-2xl text-white lg:max-w-[450px]">
          มีจำนวนสมาชิกในทีมทั้งหมด 3 คน และมาจากโรงเรียนเดียวกัน
          (สามารถสมัครได้มากกว่าหนึ่งทีมต่อหนึ่งโรงเรียน)
        </h1>
        <h1 className="lg:text-2xl text-white lg:max-w-[600px]">
          ต้องมีคุณครูที่ปรึกษาประจำทีม 1 ท่าน
        </h1>
      </div>
    </div>
  );
}
