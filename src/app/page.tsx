import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center">
      <div className="flex items-start justify-center lg:gap-30">
        <div className="flex flex-col items-start justify-center gap-5 lg:pt-20">
          <div className="flex items-center justify-center lg:gap-3">
            <h1 className="font-bold text-white lg:text-4xl">
              CALCTECH CAMP X
            </h1>
            <h1 className="rounded-2xl bg-white pt-1 pr-3 pb-1 pl-3 font-bold text-[#101557] lg:text-4xl">
              CASIO
            </h1>
            <h1 className="font-bold text-white lg:text-4xl">คืออะไร ?</h1>
          </div>
          <p className="max-w-[200px] text-left text-white lg:max-w-[500px] lg:text-2xl">
            คือค่ายการแข่งขันนวัตกรรมตามหลัก SDGs
            ที่ผู้เข้าแข่งขันจะต้องนำความรู้เกี่ยวกับเครื่องคิดเลขมาประยุกต์ใช้กับนวัตกรรม
          </p>
        </div>
        <div>
          <Image
            src={'/เครื่องคิดเลข.png'}
            width={300}
            height={300}
            alt="คุณสมบัติ"
            className="h-[250px] w-[150px] rounded-2xl lg:h-[500px] lg:w-[300px]"
          ></Image>
        </div>
      </div>
    </div>
  );
}
