import React, { useRef, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { Camera, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  imageId: string;
  defaultImage?: string;
  className?: string;
  imageClassName?: string;
  alt?: string;
}

export default function ImageUploader({ imageId, defaultImage, className = '', imageClassName = 'object-cover', alt = '' }: ImageUploaderProps) {
  const { images, uploadImage } = useFirebase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentImage = images[imageId] || defaultImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to ~600KB to be safe with base64 overhead)
    if (file.size > 600 * 1024) {
      setErrorMsg('ขนาดไฟล์ใหญ่เกินไป กรุณาอัปโหลดรูปภาพที่มีขนาดไม่เกิน 600KB');
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg(null);
      await uploadImage(imageId, file);
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMsg('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`relative group w-full h-full ${className}`}>
      <img 
        src={currentImage} 
        alt={alt} 
        className={`w-full h-full ${imageClassName}`}
        referrerPolicy="no-referrer"
      />
      
      {errorMsg && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg text-center z-10">
          {errorMsg}
        </div>
      )}
      
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          disabled={isUploading}
          className="bg-white/90 text-gray-900 p-2 rounded-full hover:bg-white transition-colors shadow-sm disabled:opacity-50"
          title="เปลี่ยนรูปภาพ"
        >
          {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
        </button>
      </div>
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
