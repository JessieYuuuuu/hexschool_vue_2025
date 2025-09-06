import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAccessToken } from "@/api";
const routes = [
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
    path: "/final-todo-list",
    name: "最終任務",
    component: () => import("../views/FinalMissions/FinalTodoLayout.vue"),
    redirect: "/final-todo-list/login-page",
    children: [
      {
        path: "login-page",
        name: "登入頁面",
        component: () => import("../views/FinalMissions/components/LoginPage.vue"),
      },
      {
        path: "to-do-list",
        name: "待辦主頁面",
        component: () => import("../views/FinalMissions/components/ToDoList.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to) => {
  const targets = [
    "/final-todo-list/login-page",
    "/final-todo-list/to-do-list",
    "/final-todo-list",
  ]; //最終作業的路由都要判斷登入狀態

  if (!targets.includes(to.path)) return;

  try {
    await getAccessToken();
    // 已登入
    if (to.path === "/final-todo-list/login-page") {
      return { path: "/final-todo-list/to-do-list" };
    }
  } catch {
    // 未登入
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("token");
    if (to.path !== "/final-todo-list/login-page") {
      return { path: "/final-todo-list/login-page" };
    }
  }
});

export default router;
