export default function Timeline() {
  return (
    <div className="relative">

      <div className="absolute left-5 top-0 h-full w-1 bg-gray-600"></div>

      <div className="flex flex-col gap-50">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-amber-300"></div>
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">กิจกรรม</h2>
              <p className="text-gray-300">วันที่xxx</p>
            </div>
      </div>
    </div>
  );
}
