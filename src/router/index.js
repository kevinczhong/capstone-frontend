import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import LogoutView from "../views/LogoutView.vue";
import PropertyIndex from "../views/PropertyIndex.vue";
import PropertyShow from "../views/PropertyShow.vue";
import PropertyNew from "../views/PropertyNew.vue";
import PropertyEdit from "../views/PropertyEdit.vue";
import TourIndex from "../views/TourIndex.vue";
import TourShow from "../views/TourShow.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/properties/",
    name: "property-index",
    component: PropertyIndex,
  },
  {
    path: "/properties/:id",
    name: "property-show",
    component: PropertyShow,
  },
  {
    path: "/properties/new",
    name: "property-new",
    component: PropertyNew,
  },
  {
    path: "/properties/:id/edit",
    name: "property-edit",
    component: PropertyEdit,
  },
  {
    path: "/tours/",
    name: "tour-index",
    component: TourIndex,
  },
  {
    path: "/tours/:id",
    name: "tour-show",
    component: TourShow,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
