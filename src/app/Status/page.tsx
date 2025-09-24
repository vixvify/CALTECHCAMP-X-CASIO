'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const timelineData = [
  {
    title: 'กำลังตรวจสอบใบสมัคร',
  },
  {
    title: 'ประกาศผลผู้ผ่านการคัดเลือก',
  },
  {
    title: 'ประกาศผลผู้ผ่านการคัดเลือก(สำรอง)',
  },
  {
    title: 'ยืนยันสิทธิ์เข้าค่าย',
  },
];

export default function Timeline() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState('in_progress');
  const [statsIndex, setStatsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStats = async () => {
    if ((session as any)?.user?.id) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/data/getStats/${(session as any)?.user?.id}`,
        );
        setStats(res.data.stats);
        setIsLoading(false);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
        });
      }
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    if (stats == 'อยู่ระหว่างการคัดเลือก') {
      setStatsIndex(0);
    } else if (
      stats == 'ผ่านการคัดเลือก' ||
      stats == 'เป็นตัวสำรอง' ||
      stats == 'ไม่ผ่านการคัดเลือก'
    ) {
      setStatsIndex(1);
    } else if (
      stats == 'ผ่านการคัดเลือก (สำรอง)' ||
      stats == 'ไม่ผ่านการคัดเลือก (สำรอง)'
    ) {
      setStatsIndex(2);
    } else {
      setStatsIndex(3);
    }
  }, [stats]);

  useEffect(() => {
    if (!session) {
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
      <div className="relative left-100 flex h-[100vh] flex-col items-start justify-center pt-25">
        <h1 className="mb-20 text-4xl text-white">ติดตามสถานะการสมัคร</h1>
        <div className="flex flex-col gap-[60px]">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-5"
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div
                className={`flex items-center justify-center gap-5 rounded-2xl p-3 ${index == statsIndex ? 'border-2 border-white' : 'border-0'}`}
              >
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500">
                    <span
                      className={`h-4 w-4 rounded-full bg-white ${index == statsIndex ? 'opacity-100' : 'opacity-20'}`}
                    ></span>
                  </div>
                </div>

                <div className="text-white">
                  <h2
                    className={`text-xl font-bold ${index == statsIndex ? 'opacity-100' : 'opacity-20'}`}
                  >
                    {item.title}
                  </h2>
                  {statsIndex == index && stats == 'ผ่านการคัดเลือก' && (
                    <p>ผ่านการคัดเลือก ✅</p>
                  )}
                  {statsIndex == index && stats == 'เป็นตัวสำรอง' && (
                    <p>เป็นตัวสำรอง</p>
                  )}
                  {statsIndex == index && stats == 'ไม่ผ่านการคัดเลือก' && (
                    <p>ไม่ผ่านการคัดเลือก ❌</p>
                  )}
                  {statsIndex == index &&
                    stats == 'ผ่านการคัดเลือก (สำรอง)' && (
                      <p>ผ่านการคัดเลือก (สำรอง) ✅</p>
                    )}
                  {statsIndex == index &&
                    stats == 'ไม่ผ่านการคัดเลือก (สำรอง)' && (
                      <p>ไม่ผ่านการคัดเลือก (สำรอง) ❌</p>
                    )}
                  {statsIndex == index && stats == 'ยืนยันสิทธิ์' && (
                    <p>ยืนยันสิทธิ์ ✅</p>
                  )}
                  {statsIndex == 3 && stats == 'สละสิทธิ์' && (
                    <p>สละสิทธิ์ ❌</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
}
