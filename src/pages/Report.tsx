import { FileText, Download, Link as LinkIcon, Edit2, CheckCircle2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export default function Report() {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'images', 'reportPdf');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setPdfUrl(snapshot.data().dataUrl || '');
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'images/reportPdf');
    });

    return () => unsubscribe();
  }, []);

  const handleSaveUrl = async () => {
    if (!inputValue.trim()) return;
    
    setIsSaving(true);
    try {
      const docRef = doc(db, 'images', 'reportPdf');
      await setDoc(docRef, {
        dataUrl: inputValue.trim(),
        updatedAt: serverTimestamp()
      });
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'images/reportPdf');
      alert('เกิดข้อผิดพลาดในการบันทึก URL');
    } finally {
      setIsSaving(false);
    }
  };

  // Convert Google Drive view link to preview link for iframe
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/(.+?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center animate-in fade-in duration-500">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center w-full max-w-4xl">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-indigo-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">สารนิพนธ์</h1>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          เอกสารรายงานผลการฝึกประสบการณ์วิชาชีพฉบับสมบูรณ์ (PDF)
        </p>

        {!pdfUrl && !isEditing ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="p-4 bg-amber-50 text-amber-700 rounded-xl text-sm border border-amber-200 max-w-md">
              <p className="font-medium mb-1">ยังไม่มีไฟล์สารนิพนธ์</p>
              <p className="text-amber-600/80">เนื่องจากข้อจำกัดด้านขนาดไฟล์ กรุณาอัปโหลดไฟล์ PDF ของคุณขึ้น Google Drive และนำลิงก์มาวางที่นี่</p>
            </div>
            <button 
              onClick={() => {
                setInputValue('');
                setIsEditing(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <LinkIcon className="w-4 h-4" />
              เพิ่มลิงก์ PDF
            </button>
          </div>
        ) : isEditing ? (
          <div className="max-w-xl mx-auto w-full bg-gray-50 p-6 rounded-xl border border-gray-200">
            <label className="block text-left text-sm font-medium text-gray-700 mb-2">
              ลิงก์ไฟล์ PDF (แนะนำลิงก์ Google Drive)
            </label>
            <input
              type="url"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveUrl}
                disabled={isSaving || !inputValue.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <a 
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                ดาวน์โหลด / เปิดไฟล์ต้นฉบับ
              </a>
              <button 
                onClick={() => {
                  setInputValue(pdfUrl);
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                แก้ไขลิงก์
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="w-full aspect-[1/1.4] md:aspect-[16/9] bg-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-inner relative group">
              <iframe 
                src={getEmbedUrl(pdfUrl)} 
                className="w-full h-full border-0"
                title="PDF Viewer"
                allow="autoplay"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
