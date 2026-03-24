import { MapPin, Info, Briefcase, FileText } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

export default function Company() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ข้อมูลพื้นฐานหน่วยฝึกงาน</h1>
        <p className="text-lg text-blue-600 font-medium mb-8">บริษัท เอ็นเตอร์ไพรส์ เน็ตเวอร์ค เทคโนโลยี่ จํากัด</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Photos */}
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">รูปสถานที่บริษัท</span>
              </div>
              <div className="w-full h-64">
                <ImageUploader 
                  imageId="companyLocationImage" 
                  defaultImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop"
                  alt="สถานที่บริษัท"
                />
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center gap-2">
                <Info className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">โลโก้บริษัท</span>
              </div>
              <div className="w-full h-64 bg-gray-50 p-4">
                <ImageUploader 
                  imageId="companyLogo" 
                  defaultImage="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=400&fit=crop"
                  alt="โลโก้บริษัท"
                  imageClassName="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                รายละเอียดบริษัท
              </h3>
              
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">เลขทะเบียน</dt>
                  <dd className="text-lg font-mono text-gray-900 bg-white px-3 py-2 rounded-md border border-gray-200 inline-block">
                    0205543005910
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    ประกอบธุรกิจ
                  </dt>
                  <dd className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                    ประกอบกิจการจำหน่ายหมึกคอมพิวเตอร์ วัสดุคอมพิวเตอร์ หมึกพิมพ์เลเซอร์ หมึกพิมพ์อิงค์เจ็ท เครื่องถ่ายเอกสาร หมึกพิมพ์ เครื่องถ่ายเอกสาร อุปกรณ์ประกอบอะไหล่ของสินค้าดังกล่าว รวมถึงการซ่อมแซม และบำรุงรักษาสินค้าดังกล่าวด้วย
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">หมวดธุรกิจ</dt>
                  <dd className="text-gray-900 font-medium bg-white p-3 rounded-lg border border-gray-200">
                    การขายส่งคอมพิวเตอร์อุปกรณ์ต่อพ่วงคอมพิวเตอร์และซอฟต์แวร์
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500 mb-1">ธุรกิจที่ส่งงบการเงินล่าสุด</dt>
                  <dd className="text-gray-900 font-medium bg-white p-3 rounded-lg border border-gray-200">
                    ร้านขายปลีกคอมพิวเตอร์และอุปกรณ์ต่อพ่วงคอมพิวเตอร์
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
