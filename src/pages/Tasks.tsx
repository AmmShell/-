import { Monitor, Cpu, Wrench, Network, HardDrive, ShieldCheck } from 'lucide-react';

export default function Tasks() {
  const tasks = [
    {
      title: 'การจัดการฮาร์ดแวร์ภายนอก (External Hardware)',
      icon: Monitor,
      description: 'ดูแลและบำรุงรักษาอุปกรณ์คอมพิวเตอร์ภายนอก เช่น การทำความสะอาดตัวเครื่อง จอภาพ แป้นพิมพ์ เมาส์ รวมถึงการตรวจสอบและจัดสายเคเบิลต่างๆ ให้เป็นระเบียบและพร้อมใช้งาน',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'การจัดการฮาร์ดแวร์ภายใน (Internal Hardware)',
      icon: Cpu,
      description: 'ตรวจสอบและแก้ไขปัญหาอุปกรณ์ภายในเครื่องคอมพิวเตอร์เบื้องต้น เช่น การเพิ่มหรือเปลี่ยน RAM, การเปลี่ยนฮาร์ดดิสก์ (HDD/SSD), การทำความสะอาดพัดลมระบายความร้อน และการตรวจสอบการเชื่อมต่อของสายแพรต่างๆ',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'การติดตั้งและตั้งค่าซอฟต์แวร์ (Software Installation)',
      icon: HardDrive,
      description: 'ดำเนินการติดตั้งระบบปฏิบัติการ (Windows) การติดตั้งโปรแกรมพื้นฐานสำหรับการทำงานในสำนักงาน (เช่น Microsoft Office) การติดตั้งไดรเวอร์อุปกรณ์ต่างๆ และการอัปเดตซอฟต์แวร์ให้เป็นเวอร์ชันล่าสุด',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'การแก้ไขปัญหาเบื้องต้น (Basic Troubleshooting)',
      icon: Wrench,
      description: 'รับแจ้งและแก้ไขปัญหาการใช้งานคอมพิวเตอร์เบื้องต้นจากผู้ใช้งาน เช่น ปัญหาเครื่องเปิดไม่ติด โปรแกรมค้าง ปริ้นเตอร์ไม่พิมพ์งาน หรือปัญหาการเชื่อมต่ออุปกรณ์ต่อพ่วงต่างๆ',
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      title: 'การจัดการระบบเครือข่ายเบื้องต้น (Basic Networking)',
      icon: Network,
      description: 'ตรวจสอบและแก้ไขปัญหาการเชื่อมต่อเครือข่าย (LAN/Wi-Fi) ของเครื่องลูกข่าย การเข้าหัวสายแลน (RJ-45) และการตั้งค่า IP Address เบื้องต้นสำหรับเครื่องคอมพิวเตอร์ในสำนักงาน',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200'
    },
    {
      title: 'การบำรุงรักษาเชิงป้องกัน (Preventive Maintenance)',
      icon: ShieldCheck,
      description: 'ดำเนินการตรวจสอบสภาพเครื่องคอมพิวเตอร์ตามรอบเวลา สแกนไวรัส ลบไฟล์ขยะ (Temp files) และจัดเรียงข้อมูล (Defragment) เพื่อให้เครื่องคอมพิวเตอร์ทำงานได้อย่างมีประสิทธิภาพ',
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">หน้าที่/ภาระงานของนิสิต</h1>
          <p className="text-lg text-gray-600">
            รายละเอียดการปฏิบัติงานในแผนก IT ซึ่งเน้นการดูแลรักษาระบบคอมพิวเตอร์พื้นฐาน 
            ตั้งแต่ฮาร์ดแวร์ภายนอกไปจนถึงซอฟต์แวร์ภายในเครื่อง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${task.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{task.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {task.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
