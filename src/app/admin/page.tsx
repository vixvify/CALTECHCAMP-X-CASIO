'use client';

import DoughnutChart from './DoughnutChart';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/data/getCount`,
      );
      setData(res.data);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!(session as any)?.user?.admin) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <h1 className="text-5xl text-white">กำลังโหลดข้อมูล...</h1>;
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-15 pt-40 pb-20">
        <h1 className="text-6xl font-extrabold text-white">Admin Dashboard</h1>
        <div className="flex items-center justify-center gap-5">
          <div className="flex w-[300px] flex-col items-center gap-1 rounded-2xl bg-white p-4">
            <h1 className="text-2xl">จำนวนผู้สมัคร</h1>
            <h1 className="text-4xl font-extrabold">{(data as any).total}</h1>
          </div>
          <div className="flex w-[300px] flex-col items-center gap-1 rounded-2xl bg-white p-4">
            <h1 className="text-2xl">จำนวนผู้รอผลการคัดเลือก</h1>
            <h1 className="text-4xl font-extrabold">{(data as any).wait}</h1>
          </div>
          <div className="flex w-[300px] flex-col items-center gap-1 rounded-2xl bg-white p-4">
            <h1 className="text-2xl">จำนวนผู้ได้รับการคัดเลือก</h1>
            <h1 className="text-4xl font-extrabold">{(data as any).pass}</h1>
          </div>
        </div>
        <Link href={'/admin/manageData'}>
          <h1 className="rounded-2xl bg-purple-700 p-5 text-3xl font-bold text-white">
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
            data={[(data as any).total, (data as any).wait, (data as any).pass]}
          />
        </div>
      </div>
    );
  }
}
