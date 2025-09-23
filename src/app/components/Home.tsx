'use client';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center
                    lg:flex-row lg:items-start lg:pt-30 lg:gap-24">
      <div className="flex flex-col justify-center items-center md:items-start gap-5 text-center md:text-left">
        <div className="justify-center items-center mt-20 flex flex-col md:flex-row gap-2 md:gap-3">
          <h1 className="font-bold text-white text-4xl mt-5 md:text-4xl lg:text-4xl">CALCTECH CAMP</h1>
          <h1 className="font-bold text-white text-4xl m-2 md:text-4xl lg:text-4xl">X</h1>
          <h1 className="rounded-2xl bg-white px-3 py-1 font-bold text-[#101557] text-4xl md:text-4xl lg:text-4xl">
            CASIO
          </h1>
          <h1 className="font-bold mt-5 text-white text-4xl md:text-4xl lg:text-4xl">คืออะไร ?</h1>
        </div>
        <p className="max-w-[250px] text-lg text-white 
                      md:max-w-[500px] md:text-xl 
                      lg:max-w-[600px] lg:text-2xl">
          Calctech Camp x Casio ค่ายแข่งขันนวัตกรรมตามหลัก SDGs ที่พาน้องๆ 
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
             เรียนรู้คณิตศาสตร์กับเครื่องคิดเลขวิทยาศาสตร์
          </span> 
          พร้อมกิจกรรมและเวิร์กชอปสุดเข้มข้นตลอด 3 วัน 2 คืน
        </p>
      </div>
    </div>
  );
}
