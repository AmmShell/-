import { FolderKanban, Clock } from 'lucide-react';

export default function Projects() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FolderKanban className="w-10 h-10 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ผลงานระหว่างฝึกปฏิบัติงาน</h1>
        <p className="text-gray-500 mb-8">
          หน้านี้เตรียมไว้สำหรับแสดงผลงานที่นิสิตได้ดำเนินการตลอดระยะเวลาของการฝึกงาน
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
          <Clock className="w-4 h-4" />
          รอการเพิ่มข้อมูลในภายหลัง
        </div>
      </div>
    </div>
  );
}
