'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function page() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getSingle = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/data/singleData/${id}`,
      );
      setData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingle();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <h1 className="text-5xl text-white">กำลังโหลดข้อมูล...</h1>;
      </div>
    );
  } else {
    return (
      <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
        <div className="bg-opacity-0 mt-30 mb-10 flex flex-col gap-5 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-10 pr-20 pl-20 backdrop-blur-lg backdrop-filter">
          <h1 className="text-3xl font-bold text-white">ข้อมูลผู้สมัคร</h1>
          <ul className="flex flex-col gap-3">
            <li>
              <h1 className="text-xl font-bold text-white">ชื่อนวัตกรรม</h1>
              <p className="text-white">{(data as any).team}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">โรงเรียน</h1>
              <p className="text-white">{(data as any).school}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">อีเมล</h1>
              <p className="text-white">{(data as any).email}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">เบอร์</h1>
              <p className="text-white">{(data as any).call}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                ชื่อผู้สมัคร คนที่ 1
              </h1>
              <p className="text-white">{(data as any).name1}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                ชื่อผู้สมัคร คนที่ 2
              </h1>
              <p className="text-white">{(data as any).name2}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                ชื่อผู้สมัคร คนที่ 3
              </h1>
              <p className="text-white">{(data as any).name3}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                ลิงค์ Google Drive
              </h1>
              <a
                href={`${(data as any).url}`}
                target="blank"
                className="text-white"
              >
                กดเพื่อดูไฟล์
              </a>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">ลิงค์ Youtube</h1>
              <a
                href={`${(data as any).clip}`}
                target="blank"
                className="text-white"
              >
                กดเพื่อดูคลิป
              </a>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">สถานะ</h1>
              <p className="text-white">{(data as any).stats}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
