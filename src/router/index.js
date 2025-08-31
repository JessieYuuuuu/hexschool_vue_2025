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
      component: () => import("../views/WeeKOne/WeekOne.vue"),
    },
    {
      path: "/week-two",
      name: "第二周作業",
      component: () => import("../views/WeekTwo/WeekTwo.vue"),
    },
    {
      path: "/week-three",
      name: "第三周作業",
      component: () => import("../views/WeekThree/WeekThree.vue"),
    },
    {
      path: "/advanced-missions",
      name: "進階作業",
      component: () => import("../views/AdvancedMissions/AdvancedMissions.vue"),
    },
    {
      path: "/final-missions",
      name: "最終任務",
      component: () => import("../views/FinalMissions/FinalMissions.vue"),
    },
  ],
});

export default router;
