'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function page() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/data/getData`,
      );
      setData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="flex flex-col items-center justify-center pt-40">
        <div className="">
          <h1 className="text-4xl text-white">ข้อมูลผู้สมัคร</h1>
          <div className="">
            <ul className="mt-20 flex flex-col items-center justify-center">
              <li className="grid w-full grid-cols-4 items-center justify-center gap-x-4 border-b border-gray-500 py-2 pb-5 text-center text-2xl font-extrabold text-white">
                <h1>ชื่อนวัตกรรม</h1>
                <h1>อีเมล</h1>
                <h1>สถานะ</h1>
                <h1>จัดการ</h1>
              </li>
              {data.map((e: any, index) => {
                return (
                  <li
                    className="grid w-full cursor-pointer grid-cols-4 items-center justify-center gap-x-4 border-b border-gray-500 py-2 text-center text-white"
                    key={index}
                    onClick={() => router.push(`/admin/singleData/${e.id}`)}
                  >
                    <h1>{e.idea}</h1>
                    <h1>{e.email}</h1>
                    <h1>{e.stats}</h1>
                    <div className="flex items-center justify-center gap-3">
                      <h1>🗑️</h1>
                      <h1>✏️</h1>
                      <h1>⚙️</h1>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
