import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "首頁",
      component: HomeView,
    },
    {
      path: "/week-one",
      name: "第一周作業",
      component: () => import("../views/WeekOne.vue"),
    },
    {
      path: "/week-two",
      name: "第二周作業",
      component: () => import("../views/WeekTwo.vue"),
    },
  ],
});

export default router;
