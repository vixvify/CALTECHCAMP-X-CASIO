'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function page() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const getSingle = async () => {
    try {
      const res = await axios.get(`/api/data/singleData/${id}`);
      setData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
      });
    }
  };

  useEffect(() => {
    getSingle();
  }, []);

  useEffect(() => {
    if (!(session as any)?.user?.admin) {
      router.push('/');
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <h1 className="text-3xl text-white lg:text-5xl">กำลังโหลดข้อมูล...</h1>;
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-30 mb-5 text-2xl font-bold text-white lg:text-4xl">
          ข้อมูลผู้สมัคร ทีม {(data as any).team}
        </h1>
        <div className="bg-opacity-0 mt-5 mr-4 mb-10 ml-4 flex flex-col gap-5 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-5 backdrop-blur-lg backdrop-filter lg:mr-0 lg:ml-0 lg:flex-row lg:p-10 lg:pr-20 lg:pl-20">
          <ul className="flex flex-col gap-3">
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                ชื่อนวัตกรรม
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).team}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                โรงเรียน
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).school}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">อีเมล</h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).email}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">เบอร์</h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).call1}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                เบอร์ฉุกเฉิน
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).call2}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">สถานะ</h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).relation}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                ชื่อผู้สมัคร คนที่ 1
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).name1}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                ชื่อผู้สมัคร คนที่ 2
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).name2}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                ชื่อผู้สมัคร คนที่ 3
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).name3}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                ชื่ออาจารย์ที่ปรึกษา
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).name4}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                เอกสาร ปพ.1 / ปพ.7 / บัตรนักเรียน
              </h1>
              <a
                href={`${(data as any).url}`}
                target="blank"
                className="lg:text-md text-sm text-cyan-300"
              >
                กดเพื่อดูไฟล์
              </a>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                ลิงค์ Youtube
              </h1>
              <a
                href={`${(data as any).clip}`}
                target="blank"
                className="lg:text-md text-sm text-cyan-300"
              >
                กดเพื่อดูคลิป
              </a>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                สถานะการสมัคร
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).stats}
              </p>
            </li>
          </ul>
          <ul className="flex max-w-100 flex-col gap-3">
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                รายละเอียดนวัตกรรม
              </h1>
              <a
                href={`${(data as any).qi1}`}
                target="blank"
                className="lg:text-md text-sm text-cyan-300"
              >
                กดเพื่อดูไฟล์
              </a>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                หากนวัตกรรมของน้องสามารถทําให้เกิดขึ้นจริงได้
                น้องจะทําต่อให้เสร็จหรือเลิกทําแล้วทิ้งไอเดียตรงนั้นไปเลย
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).qm1}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                สมมติว่ามีทีมคู่แข่งเข้ามาขอคำแนะนำในสื่งที่คุณถนัดคุณ
                คิดว่าคุณควรให้คำแนะนำเขาอย่างไร
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).qm2}
              </p>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                คำถามวิชาการ
              </h1>
              <a
                href={`${(data as any).qa1}`}
                target="blank"
                className="lg:text-md text-sm text-cyan-300"
              >
                กดเพื่อดูไฟล์
              </a>
            </li>
            <li>
              <h1 className="text-sm font-bold text-white lg:text-xl">
                คำถามวัดการวางแผน
              </h1>
              <p className="lg:text-md text-sm text-white">
                {(data as any).qp1}
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
