import { FolderKanban, Link as LinkIcon, Edit2, ExternalLink, Code } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import ImageUploader from '../components/ImageUploader';

export default function Projects() {
  const [projectLink, setProjectLink] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [sourceLink, setSourceLink] = useState<string>('');
  const [isEditingSource, setIsEditingSource] = useState(false);
  const [inputSourceValue, setInputSourceValue] = useState('');
  const [isSavingSource, setIsSavingSource] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'images', 'projectLink');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setProjectLink(snapshot.data().dataUrl || '');
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'images/projectLink');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'images', 'sourceLink');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setSourceLink(snapshot.data().dataUrl || '');
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'images/sourceLink');
    });

    return () => unsubscribe();
  }, []);

  const handleSaveUrl = async () => {
    if (!inputValue.trim()) return;
    
    setIsSaving(true);
    try {
      const docRef = doc(db, 'images', 'projectLink');
      await setDoc(docRef, {
        dataUrl: inputValue.trim(),
        updatedAt: serverTimestamp()
      });
      setIsEditing(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'images/projectLink');
      alert('เกิดข้อผิดพลาดในการบันทึก URL');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center w-full max-w-4xl">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FolderKanban className="w-10 h-10 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ผลงานระหว่างฝึกปฏิบัติงาน</h1>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          สแกน QR Code หรือคลิกลิงก์ด้านล่างเพื่อเข้าชมผลงานที่ได้ดำเนินการตลอดระยะเวลาของการฝึกงาน
        </p>
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-center justify-center">
          {/* QR Code Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-2 overflow-hidden flex items-center justify-center">
              <ImageUploader 
                imageId="projectQrCode" 
                defaultImage="https://images.unsplash.com/photo-1595054225542-f94b81098672?w=400&h=400&fit=crop"
                alt="QR Code ผลงาน"
                imageClassName="object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gray-600">QR Code ผลงาน</p>
          </div>

          {/* Link Section */}
          <div className="flex flex-col items-center md:items-start gap-4 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900">ลิงก์ผลงาน</h3>
            <p className="text-sm text-gray-500 text-center md:text-left">
              ในกรณีที่ไม่สามารถสแกน QR Code ได้ สามารถเข้าชมผลงานผ่านลิงก์นี้
            </p>

            {!projectLink && !isEditing ? (
              <button 
                onClick={() => {
                  setInputValue('');
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm w-full justify-center"
              >
                <LinkIcon className="w-4 h-4" />
                เพิ่มลิงก์ผลงาน
              </button>
            ) : isEditing ? (
              <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200">
                <input
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all mb-3 text-sm"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleSaveUrl}
                    disabled={isSaving || !inputValue.trim()}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <a 
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors break-all"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{projectLink}</span>
                </a>
                <button 
                  onClick={() => {
                    setInputValue(projectLink);
                    setIsEditing(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  แก้ไขลิงก์
                </button>
              </div>
            )}

            {/* Source Code Link Section */}
            <div className="w-full mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">ลิงก์ซอร์สโค้ด / ไฟล์ต้นฉบับ</h3>
              <p className="text-sm text-gray-500 text-center md:text-left mb-4">
                สำหรับผู้ที่สนใจนำผลงานไปพัฒนาต่อยอด
              </p>

              {!sourceLink && !isEditingSource ? (
                <button 
                  onClick={() => {
                    setInputSourceValue('');
                    setIsEditingSource(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm w-full justify-center"
                >
                  <Code className="w-4 h-4" />
                  เพิ่มลิงก์ซอร์สโค้ด
                </button>
              ) : isEditingSource ? (
                <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <input
                    type="url"
                    value={inputSourceValue}
                    onChange={(e) => setInputSourceValue(e.target.value)}
                    placeholder="https://github.com/... หรือ Google Drive"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all mb-3 text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingSource(false)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      ยกเลิก
                    </button>
                    <button
                      onClick={handleSaveSourceUrl}
                      disabled={isSavingSource || !inputSourceValue.trim()}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSavingSource ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 w-full">
                  <a 
                    href={sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors break-all"
                  >
                    <Code className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{sourceLink}</span>
                  </a>
                  <button 
                    onClick={() => {
                      setInputSourceValue(sourceLink);
                      setIsEditingSource(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    แก้ไขลิงก์
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
