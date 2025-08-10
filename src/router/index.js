import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "首頁",
      component: HomeView,
    },
    {
      path: "/week-one",
      name: "第一周作業",
      component: () => import("../components/WeekOne.vue"),
    },
    {
      path: "/week-two",
      name: "第二周作業",
      component: () => import("../components/WeekTwo.vue"),
    },
  ],
});

export default router;
