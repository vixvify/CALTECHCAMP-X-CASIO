import { motion } from 'framer-motion';

const timelineData = [
  {
    title: 'เปิดรับสมัคร',
    info: 'ผู้สมัครสามารถกรอกข้อมูลและส่งใบสมัครได้ผ่านทางเว็บไซต์',
    date: '4-30 ตุลาคม 2568',
  },
  {
    title: 'ประกาศผลและยืนยันสิทธิ์',
    info: 'ผู้สมัครที่ผ่านการคัดเลือกจะได้รับการแจ้งผลและต้องยืนยันสิทธิ์ในระยะเวลาที่กำหนด',
    date: '3-5 พฤษจิกายน 2568',
  },
  {
    title: 'Pre-camp',
    info: 'กิจกรรมเตรียมความพร้อมก่อนเข้าค่าย',
    date: '16 พฤศจิกายน 2568',
  },
  {
    title: 'Camp-day',
    info: 'กิจกรรมหลักของค่ายที่จัดขึ้นในระหว่างวันที่กำหนด',
    date: '21-23 พฤศจิกายน 2568',
  },
];

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-xl px-4 py-10 md:max-w-2xl lg:max-w-4xl">
      <div className="absolute top-0 left-8 h-full w-1 bg-gray-600 md:left-8"></div>

      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 md:gap-6"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 md:h-10 md:w-10">
                <span className="h-3 w-3 rounded-full bg-white md:h-4 md:w-4"></span>
              </div>
            </div>

            <div className="max-w-[250px] text-white sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
              <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
                {item.title}
              </h2>
              <p className="text-sm text-gray-300 md:text-base lg:text-lg">
                {item.info}
              </p>
              <p className="mt-1 text-xs text-gray-400 md:text-sm lg:text-base">
                {item.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
