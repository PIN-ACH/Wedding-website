import { createRouter, createWebHistory } from 'vue-router'
import Marriage from '../views/Marriage.vue'
import RingCeremony from '../views/RingCeremony.vue'
import HaldiMehendi from "../views/HaldiMehendi.vue"


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
  },
  {
    path: "/haldi_mehendi/:guestName",
    name: "HaldiMehendi",
    component: HaldiMehendi
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

