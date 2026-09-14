import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const PHOTO_STORAGE = 'photos';
const photos = ref<UserPhoto[]>([]);
let isLoaded = false;

const convertBlobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });

const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
  let base64Data: string | Blob;

  if (isPlatform('hybrid')) {
    const file = await Filesystem.readFile({
      path: photo.path!,
    });
    base64Data = file.data;
  } else {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    base64Data = await convertBlobToBase64(blob);
  }

  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  if (isPlatform('hybrid')) {
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  } else {
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  }
};

export const usePhotoGallery = () => {
  const loadSaved = async () => {
    if (isLoaded) return;
    try {
      const photoList = await Preferences.get({ key: PHOTO_STORAGE });
      const photosInPreferences: UserPhoto[] = photoList.value ? JSON.parse(photoList.value) : [];

      if (!isPlatform('hybrid')) {
        for (const photo of photosInPreferences) {
          try {
            const file = await Filesystem.readFile({
              path: photo.filepath,
              directory: Directory.Data,
            });
            if (file.data instanceof Blob) {
              photo.webviewPath = await convertBlobToBase64(file.data);
            } else {
              photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
          } catch (e) {
            console.warn('Could not load photo from filesystem:', photo.filepath, e);
          }
        }
      }

      photos.value = photosInPreferences;
      isLoaded = true;
    } catch (err) {
      console.error('Error loading saved photos:', err);
    }
  };

  const cachePhotos = () => {
    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(photos.value),
    });
  };

  watch(photos, cachePhotos, { deep: true });

  onMounted(() => {
    loadSaved();
  });

  const takePhoto = async (): Promise<UserPhoto | null> => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      const fileName = `${Date.now()}.jpeg`;
      const savedFileImage = await savePicture(photo, fileName);

      photos.value = [savedFileImage, ...photos.value];
      return savedFileImage;
    } catch (error) {
      console.log('Camera action cancelled or failed:', error);
      return null;
    }
  };

  // Alias for backward compatibility
  const takePicture = takePhoto;

  const deletePhoto = async (photo: UserPhoto) => {
    photos.value = photos.value.filter((p) => p.filepath !== photo.filepath);

    try {
      const filename = photo.filepath.substring(photo.filepath.lastIndexOf('/') + 1);
      await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Data,
      });
    } catch (e) {
      console.warn('Could not delete file from filesystem:', photo.filepath, e);
    }
  };

  return {
    photos,
    takePhoto,
    takePicture,
    deletePhoto,
    loadSaved,
  };
};
