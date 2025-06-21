import { Injectable } from '@angular/core';
import { storage } from '../config/firebase.config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Observable, from } from 'rxjs';

export interface UploadProgress {
  progress: number;
  downloadURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor() { }

  /**
   * Upload file MP3 vào thư mục mp3/
   */
  uploadMusicFile(file: File): Observable<string> {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `mp3/${fileName}`);

    return from(
      uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef))
    );
  }

  /**
   * Upload ảnh vào thư mục images/
   */
  uploadImageFile(file: File): Observable<string> {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `images/${fileName}`);

    return from(
      uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef))
    );
  }

  /**
   * Upload file với progress tracking
   */
  uploadFileWithProgress(file: File, folder: string): Observable<UploadProgress> {
    return new Observable(observer => {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      // Sử dụng uploadBytes thay vì uploadBytesResumable cho đơn giản
      uploadBytes(storageRef, file)
        .then(() => {
          observer.next({ progress: 50 });
          return getDownloadURL(storageRef);
        })
        .then(downloadURL => {
          observer.next({ progress: 100, downloadURL });
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   * Xóa file từ Firebase Storage
   */
  deleteFile(fileUrl: string): Observable<void> {
    // Extract file path from URL
    const url = new URL(fileUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+)\?/);

    if (pathMatch) {
      const filePath = decodeURIComponent(pathMatch[1]);
      const fileRef = ref(storage, filePath);
      return from(deleteObject(fileRef));
    }

    return new Observable(observer => {
      observer.error('Invalid file URL');
    });
  }

  /**
   * Validate file type cho MP3
   */
  validateMusicFile(file: File): boolean {
    const allowedTypes = ['audio/mpeg', 'audio/mp3'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }

  /**
   * Validate file type cho ảnh
   */
  validateImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }

  /**
   * Format file size cho hiển thị
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
