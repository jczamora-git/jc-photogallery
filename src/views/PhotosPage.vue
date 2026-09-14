<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border ios-header">
      <ion-toolbar class="ios-toolbar">
        <ion-title class="ios-title">Photos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ios-content">
      <div class="ios-app-container">
        <!-- iOS Large Title Header -->
        <ion-header collapse="condense" class="ion-no-border">
          <ion-toolbar class="ios-toolbar-condense">
            <div class="ios-large-title-wrapper">
              <span class="ios-subtitle">My Library</span>
              <h1 class="ios-large-title">Photos</h1>
            </div>
          </ion-toolbar>
        </ion-header>

        <!-- Elegant iOS Empty State -->
        <div v-if="photos.length === 0" class="ios-empty-state">
          <div class="empty-icon-card">
            <ion-icon :icon="imagesOutline" class="empty-icon"></ion-icon>
          </div>
          <h2 class="empty-title">No Photos Yet</h2>
          <p class="empty-description">Photos you capture will appear here.</p>
          <ion-button
            fill="clear"
            class="ios-subtle-btn"
            @click="handleTakePhoto"
          >
            <ion-icon slot="start" :icon="cameraOutline"></ion-icon>
            Take Photo
          </ion-button>
        </div>

        <!-- Native iOS Photos Grid -->
        <div v-else class="photos-grid-wrapper">
          <div class="library-meta-header">
            <span class="photo-count-badge">{{ photos.length }} {{ photos.length === 1 ? 'Photo' : 'Photos' }}</span>
          </div>

          <div class="ios-photo-grid">
            <div
              v-for="photo in photos"
              :key="photo.filepath"
              class="photo-cell"
              @click="openPhotoAction(photo)"
            >
              <ion-img
                :src="photo.webviewPath"
                alt="Captured library photo"
                class="photo-thumbnail"
              ></ion-img>
            </div>
          </div>
        </div>

        <!-- iOS Photo Action Sheet -->
        <ion-action-sheet
          :is-open="!!selectedPhoto"
          header="Photo Options"
          :buttons="actionSheetButtons"
          @didDismiss="selectedPhoto = null"
        ></ion-action-sheet>
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
  IonActionSheet,
} from '@ionic/vue';
import { imagesOutline, cameraOutline, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';
import { useRouter } from 'vue-router';

const router = useRouter();
const { photos, takePhoto, deletePhoto } = usePhotoGallery();
const selectedPhoto = ref<UserPhoto | null>(null);

const handleTakePhoto = async () => {
  const result = await takePhoto();
  if (result) {
    // Photo captured and saved
  }
};

const openPhotoAction = (photo: UserPhoto) => {
  selectedPhoto.value = photo;
};

const actionSheetButtons = [
  {
    text: 'Delete Photo',
    role: 'destructive',
    icon: trash,
    handler: () => {
      if (selectedPhoto.value) {
        deletePhoto(selectedPhoto.value);
        selectedPhoto.value = null;
      }
    },
  },
  {
    text: 'Cancel',
    icon: close,
    role: 'cancel',
    handler: () => {
      selectedPhoto.value = null;
    },
  },
];
</script>

<style scoped>
.ios-header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: var(--ion-background-color);
  border-bottom: 1px solid var(--ios-subtle-border);
}

.ios-toolbar {
  --background: transparent;
  --border-width: 0;
}

.ios-title {
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.4px;
}

.ios-content {
  --padding-bottom: calc(90px + env(safe-area-inset-bottom, 0px));
}

.ios-toolbar-condense {
  --background: transparent;
  --padding-start: 16px;
  --padding-end: 16px;
}

.ios-large-title-wrapper {
  padding: 12px 16px 8px;
}

.ios-subtitle {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--ios-text-secondary);
  display: block;
  margin-bottom: 2px;
}

.ios-large-title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.8px;
  margin: 0;
  color: var(--ion-text-color);
}

/* iOS Empty State */
.ios-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 55vh;
  padding: 32px 24px;
  text-align: center;
}

.empty-icon-card {
  width: 90px;
  height: 90px;
  border-radius: 28px;
  background: var(--ios-card-bg);
  border: 1px solid var(--ios-card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.empty-icon {
  font-size: 42px;
  color: var(--ios-text-secondary);
}

.empty-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 0 6px;
  color: var(--ion-text-color);
}

.empty-description {
  font-size: 15px;
  color: var(--ios-text-secondary);
  margin: 0 0 24px;
  max-width: 280px;
  line-height: 1.4;
}

.ios-subtle-btn {
  --color: var(--ion-color-primary);
  background: var(--ios-card-bg);
  border: 1px solid var(--ios-card-border);
  border-radius: 24px;
  font-weight: 600;
  font-size: 15px;
  height: 42px;
  padding: 0 20px;
  letter-spacing: -0.3px;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.ios-subtle-btn:active {
  transform: scale(0.96);
  opacity: 0.85;
}

/* Photo Grid */
.photos-grid-wrapper {
  padding: 0 4px 20px;
}

.library-meta-header {
  padding: 4px 12px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.photo-count-badge {
  font-size: 13px;
  font-weight: 500;
  color: var(--ios-text-secondary);
}

.ios-photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

@media (min-width: 600px) {
  .ios-photo-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }
}

.photo-cell {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--ios-card-bg);
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.photo-cell:active {
  transform: scale(0.97);
  opacity: 0.9;
}

.photo-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
