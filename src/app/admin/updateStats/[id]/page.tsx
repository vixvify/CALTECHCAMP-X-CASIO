'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function page() {
  const [newstats, setStats] = useState('อยู่ระหว่างการคัดเลือก');
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const getStats = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/data/getStats/${id}`,
      );
      setStats(res.data.stats);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStats = async () => {
    Swal.fire('กำลังแก้ไขสถานะ');
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/data/updateStats/${id}`,
        { stats: newstats },
      );
      Swal.fire({
        title: 'แก้ไขสำเร็จ',
        icon: 'success',
        draggable: true,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขสถานะไม่สำเร็จ',
      });
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <h1 className="text-5xl text-white">กำลังโหลดข้อมูล...</h1>;
      </div>
    );
  } else {
    return (
      <div className="flex h-[100vh] flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-5xl text-white">อัพเดตสถานะผู้สมัคร</h1>
          <select
            value={newstats}
            className="flex items-center justify-center bg-white p-3 text-2xl"
            onChange={(e) => setStats(e.target.value)}
          >
            <option>อยู่ระหว่างการคัดเลือก</option>
            <option>ผ่านการคัดเลือก</option>
            <option>ไม่ผ่านการคัดเลือก</option>
            <option>เป็นตัวสำรอง</option>
            <option>ผ่านการคัดเลือก (สำรอง)</option>
            <option>ไม่ผ่านการคัดเลือก (สำรอง)</option>
            <option>ยืนยันสิทธิ์</option>
            <option>สละสิทธิ์</option>
          </select>
          <button
            className="cursor-pointer rounded-2xl bg-green-700 p-3 text-xl text-white"
            onClick={updateStats}
          >
            แก้ไขสถานะผู้สมัคร
          </button>
        </div>
      </div>
    );
  }
}
