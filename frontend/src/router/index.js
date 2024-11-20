import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import ContactPage from "@/views/ContactPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import BooksPage from "@/views/BooksPage.vue";
import BookDetailPage from "@/views/BookDetailPage.vue";
import PolicyPage from "@/views/PolicyPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";

const routes = [
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    props: true,
  },
  {
    path: "/contact",
    name: "ContactPage",
    component: ContactPage,
    props: true,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
    props: true,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    props: true,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    props: true,
  },
  {
    path: "/books",
    name: "BooksPage",
    component: BooksPage,
    props: true,
  },
  {
    path: "/books/:id",
    name: "BookDetailPage",
    component: BookDetailPage,
    props: true,
  },
  {
    path: "/policy",
    name: "PolicyPage",
    component: PolicyPage,
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
