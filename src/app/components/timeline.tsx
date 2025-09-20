import { motion } from "framer-motion";

const timelineData = [
  {
    title: "เปิดรับสมัคร",
    date: "8-15 ตุลาคม 2568",
  },
  {
    title: "ประกาศผลและยืนยันสิทธิ์",
    date: "20-23 ตุลาคม 2568",
  },
  {
    title: "Pre-camp",
    date: "17 พฤศจิกายน 2568",
  },
  {
    title: "วันค่าย",
    date: "8-15 พฤศจิกายน 2568",
  },
];

export default function Timeline() {
  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="absolute left-5 top-0 h-full w-1 bg-gray-600"></div>

      <div className="flex flex-col gap-[100px]">
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
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500">
                <span className="w-4 h-4 bg-white rounded-full"></span>
              </div>
            </div>

            <div className="text-white">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-gray-300">{item.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
