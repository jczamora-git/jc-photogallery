import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/photos'
  },
  {
    path: '/home',
    redirect: '/photos'
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/photos'
      },
      {
        path: 'photos',
        name: 'Photos',
        component: () => import('@/views/PhotosPage.vue')
      },
      {
        path: 'camera',
        name: 'Camera',
        component: () => import('@/views/CameraPage.vue')
      },
      {
        path: 'albums',
        name: 'Albums',
        component: () => import('@/views/AlbumsPage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
