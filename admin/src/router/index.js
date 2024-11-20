import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import OrderPage from "@/views/OrderPage.vue";
import UserPage from "@/views/UserPage.vue";
import BookPage from "@/views/BookPage.vue";

const routes = [
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    props: true,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    props: true,
  },
  {
    path: "/orders",
    name: "OrderPage",
    component: OrderPage,
    props: true,
  },
  {
    path: "/users",
    name: "UserPage",
    component: UserPage,
    props: true,
  },
  {
    path: "/products",
    name: "BookPage",
    component: BookPage,
    props: true,
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes,
});

export default router;
