export default function TimelineStatus() {
  return (
    <div className="relative">
      {/* Line connector */}
      <div className="absolute left-[5px] top-4 w-[2px] h-[calc(100%-1.2rem)] bg-gray-200"></div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full z-10"></div>
          <div className="flex justify-between w-full">
            <p className="text-sm text-gray-700">Pesanan Dibuat</p>
            <p className="text-sm text-gray-700">27 Juni 2025 13.00 PM</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full z-10"></div>
          <div className="flex justify-between w-full">
            <p className="text-sm text-gray-700">Menunggu Konfirmasi</p>
            <p className="text-sm text-gray-700">27 Juni 2025 13.00 PM</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full z-10"></div>
          <div className="flex justify-between w-full">
            <p className="text-sm text-gray-700">Disetujui</p>
            <p className="text-sm text-gray-700">27 Juni 2025 13.00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
