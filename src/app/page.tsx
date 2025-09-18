import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <div className="flex justify-center items-start lg:gap-30">
        <div className="flex flex-col justify-center items-start gap-5 lg:pt-20">
          <div className="flex justify-center items-center lg:gap-3">
            <h1 className="lg:text-4xl font-bold text-white">
              CALCTECH CAMP X
            </h1>
            <h1 className="lg:text-4xl font-bold text-[#101557] bg-white pl-3 pr-3 pt-1 pb-1 rounded-2xl">
              CASIO
            </h1>
            <h1 className="lg:text-4xl font-bold text-white">คืออะไร ?</h1>
          </div>
          <p className="text-white lg:text-2xl lg:max-w-[500px] max-w-[200px] text-left ">
            คือค่ายการแข่งขันนวัตกรรมตามหลัก SDGs
            ที่ผู้เข้าแข่งขันจะต้องนำความรู้เกี่ยวกับเครื่องคิดเลขมาประยุกต์ใช้กับนวัตกรรม
          </p>
        </div>
        <div>
          <Image
            src={"/เครื่องคิดเลข.png"}
            width={300}
            height={300}
            alt="คุณสมบัติ"
            className="rounded-2xl lg:w-[300px] lg:h-[500px] w-[150px] h-[250px]"
          ></Image>
        </div>
      </div>
    </div>
  );
}
