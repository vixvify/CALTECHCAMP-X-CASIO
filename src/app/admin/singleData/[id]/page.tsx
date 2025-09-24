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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/data/singleData/${id}`,
      );
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
    if (!(session as any).user.admin) {
      router.push('/');
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <h1 className="text-5xl text-white">กำลังโหลดข้อมูล...</h1>;
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-30 mb-5 text-4xl font-bold text-white">
          ข้อมูลผู้สมัคร ทีม {(data as any).team}
        </h1>
        <div className="bg-opacity-0 mt-5 mb-10 flex gap-5 rounded-2xl border border-gray-100 bg-gray-400/20 bg-clip-padding p-10 pr-20 pl-20 backdrop-blur-lg backdrop-filter">
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
                className="text-cyan-300"
              >
                กดเพื่อดูไฟล์
              </a>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">ลิงค์ Youtube</h1>
              <a
                href={`${(data as any).clip}`}
                target="blank"
                className="text-cyan-300"
              >
                กดเพื่อดูคลิป
              </a>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">สถานะ</h1>
              <p className="text-white">{(data as any).stats}</p>
            </li>
          </ul>
          <ul className="flex max-w-100 flex-col gap-3">
            <li>
              <h1 className="text-xl font-bold text-white">
                อธิบายรายละเอียดนวัตกรรม
              </h1>
              <p className="text-white">{(data as any).qi1}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                นวัตกรรมนี้เกี่ยวกับ SDGs ยังไง
              </h1>
              <p className="text-white">{(data as any).qi2}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                นวัตกรรมนี้เกี่ยวกับเครื่องคิดเลขอย่างไร
              </h1>
              <p className="text-white">{(data as any).qi3}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                วัตถุประสงค์ของนวัตกรรมนี้
              </h1>
              <p className="text-white">{(data as any).qi4}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                หากทีมของน้องได้รับการรับเลือกเข้ามาค่าย
                แต่ทีมของเพื่อนน้องไม่ติด น้องจะแก้ปัญหาอย่างไรเพื่อ
                ไม่ให้เกิดปัญหาขึ้นในอนาคต
              </h1>
              <p className="text-white">{(data as any).qm1}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                หากทีมของน้องได้เข้าร่วมค่าย
                และได้นําไอเดียนวัตกรรมของน้องมาแข่งกับคนอื่น
                แต่น้องกลับไม่ติดอันดับเลย
                ทีมของน้องจะมีวิธีจัดการอารมณ์ตัวเองอย่างไรบ้าง
              </h1>
              <p className="text-white">{(data as any).qm2}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                หากนวัตกรรมของน้องสามารถทําให้เกิดขึ้นจริงได้
                น้องจะทําต่อให้เสร็จหรือเลิกทําแล้วทิ้งไอเดียตรงนั้นไปเลย
              </h1>
              <p className="text-white">{(data as any).qm3}</p>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">คำถามวิชาการ</h1>
              <a
                href={`${(data as any).qa1}`}
                target="blank"
                className="text-cyan-300"
              >
                กดเพื่อดูไฟล์
              </a>
            </li>
            <li>
              <h1 className="text-xl font-bold text-white">
                คำถามวัดการวางแผน
              </h1>
              <p className="text-white">{(data as any).qp1}</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
