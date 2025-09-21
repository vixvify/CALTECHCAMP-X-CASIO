'use client';

import { motion } from 'framer-motion';

const timelineData = [
  {
    title: 'กำลังตรวจสอบใบสมัคร'
  },
  {
    title: 'ประกาศผลผู้ผ่านการคัดเลือก'
  },
  {
    title: 'ประกาศผลผู้ผ่านการคัดเลือก(สำรอง)'
  },
  {
    title: 'ยืนยันสิทธิ์เข้าค่าย'
  },
];

export default function Timeline() {
  return (
    <div className="relative flex flex-col justify-center items-start left-100 h-[100vh] pt-25 ">
        <h1 className='text-white mb-20 text-4xl'>ติดตามสถานะการสมัคร</h1>
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
            
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500">
                <span className="h-4 w-4 rounded-full bg-white"></span>
              </div>
            </div>

            <div className="text-white">
              <h2 className="text-xl font-bold">{item.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
