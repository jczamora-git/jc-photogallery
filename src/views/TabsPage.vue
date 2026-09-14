<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      
      <ion-tab-bar slot="bottom" class="ios-dock">
        <ion-tab-button tab="photos" href="/photos" class="dock-tab-button">
          <ion-icon :icon="images" class="tab-icon"></ion-icon>
          <ion-label class="tab-label">Photos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="camera" href="/camera" class="dock-tab-button camera-tab-button">
          <div class="camera-icon-halo">
            <ion-icon :icon="camera" class="camera-center-icon"></ion-icon>
          </div>
          <ion-label class="tab-label">Camera</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="albums" href="/albums" class="dock-tab-button">
          <ion-icon :icon="albums" class="tab-icon"></ion-icon>
          <ion-label class="tab-label">Albums</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/vue';
import { images, camera, albums } from 'ionicons/icons';
</script>

<style scoped>
/* Floating iOS Frosted Glass Dock */
.ios-dock {
  position: absolute;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  left: 16px;
  right: 16px;
  max-width: 440px;
  margin: 0 auto;
  height: 64px;
  border-radius: 32px;
  border: 1px solid var(--ios-dock-border);
  background: var(--ios-dock-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: var(--ios-dock-shadow);
  padding: 4px 8px;
  contain: none;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1000;
}

.dock-tab-button {
  --background: transparent;
  --color: var(--ios-text-secondary);
  --color-selected: var(--ion-color-primary);
  background: transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 20px;
}

.tab-icon {
  font-size: 22px;
  margin-bottom: 2px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.2px;
}

/* Center Camera Tab Button Accent */
.camera-tab-button {
  overflow: visible;
}

.camera-icon-halo {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ion-color-primary), #0051ba);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 122, 255, 0.35);
  margin-bottom: 2px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
}

.camera-center-icon {
  font-size: 22px;
  color: #ffffff;
}

.camera-tab-button:active .camera-icon-halo {
  transform: scale(0.92);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.25);
}

.dock-tab-button.tab-selected .tab-icon {
  transform: scale(1.08);
}
</style>
