<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Empty state when no photos have been taken yet -->
      <div v-if="photos.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <ion-icon :icon="cameraOutline" class="empty-icon"></ion-icon>
        </div>
        <h2>No Photos Yet</h2>
        <p>Tap the camera button below to capture your first photo using Capacitor Camera!</p>
        <ion-button shape="round" color="primary" @click="takePhoto">
          <ion-icon slot="start" :icon="camera"></ion-icon>
          Take a Photo
        </ion-button>
      </div>

      <!-- Photo Grid -->
      <ion-grid v-else class="gallery-grid">
        <ion-row>
          <ion-col size="6" size-md="4" size-lg="3" v-for="photo in photos" :key="photo.filepath">
            <div class="photo-card" @click="showActionSheet(photo)">
              <ion-img :src="photo.webviewPath" alt="Captured photo" class="gallery-image" />
              <div class="photo-overlay">
                <ion-icon :icon="trashOutline" class="delete-hint-icon"></ion-icon>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Action Sheet for Photo Options (Delete / Cancel) -->
      <ion-action-sheet
        :is-open="!!selectedPhoto"
        header="Photo Options"
        :buttons="actionSheetButtons"
        @didDismiss="selectedPhoto = null"
      ></ion-action-sheet>

      <!-- Floating Action Button (FAB) to trigger camera -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="center" class="camera-fab">
        <ion-fab-button color="primary" @click="takePhoto">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon,
  IonActionSheet,
  IonButton,
} from '@ionic/vue';
import { camera, cameraOutline, trash, trashOutline, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/composables/usePhotoGallery';

const { photos, takePhoto, deletePhoto } = usePhotoGallery();
const selectedPhoto = ref<UserPhoto | null>(null);

const showActionSheet = (photo: UserPhoto) => {
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
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 75%;
  padding: 24px;
}

.empty-icon-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--ion-color-light, #f4f5f8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.empty-icon {
  font-size: 48px;
  color: var(--ion-color-medium, #92949c);
}

.empty-state h2 {
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--ion-color-dark, #222428);
}

.empty-state p {
  color: var(--ion-color-step-600, #666);
  max-width: 320px;
  margin: 0 0 24px;
  font-size: 15px;
  line-height: 1.4;
}

.gallery-grid {
  padding: 8px;
  padding-bottom: 80px;
}

.photo-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  aspect-ratio: 1 / 1;
  background-color: #eee;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.photo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.delete-hint-icon {
  font-size: 28px;
  color: #fff;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

.camera-fab {
  margin-bottom: 16px;
}
</style>
