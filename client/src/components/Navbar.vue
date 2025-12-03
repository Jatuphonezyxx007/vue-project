<template>
  <v-app-bar app elevation="0" height="120" class="main-navbar px-0 px-md-4">
    <v-container
      class="pa-0 d-flex flex-column justify-center main-container py-6"
      fluid
      style="height: 90%"
    >
      <v-row
        no-gutters
        class="d-none d-md-flex align-center justify-end mb-1"
        style="width: 100%; flex: 0 0 auto"
      >
        <div class="d-flex align-center top-links">
          <a
            href="/register"
            class="white--text text-decoration-none mr-2 d-flex align-center hover-opacity"
          >
            <span class="text-caption font-weight-regular">สมัครสมาชิก</span>
          </a>

          <div
            class="mx-2"
            style="
              height: 14px;
              border-left: 1px solid rgba(255, 255, 255, 0.6);
            "
          ></div>

          <a
            href="/login"
            class="white--text text-decoration-none ml-2 d-flex align-center hover-opacity"
          >
            <span class="text-caption font-weight-regular">เข้าสู่ระบบ</span>
          </a>
        </div>
      </v-row>

      <v-row
        no-gutters
        align="center"
        justify="space-between"
        style="width: 100%"
      >
        <v-col cols="auto" class="d-flex align-center">
          <v-app-bar-nav-icon
            class="mr-2 white--text d-md-none"
          ></v-app-bar-nav-icon>

          <router-link
            to="/"
            class="d-flex align-center text-decoration-none mr-md-8 hover-effect"
          >
            <v-icon
              color="white"
              size="38"
              class="mr-2 material-symbols-rounded"
            >
              shopping_bag
            </v-icon>
            <div>
              <span
                class="text-h5 font-weight-bold white--text tracking-tight d-block"
                style="line-height: 1"
              >
                MyShop
              </span>
              <span
                class="caption white--text opacity-80 font-weight-light d-block"
                style="letter-spacing: 1px"
              >
                Thailand
              </span>
            </div>
          </router-link>
        </v-col>

        <v-col
          class="d-none d-md-flex align-center flex-grow-1 px-4"
          style="max-width: 800px"
        >
          <div class="search-wrapper flex-grow-1 elevation-3">
            <form class="search-inner d-flex align-center" @submit.prevent>
              <input
                type="text"
                placeholder="ค้นหาสินค้า แบรนด์ หรือโค้ดส่วนลด..."
                class="custom-search-input pl-4"
              />
              <button class="search-btn">
                <v-icon
                  color="white"
                  size="24"
                  class="material-symbols-rounded"
                >
                  search
                </v-icon>
              </button>
            </form>
          </div>
        </v-col>

        <v-spacer class="d-md-none"></v-spacer>

        <v-col cols="auto" class="d-flex justify-center align-center">
          <v-btn icon class="hover-zoom">
            <v-badge
              content="2"
              color="white"
              overlap
              offset-x="8"
              offset-y="8"
            >
              <template v-slot:badge>
                <span style="color: #ee4d2d; font-weight: bold">2</span>
              </template>

              <v-icon color="white" class="material-symbols-rounded">
                shopping_cart
              </v-icon>
            </v-badge>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
};
</script>

<style>
/* 1. Navbar Gradient Theme */
.main-navbar {
  background: linear-gradient(135deg, #f53d2d 0%, #ff6e2f 100%) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 2. Dropdown CSS */
.navbar-dropdown ::v-deep .category-trigger span {
  color: white !important;
  font-weight: 500;
  font-size: 1rem;
}
.navbar-dropdown ::v-deep .category-trigger .v-icon {
  color: rgba(255, 255, 255, 0.8) !important;
}
.navbar-dropdown ::v-deep .category-trigger:hover .v-icon {
  color: white !important;
}

/* 3. Search Bar Design */
.search-wrapper {
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-1px);
}

.search-inner {
  height: 40px;
  position: relative;
  width: 100%;
}

.custom-search-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: #333333;
  font-weight: 400;
  background: transparent;
}

.custom-search-input::placeholder {
  color: #9e9e9e;
  font-weight: 300;
}

.search-btn {
  background: linear-gradient(135deg, #ff4422 0%, #ff8c5b 100%);
  height: 100%;
  width: 65px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;
}

.search-btn:hover {
  filter: brightness(0.9);
}

/* 4. Utility Classes */
.opacity-80 {
  opacity: 0.8;
}

.hover-effect:hover {
  opacity: 0.9;
}

.hover-bright:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.hover-zoom {
  transition: transform 0.2s;
}
.hover-zoom:hover {
  transform: scale(1.1);
}

/* New CSS for Top Links */
.hover-opacity:hover {
  opacity: 0.8;
}

/* บังคับให้ทุก Class ของ Vuetify ใช้ Font Mitr */
.v-application,
.v-application .body-1,
.v-application .body-2,
.v-application .caption,
.v-application .display-1,
.v-application .display-2,
.v-application .display-3,
.v-application .display-4,
.v-application .headline,
.v-application .overline,
.v-application .subheading,
.v-application .subtitle-1,
.v-application .subtitle-2,
.v-application .title,
/* --- เพิ่มรายการด้านล่างนี้ครับ --- */
.v-application .text-h1,
.v-application .text-h2,
.v-application .text-h3,
.v-application .text-h4,
.v-application .text-h5,
.v-application .text-h6,
.v-application .text-subtitle-1,
.v-application .text-subtitle-2,
.v-application .text-body-1,
.v-application .text-body-2,
.v-application .text-button,
.v-application .text-caption,
.v-application .text-overline {
  font-family: "Mitr", sans-serif !important;
}

/* Class สำหรับเรียกใช้ Material Symbols Rounded (คงเดิมไว้) */
.material-symbols-rounded {
  font-family: "Material Symbols Rounded";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
</style>
