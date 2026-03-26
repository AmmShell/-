import { User, Building, Users, Camera } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white text-center flex flex-col items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl p-2 shadow-lg mb-6 flex items-center justify-center overflow-hidden border-4 border-white/20">
            <ImageUploader 
              imageId="heroCompanyLogo" 
              defaultImage="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop"
              alt="Company Logo"
              imageClassName="object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">รายงานผลการฝึกประสบการณ์วิชาชีพ</h1>
          <p className="text-xl text-blue-100 flex items-center justify-center gap-2">
            <Building className="w-6 h-6" />
            บริษัท เอ็นเตอร์ไพรส์ เน็ตเวอร์ค เทคโนโลยี่ จํากัด
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* University Supervisor Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">อาจารย์นิเทศ</h2>
          </div>
          
          <div className="flex flex-col items-center text-center max-w-sm mx-auto">
            <div className="w-40 h-40 rounded-xl overflow-hidden bg-gray-100 border-4 border-amber-100 shadow-md mb-4 flex-shrink-0">
              <ImageUploader 
                imageId="supervisorImage" 
                defaultImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
                alt="ผู้ช่วยศาสตราจารย์ ดร.ปริญญา เรืองทิพย์"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-gray-900">ผู้ช่วยศาสตราจารย์ ดร.ปริญญา เรืองทิพย์</p>
              <p className="text-amber-600 font-medium">อาจารย์นิเทศ</p>
              <p className="text-sm text-gray-500 mt-2">
                คณะศึกษาศาสตร์ สาขาวิชาเทคโนโลยีดิจิทัลเพื่อการฝึกอบรมทรัพยากรมนุษย์ในองค์กร มหาวิทยาลัยบูรพา
              </p>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">ข้อมูลนิสิตฝึกงาน</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <ImageUploader 
                imageId="studentImage" 
                defaultImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=500&fit=crop"
                alt="นายนันธภัทร กุมพันธ์"
              />
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-sm text-gray-500 font-medium">ชื่อ-นามสกุล</p>
                <p className="text-lg font-semibold text-gray-900">นายนันธภัทร กุมพันธ์</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">รหัสนิสิต</p>
                <p className="text-gray-900">67540039</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">คณะ</p>
                <p className="text-gray-900">ศึกษาศาสตร์</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">หลักสูตร</p>
                <p className="text-gray-900 text-sm leading-relaxed">
                  2504024: ทล.บ. (เทคโนโลยีดิจิทัลเพื่อการฝึกอบรมทรัพยากรมนุษย์ในองค์กร) ใหม่ 65-ป.ตรี 2 ปี (ต่อเนื่อง) พิเศษ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">พี่เลี้ยงฝึกงาน</h2>
          </div>

          <div className="space-y-6">
            {/* Mentor 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-white shadow-sm flex-shrink-0">
                <ImageUploader 
                  imageId="mentor1Image" 
                  defaultImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                  alt="คุณจิรภาส พิทักษานนท์กุล"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">คุณจิรภาส พิทักษานนท์กุล (พี่ต๊ะ)</p>
                <p className="text-sm text-indigo-600 font-medium mt-1">เจ้าหน้าที่แผนก IT</p>
              </div>
            </div>

            {/* Mentor 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-white shadow-sm flex-shrink-0">
                <ImageUploader 
                  imageId="mentor2Image" 
                  defaultImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
                  alt="คุณวายุภัทร์ ยินมะเริง"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">คุณวายุภัทร์ ยินมะเริง (พี่ต้นกล้า)</p>
                <p className="text-sm text-indigo-600 font-medium mt-1">HR Supervisor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Photos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <Camera className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">ภาพถ่ายที่เกี่ยวข้อง</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg w-full h-48 overflow-hidden border border-gray-200">
            <ImageUploader imageId="relatedPhoto1" defaultImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop" alt="ภาพบรรยากาศ 1" />
          </div>
          <div className="rounded-lg w-full h-48 overflow-hidden border border-gray-200">
            <ImageUploader imageId="relatedPhoto2" defaultImage="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=300&fit=crop" alt="ภาพบรรยากาศ 2" />
          </div>
          <div className="rounded-lg w-full h-48 overflow-hidden border border-gray-200">
            <ImageUploader imageId="relatedPhoto3" defaultImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop" alt="ภาพบรรยากาศ 3" />
          </div>
        </div>
      </div>
    </div>
  );
}
