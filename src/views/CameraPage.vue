<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border ios-camera-header">
      <ion-toolbar class="ios-camera-toolbar">
        <ion-title class="ios-camera-title">Camera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="camera-content">
      <div class="ios-camera-container">
        <!-- Viewfinder / Preview Section -->
        <div class="viewfinder-frame">
          <!-- Captured Photo Preview State -->
          <div v-if="lastCaptured" class="captured-preview-wrapper">
            <ion-img :src="lastCaptured.webviewPath" alt="Captured preview" class="captured-image"></ion-img>
            <div class="captured-badge">
              <ion-icon :icon="checkmarkCircle"></ion-icon>
              <span>Captured</span>
            </div>
          </div>

          <!-- Active Viewfinder Placeholder / Guides -->
          <div v-else class="viewfinder-guides">
            <div class="corner-bracket top-left"></div>
            <div class="corner-bracket top-right"></div>
            <div class="corner-bracket bottom-left"></div>
            <div class="corner-bracket bottom-right"></div>
            
            <div class="viewfinder-center">
              <div class="pulse-aperture">
                <ion-icon :icon="camera" class="aperture-icon"></ion-icon>
              </div>
              <p class="viewfinder-hint">Ready to capture</p>
            </div>
          </div>
        </div>

        <!-- Post-Capture Quick Actions (Done / Retake) -->
        <div v-if="lastCaptured" class="preview-actions">
          <ion-button fill="clear" class="preview-btn retake-btn" @click="handleRetake">
            <ion-icon slot="start" :icon="refreshOutline"></ion-icon>
            Retake
          </ion-button>
          <ion-button shape="round" class="preview-btn done-btn" @click="goToPhotos">
            <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
            View in Photos
          </ion-button>
        </div>

        <!-- Camera Controls Bar -->
        <div class="camera-bottom-controls">
          <!-- Left: Recent Thumbnail Shortcut -->
          <div class="control-side-slot">
            <div
              v-if="photos.length > 0"
              class="recent-thumbnail-btn"
              @click="goToPhotos"
            >
              <ion-img :src="photos[0].webviewPath" alt="Recent photo" class="recent-thumb-img"></ion-img>
            </div>
          </div>

          <!-- Center: iOS Shutter Button -->
          <div class="shutter-wrapper">
            <button
              type="button"
              class="ios-shutter-button"
              :class="{ 'is-capturing': isCapturing }"
              @click="handleShutterPress"
              aria-label="Take Photo"
            >
              <span class="shutter-inner"></span>
            </button>
          </div>

          <!-- Right: Status / Flash aesthetic placeholder -->
          <div class="control-side-slot">
            <div class="side-indicator-btn" @click="handleShutterPress">
              <ion-icon :icon="sparklesOutline" class="side-icon"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonIcon,
  IonButton,
} from '@ionic/vue';
import {
  camera,
  checkmarkCircle,
  refreshOutline,
  arrowForwardOutline,
  sparklesOutline,
} from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';
import { useRouter } from 'vue-router';

const router = useRouter();
const { photos, takePicture } = usePhotoGallery();

const isCapturing = ref(false);
const lastCaptured = ref<UserPhoto | null>(null);

const handleShutterPress = async () => {
  if (isCapturing.value) return;
  isCapturing.value = true;
  try {
    const photo = await takePicture();
    if (photo) {
      lastCaptured.value = photo;
    }
  } finally {
    isCapturing.value = false;
  }
};

const handleRetake = () => {
  lastCaptured.value = null;
  handleShutterPress();
};

const goToPhotos = () => {
  lastCaptured.value = null;
  router.push('/photos');
};
</script>

<style scoped>
.ios-camera-header {
  background: var(--ion-background-color);
  border-bottom: 1px solid var(--ios-subtle-border);
}

.ios-camera-toolbar {
  --background: transparent;
  --border-width: 0;
}

.ios-camera-title {
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.4px;
}

.camera-content {
  --padding-bottom: calc(100px + env(safe-area-inset-bottom, 0px));
}

.ios-camera-container {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 170px);
  padding: 16px 20px;
}

/* Viewfinder */
.viewfinder-frame {
  width: 100%;
  aspect-ratio: 4 / 5;
  max-height: 55vh;
  border-radius: 28px;
  background: var(--ios-card-bg);
  border: 1px solid var(--ios-card-border);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
}

.viewfinder-guides {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.corner-bracket {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--ios-text-secondary);
  opacity: 0.6;
}

.top-left {
  top: 20px;
  left: 20px;
  border-top: 2px solid;
  border-left: 2px solid;
  border-top-left-radius: 8px;
}

.top-right {
  top: 20px;
  right: 20px;
  border-top: 2px solid;
  border-right: 2px solid;
  border-top-right-radius: 8px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
  border-bottom: 2px solid;
  border-left: 2px solid;
  border-bottom-left-radius: 8px;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-bottom-right-radius: 8px;
}

.viewfinder-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.pulse-aperture {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(0, 122, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.aperture-icon {
  font-size: 36px;
  color: var(--ion-color-primary);
}

.viewfinder-hint {
  font-size: 14px;
  font-weight: 500;
  color: var(--ios-text-secondary);
  margin: 0;
  letter-spacing: -0.2px;
}

/* Captured Preview */
.captured-preview-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.captured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.captured-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
}

.captured-badge ion-icon {
  font-size: 16px;
  color: #34c759;
}

/* Post capture actions */
.preview-actions {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  margin-top: 14px;
}

.preview-btn {
  font-weight: 600;
  font-size: 14px;
}

.retake-btn {
  --color: var(--ios-text-secondary);
}

.done-btn {
  --background: var(--ion-color-primary);
  --color: #ffffff;
}

/* Bottom Controls */
.camera-bottom-controls {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px 6px;
}

.control-side-slot {
  width: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.recent-thumbnail-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--ion-color-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.recent-thumbnail-btn:active {
  transform: scale(0.92);
}

.recent-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.side-indicator-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--ios-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ios-text-secondary);
}

/* iOS Camera Shutter Button */
.shutter-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ios-shutter-button {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  border: 4px solid var(--ion-text-color);
  background: transparent;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.15s ease;
}

.shutter-inner {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: var(--ion-text-color);
  transition: transform 0.15s ease, background-color 0.15s ease;
  display: block;
}

.ios-shutter-button:active {
  transform: scale(0.94);
}

.ios-shutter-button:active .shutter-inner {
  transform: scale(0.88);
  opacity: 0.85;
}

.ios-shutter-button.is-capturing .shutter-inner {
  background: var(--ion-color-primary);
  transform: scale(0.85);
}
</style>
