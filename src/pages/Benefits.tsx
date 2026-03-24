import { CheckCircle2, Lightbulb, Users, Wrench, Target } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      title: 'ทักษะด้านฮาร์ดแวร์และซอฟต์แวร์',
      icon: Wrench,
      description: 'ได้เรียนรู้และลงมือปฏิบัติจริงในการประกอบ ซ่อมแซม และบำรุงรักษาเครื่องคอมพิวเตอร์ รวมถึงการติดตั้งระบบปฏิบัติการและโปรแกรมต่างๆ ที่จำเป็นต่อการทำงานในองค์กร'
    },
    {
      title: 'การแก้ปัญหาเฉพาะหน้า (Problem Solving)',
      icon: Lightbulb,
      description: 'พัฒนาทักษะการวิเคราะห์หาสาเหตุของปัญหา (Troubleshooting) เมื่อผู้ใช้งานพบข้อขัดข้องทางไอที และสามารถแก้ไขปัญหาได้อย่างเป็นระบบและรวดเร็ว'
    },
    {
      title: 'การสื่อสารและการทำงานร่วมกับผู้อื่น',
      icon: Users,
      description: 'ได้ฝึกทักษะการสื่อสารกับพนักงานในแผนกต่างๆ เพื่อรับฟังปัญหาและอธิบายวิธีการแก้ไขด้วยภาษาที่เข้าใจง่าย รวมถึงการทำงานเป็นทีมร่วมกับพี่เลี้ยงและเพื่อนร่วมงาน'
    },
    {
      title: 'ความเข้าใจในระบบงานขององค์กร',
      icon: Target,
      description: 'เข้าใจบทบาทและความสำคัญของแผนก IT ในการสนับสนุนให้ธุรกิจของบริษัทสามารถดำเนินไปได้อย่างราบรื่น และได้เรียนรู้ระเบียบวินัยในการทำงานในสภาพแวดล้อมจริง'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ประโยชน์ที่ได้รับ</h1>
          <p className="text-lg text-gray-600">
            ประสบการณ์และทักษะที่ได้รับการพัฒนาจากการปฏิบัติงานจริง ณ บริษัท เอ็นเตอร์ไพรส์ เน็ตเวอร์ค เทคโนโลยี่ จํากัด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex gap-4 p-6 rounded-xl bg-gray-50 border border-gray-100 hover:bg-blue-50/50 transition-colors duration-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Box */}
        <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center max-w-4xl mx-auto shadow-lg">
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-blue-200" />
          <h3 className="text-2xl font-bold mb-4">สรุปผลการฝึกประสบการณ์</h3>
          <p className="text-blue-100 text-lg leading-relaxed">
            การฝึกงานในครั้งนี้ทำให้นิสิตสามารถนำความรู้ทางทฤษฎีที่ได้ศึกษามาประยุกต์ใช้กับการทำงานจริง 
            พร้อมทั้งได้รับประสบการณ์อันมีค่าที่ช่วยเตรียมความพร้อมสำหรับการประกอบอาชีพในสายงานเทคโนโลยีสารสนเทศในอนาคต
          </p>
        </div>
      </div>
    </div>
  );
}
