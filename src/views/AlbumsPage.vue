<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border ios-header">
      <ion-toolbar class="ios-toolbar">
        <ion-title class="ios-title">Albums</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ios-content">
      <div class="ios-app-container">
        <!-- iOS Large Title Header -->
        <ion-header collapse="condense" class="ion-no-border">
          <ion-toolbar class="ios-toolbar-condense">
            <div class="ios-large-title-wrapper">
              <span class="ios-subtitle">Collections</span>
              <h1 class="ios-large-title">Albums</h1>
            </div>
          </ion-toolbar>
        </ion-header>

        <div class="albums-layout">
          <!-- My Albums Section -->
          <div class="section-title-row">
            <h2 class="section-heading">My Albums</h2>
          </div>

          <div class="albums-grid">
            <!-- Recents Album -->
            <div class="album-card" @click="goToPhotos">
              <div class="album-cover">
                <ion-img
                  v-if="photos.length > 0"
                  :src="photos[0].webviewPath"
                  alt="Recents album cover"
                  class="album-cover-img"
                ></ion-img>
                <div v-else class="empty-album-cover">
                  <ion-icon :icon="imagesOutline" class="album-placeholder-icon"></ion-icon>
                </div>
              </div>
              <div class="album-info">
                <span class="album-name">Recents</span>
                <span class="album-count">{{ photos.length }}</span>
              </div>
            </div>

            <!-- All Photos Album -->
            <div class="album-card" @click="goToPhotos">
              <div class="album-cover">
                <ion-img
                  v-if="photos.length > 1"
                  :src="photos[1].webviewPath"
                  alt="All photos album cover"
                  class="album-cover-img"
                ></ion-img>
                <ion-img
                  v-else-if="photos.length === 1"
                  :src="photos[0].webviewPath"
                  alt="All photos album cover"
                  class="album-cover-img"
                ></ion-img>
                <div v-else class="empty-album-cover">
                  <ion-icon :icon="albumsOutline" class="album-placeholder-icon"></ion-icon>
                </div>
              </div>
              <div class="album-info">
                <span class="album-name">All Photos</span>
                <span class="album-count">{{ photos.length }}</span>
              </div>
            </div>

            <!-- Favorites Album -->
            <div class="album-card">
              <div class="album-cover">
                <div class="empty-album-cover favorite-cover">
                  <ion-icon :icon="heartOutline" class="album-placeholder-icon fav-icon"></ion-icon>
                </div>
              </div>
              <div class="album-info">
                <span class="album-name">Favorites</span>
                <span class="album-count">0</span>
              </div>
            </div>

            <!-- Selfies / Camera Album -->
            <div class="album-card" @click="goToPhotos">
              <div class="album-cover">
                <div class="empty-album-cover camera-album-cover">
                  <ion-icon :icon="cameraOutline" class="album-placeholder-icon"></ion-icon>
                </div>
              </div>
              <div class="album-info">
                <span class="album-name">Camera Captures</span>
                <span class="album-count">{{ photos.length }}</span>
              </div>
            </div>
          </div>

          <!-- Media Types Section (Native iOS style list) -->
          <div class="section-title-row media-types-header">
            <h2 class="section-heading">Media Types</h2>
          </div>

          <div class="ios-list-card">
            <div class="ios-list-item" @click="goToPhotos">
              <div class="list-item-left">
                <ion-icon :icon="cameraOutline" class="list-item-icon"></ion-icon>
                <span class="list-item-label">Photos</span>
              </div>
              <div class="list-item-right">
                <span class="list-item-count">{{ photos.length }}</span>
                <ion-icon :icon="chevronForward" class="chevron-icon"></ion-icon>
              </div>
            </div>

            <div class="ios-list-divider"></div>

            <div class="ios-list-item">
              <div class="list-item-left">
                <ion-icon :icon="heartOutline" class="list-item-icon"></ion-icon>
                <span class="list-item-label">Favorites</span>
              </div>
              <div class="list-item-right">
                <span class="list-item-count">0</span>
                <ion-icon :icon="chevronForward" class="chevron-icon"></ion-icon>
              </div>
            </div>

            <div class="ios-list-divider"></div>

            <div class="ios-list-item">
              <div class="list-item-left">
                <ion-icon :icon="trashOutline" class="list-item-icon"></ion-icon>
                <span class="list-item-label">Recently Deleted</span>
              </div>
              <div class="list-item-right">
                <span class="list-item-count">0</span>
                <ion-icon :icon="chevronForward" class="chevron-icon"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonIcon,
} from '@ionic/vue';
import {
  imagesOutline,
  albumsOutline,
  heartOutline,
  cameraOutline,
  trashOutline,
  chevronForward,
} from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { useRouter } from 'vue-router';

const router = useRouter();
const { photos } = usePhotoGallery();

const goToPhotos = () => {
  router.push('/photos');
};
</script>

<style scoped>
.ios-header {
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
  --padding-bottom: calc(100px + env(safe-area-inset-bottom, 0px));
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

.albums-layout {
  padding: 8px 16px 30px;
}

.section-title-row {
  margin: 12px 0 14px;
}

.section-heading {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.4px;
  margin: 0;
  color: var(--ion-text-color);
}

.media-types-header {
  margin-top: 28px;
}

/* Albums 2x2 Grid */
.albums-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.album-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.15s ease;
}

.album-card:active {
  transform: scale(0.97);
}

.album-cover {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  background: var(--ios-card-bg);
  border: 1px solid var(--ios-card-border);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.album-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.empty-album-cover {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ios-card-bg);
}

.album-placeholder-icon {
  font-size: 40px;
  color: var(--ios-text-secondary);
}

.fav-icon {
  color: #ff2d55;
}

.album-info {
  padding: 8px 2px 4px;
  display: flex;
  flex-direction: column;
}

.album-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--ion-text-color);
  letter-spacing: -0.2px;
}

.album-count {
  font-size: 13px;
  color: var(--ios-text-secondary);
}

/* iOS Grouped List */
.ios-list-card {
  background: var(--ios-card-bg);
  border-radius: 14px;
  border: 1px solid var(--ios-card-border);
  overflow: hidden;
}

.ios-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.ios-list-item:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.list-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.list-item-icon {
  font-size: 20px;
  color: var(--ion-color-primary);
}

.list-item-label {
  font-size: 16px;
  font-weight: 500;
  color: var(--ion-text-color);
}

.list-item-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.list-item-count {
  font-size: 15px;
  color: var(--ios-text-secondary);
}

.chevron-icon {
  font-size: 16px;
  color: var(--ios-text-secondary);
  opacity: 0.6;
}

.ios-list-divider {
  height: 1px;
  background: var(--ios-subtle-border);
  margin-left: 48px;
}
</style>
