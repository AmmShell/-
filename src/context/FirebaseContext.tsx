import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, signInWithGoogle, logOut, handleFirestoreError, OperationType } from '../firebase';
import { User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

interface ImageAsset {
  dataUrl: string;
  updatedAt: any;
}

interface FirebaseContextType {
  user: User | null;
  isAuthReady: boolean;
  isAdmin: boolean;
  images: Record<string, string>;
  uploadImage: (imageId: string, file: File) => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      
      // Simple admin check based on email for the prototype
      if (currentUser?.email === '12bdDB@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    // List of image IDs we want to track
    const imageIds = [
      'buuLogo',
      'heroCompanyLogo',
      'companyLogo',
      'studentImage',
      'mentor1Image',
      'mentor2Image',
      'supervisorImage',
      'companyLocationImage',
      'relatedPhoto1',
      'relatedPhoto2',
      'relatedPhoto3',
      'projectQrCode'
    ];

    const unsubscribes = imageIds.map(id => {
      const docRef = doc(db, 'images', id);
      return onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as ImageAsset;
          setImages(prev => ({ ...prev, [id]: data.dataUrl }));
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, `images/${id}`);
      });
    });

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [isAuthReady, user]);

  const uploadImage = async (imageId: string, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        // Check size (< 1MB limit for Firestore document)
        // Base64 string size is roughly 4/3 of the original file size
        if (base64String.length > 900000) {
          console.error('Image is too large. Please upload an image smaller than 600KB.');
          reject(new Error('Image too large'));
          return;
        }

        try {
          const docRef = doc(db, 'images', imageId);
          await setDoc(docRef, {
            dataUrl: base64String,
            updatedAt: serverTimestamp()
          });
          resolve();
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `images/${imageId}`);
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  return (
    <FirebaseContext.Provider value={{
      user,
      isAuthReady,
      isAdmin,
      images,
      uploadImage,
      signIn: signInWithGoogle,
      signOut: logOut
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};
