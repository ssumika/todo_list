import { createWebHistory, createRouter } from "vue-router";
import page1 from '@/components/page_1'
import page2 from '@/components/page_2'
import page3 from '@/components/page_3'

const routes = [
  {
    path: "/",
    name: "Page1",
    component: page1,
  },
  {
    path: "/page2",
    name: "Page2",
    component: page2,
  },
  {
    path: "/page3",
    name: "Page3",
    component: page3,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

