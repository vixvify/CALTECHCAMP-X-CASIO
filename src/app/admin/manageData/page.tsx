'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

export default function page() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  const getData = async () => {
    try {
      const res = await axios.get(`/api/data/getData`);
      setData(res.data.data);
      setIsLoading(false);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
      });
    }
  };

  const confirmRemove = async (id: string) => {
    Swal.fire({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบข้อมูล',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        removeData(id);
      }
    });
  };

  const removeData = async (id: string) => {
    Swal.fire({
      title: 'กำลังดำเนินการ',
      showConfirmButton: false,
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    try {
      await axios.delete(`/api/data/removeData/${id}`);
      Swal.fire({
        title: 'ลบข้อมูลสำเร็จ',
        icon: 'success',
        draggable: true,
      });
      getData();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
      });
    }
  };

  useEffect(() => {
    getData();
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
      <div className="mr-auto ml-auto flex w-[80vw] flex-col items-center justify-center pt-40">
        <div className="">
          <h1 className="text-center text-4xl text-white">ข้อมูลผู้สมัคร</h1>
          <div className="">
            <ul className="mt-10 flex flex-col items-center justify-center">
              <li className="grid w-[90%] grid-cols-3 items-center justify-center gap-x-4 border-b border-gray-500 py-2 pb-5 text-center text-sm font-extrabold text-white lg:w-full lg:text-2xl">
                <h1>ชื่อนวัตกรรม</h1>
                <h1>สถานะ</h1>
                <h1>จัดการ</h1>
              </li>
              {data.map((e: any, index) => {
                return (
                  <li
                    className="grid w-full grid-cols-3 items-center justify-center gap-x-4 border-b border-gray-500 py-2 text-center text-white"
                    key={index}
                  >
                    <h1
                      onClick={() => router.push(`/admin/singleData/${e.id}`)}
                      className="cursor-pointer text-sm lg:text-lg"
                    >
                      {e.idea}
                    </h1>
                    <h1 className="text-sm lg:text-lg">{e.stats}</h1>
                    <div className="flex items-center justify-center gap-1 lg:gap-3">
                      <h1
                        className="cursor-pointer"
                        onClick={() => confirmRemove(e.id)}
                      >
                        🗑️
                      </h1>
                      <h1
                        className="cursor-pointer"
                        onClick={() => router.push(`/admin/editData/${e.id}`)}
                      >
                        ✏️
                      </h1>
                      <h1
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/updateStats/${e.id}`)
                        }
                      >
                        ⚙️
                      </h1>
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
