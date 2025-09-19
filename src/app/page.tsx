import Image from 'next/image';
import Qualifications from './components/qualificatioins';
import Timeline from './components/timeline';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-[#101557]">
      <div className="flex flex-col items-start justify-center pt-10 lg:flex-row lg:gap-30 lg:pt-20">
        <div className="flex flex-col items-start justify-center gap-5">
          <div className="mt-60 flex items-center justify-center lg:gap-3">
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
            className="mt-20 h-[250px] w-[150px] rounded-2xl lg:h-[500px] lg:w-[300px]"
          />
        </div>
      </div>

      <div>
        <Qualifications />
        <Timeline />
      </div>
    </div>
  );
}
