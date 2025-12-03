import Vue from "vue";
import VueRouter from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue"; // Layout ที่มี Navbar/Footer

import Login from "@/views/Login.vue"; // เปลี่ยนชื่อตามไฟล์ที่สร้างไว้: LoginPage.vue
import Register from "../views/Register.vue";
import HomePage from "../views/HomePage.vue";
// import { component } from "vue/types/umd"; // <-- บรรทัดนี้ควรลบทิ้ง

Vue.use(VueRouter);

const routes = [
  // 1. **ROUTES ที่ต้องการให้มี Navbar/Layout หลัก (ใช้ MainLayout)**
  {
    path: "/",
    component: MainLayout, // ใช้ MainLayout
    children: [
      {
        path: "", // Path: /
        name: "home",
        component: HomePage,
      },
      // สามารถเพิ่ม route อื่นๆ ที่ต้องการ Navbar ได้ที่นี่
      // {
      //   path: "products",
      //   name: "products",
      //   component: ProductsPage,
      // },
    ],
  },

  // 2. **ROUTES ที่ไม่ต้องการให้มี Navbar/Layout หลัก (ใช้ component โดยตรง หรือ Empty Layout)**
  {
    path: "/login",
    name: "login",
    component: Login, // เรียกใช้ Login component โดยตรง (ไม่มี Layout ครอบ)
  },
  {
    path: "/register",
    name: "register",
    component: Register, // เรียกใช้ Register component โดยตรง (ไม่มี Layout ครอบ)
  },

  // หรือถ้าคุณต้องการใช้ Layout เปล่า เช่น:
  /*
  {
    path: "/login",
    component: EmptyLayout, 
    children: [
      {
        path: "",
        name: "login",
        component: Login, 
      },
    ],
  },
  */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
