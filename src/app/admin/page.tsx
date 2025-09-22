'use client';

import DoughnutChart from './DoughnutChart';
import Link from 'next/link';

export default function page() {
  const data: number[] = [500, 100, 30];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-15 pt-40 pb-20">
      <h1 className="text-6xl font-extrabold text-white">Admin Dashboard</h1>
      <div className="flex items-center justify-center gap-5">
        <div className="flex w-[300px] flex-col items-center gap-1 rounded-2xl bg-white p-4">
          <h1 className="text-2xl">จำนวนผู้สมัคร</h1>
          <h1 className="text-4xl font-extrabold">500</h1>
        </div>
        <div className="flex w-[300px] flex-col items-center gap-1 rounded-2xl bg-white p-4">
          <h1 className="text-2xl">จำนวนผู้รอผลการคัดเลือก</h1>
          <h1 className="text-4xl font-extrabold">100</h1>
        </div>
        <div className="flex w-[300px] flex-col items-center gap-1 rounded-2xl bg-white p-4">
          <h1 className="text-2xl">จำนวนผู้ได้รับการคัดเลือก</h1>
          <h1 className="text-4xl font-extrabold">30</h1>
        </div>
      </div>
      <Link href={'/admin/manageData'}>
        <h1 className="rounded-2xl bg-red-600 p-5 text-3xl font-bold text-white">
          จัดการข้อมูลผู้สมัคร
        </h1>
      </Link>
      <div className="h-[400px] w-[400px]">
        <DoughnutChart
          labels={[
            'ผู้สมัครทั้งหมด',
            'จำนวนผู้รอผลการคัดเลือก',
            'จำนวนผู้ได้รับการคัดเลือก',
          ]}
          data={data}
        />
      </div>
    </div>
  );
}
