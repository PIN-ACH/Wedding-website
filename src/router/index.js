import { createRouter, createWebHistory } from 'vue-router'
import Marriage from '../views/Marriage.vue'
import RingCeremony from '../views/RingCeremony.vue'

const routes = [
  {
    path: '/marriage/:guestName',
    name: 'Marriage',
    component: Marriage
  },
  {
    path: '/ring_ceremony/:guestName',
    name: 'RingCeremony',
    component: RingCeremony
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

