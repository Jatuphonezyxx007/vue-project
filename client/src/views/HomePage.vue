<template>
  <div class="home-page grey lighten-5 force-font">
    <div class="main-container py-6">
      <div class="row mb-6">
        <div class="col-12 col-md-8 mb-3 mb-md-0">
          <section
            class="carousel-section shadow-sm rounded-xl overflow-hidden elevation-2"
          >
            <Carousels :items="carouselItems" />
          </section>
        </div>
        <div class="col-12 col-md-4 d-flex flex-column">
          <div class="side-banner-wrapper mb-3">
            <v-img
              src="https://placehold.co/400x170/067f3f/ffffff?text=Promotion+Hot"
              class="rounded-xl shadow-sm hover-zoom"
              height="100%"
              width="100%"
              cover
            ></v-img>
          </div>
          <div class="side-banner-wrapper">
            <v-img
              src="https://placehold.co/400x170/f37021/ffffff?text=7-Delivery"
              class="rounded-xl shadow-sm hover-zoom"
              height="100%"
              width="100%"
              cover
            ></v-img>
          </div>
        </div>
      </div>

      <section class="product-group mb-8">
        <div class="row">
          <div class="col-12 d-flex justify-space-between align-end mb-4">
            <div class="d-flex align-center">
              <div class="section-indicator mr-2"></div>
              <h2 class="font-weight-bold text-h5 mb-0">สินค้าแนะนำ</h2>
            </div>
            <v-btn
              tag="a"
              text
              color="primary"
              large
              :to="{ path: '/products' }"
              class="px-0 font-weight-bold"
              rounded
            >
              ดูทั้งหมด ({{ products.length }})
              <v-icon right small>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>

        <div class="row">
          <div
            class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
            v-for="(product, i) in visibleProducts"
            :key="i"
          >
            <Card :product="product" />
          </div>
        </div>

        <v-divider></v-divider>
      </section>

      <div class="row mb-1">
        <div class="col-12">
          <div class="side-banner-wrapper">
            <v-img
              src="https://placehold.co/400x170/067f3f/ffffff?text=Promotion+Hot"
              class="rounded-xl shadow-sm hover-zoom"
              height="100%"
              width="100%"
              cover
            ></v-img>
          </div>
        </div>
      </div>

      <div class="row mb-6">
        <div class="col-12 d-flex flex-column mb-3 mb-md-0">
          <section class="product-group mb-8">
            <v-row align="stretch">
              <v-col cols="12" md="3" class="d-none d-md-block">
                <v-img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"
                  alt="smart-phone-banner"
                  class="rounded-lg shadow-sm"
                  height="100%"
                  width="100%"
                  cover
                ></v-img>
              </v-col>

              <v-col cols="12" md="9">
                <div class="d-flex flex-column h-100">
                  <div class="d-flex justify-space-between align-end mb-4">
                    <div class="d-flex align-center">
                      <div class="section-indicator mr-2"></div>
                      <h2 class="font-weight-bold text-h5 mb-0">สินค้าแนะนำ</h2>
                    </div>
                    <v-btn
                      tag="a"
                      text
                      color="primary"
                      large
                      :to="{ path: '/products' }"
                      class="px-0 font-weight-bold"
                      rounded
                    >
                      ดูทั้งหมด ({{ products.length }})
                      <v-icon right small>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>

                  <div class="row">
                    <div
                      class="col-6 col-sm-4 col-md-3 mb-4"
                      v-for="(product, i) in visibleProducts.slice(0, 8)"
                      :key="i"
                    >
                      <Card :product="product" />
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-divider class="mt-4"></v-divider>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousels from "@/components/Carousels.vue";
import Card from "@/components/Card.vue";

export default {
  name: "HomePage",
  components: {
    Carousels,
    Card,
  },
  computed: {
    visibleProducts() {
      const breakpoint = this.$vuetify.breakpoint.name;
      let itemsPerRow = 2;

      switch (breakpoint) {
        case "xs":
          itemsPerRow = 2;
          break;
        case "sm":
          itemsPerRow = 3;
          break;
        case "md":
          itemsPerRow = 4;
          break;
        case "lg":
          itemsPerRow = 6;
          break;
        case "xl":
          itemsPerRow = 6;
          break;
        default:
          itemsPerRow = 2;
      }

      // แสดงแค่ 2 แถว
      const limit = itemsPerRow * 2;
      return this.products.slice(0, limit);
    },
  },
  data() {
    return {
      carouselItems: [
        { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg" },
      ],
      features: [
        { title: "สินค้าใหม่", icon: "mdi-new-box" },
        { title: "โปรโมชั่น", icon: "mdi-tag-heart" },
        { title: "คูปอง", icon: "mdi-ticket-percent" },
      ],
      products: [
        {
          id: 1,
          name: "แซนวิชแฮมชีส (สูตรใหม่)",
          price: 29,
          image: "https://placehold.co/200x200/png?text=Sandwich",
          isNew: true,
          rating: 5.0,
          reviews: 85,
        },
        {
          id: 2,
          name: "กาแฟอาราบิก้า เย็น",
          price: 45,
          image: "https://placehold.co/200x200/png?text=Coffee",
          isNew: true,
          rating: 5.0,
          reviews: 85,
        },
        {
          id: 3,
          name: "ข้าวกะเพราไก่ไข่ดาว",
          price: 49,
          image: "https://placehold.co/200x200/png?text=Rice+Box",
          isNew: false,
          rating: 5.0,
          reviews: 85,
        },
        {
          id: 4,
          name: "นมสดรสจืด 200มล.",
          price: 12,
          image: "https://placehold.co/200x200/png?text=Milk",
          isNew: false,
          rating: 5.0,
          reviews: 85,
        },
        {
          id: 5,
          name: "ขนมปังโฮลวีต",
          price: 22,
          image: "https://placehold.co/200x200/png?text=Bread",
          isNew: false,
          rating: 5.0,
          reviews: 85,
        },
        {
          id: 6,
          name: "ไส้กรอกชีสไบท์",
          price: 35,
          image: "https://placehold.co/200x200/png?text=Sausage",
          isNew: true,
          rating: 5.0,
          reviews: 85,
        },
        {
          id: 7,
          name: "ชานมไข่มุกบราวน์ชูการ์",
          price: 59,
          image: "https://placehold.co/200x200/png?text=Brown+Sugar+Milk+Tea",
          isNew: true,
          rating: 4.8,
          reviews: 120,
        },
        {
          id: 8,
          name: "โดนัทช็อคโกแลตลาวา",
          price: 35,
          image: "https://placehold.co/200x200/png?text=Choco+Donut",
          isNew: false,
          rating: 4.7,
          reviews: 67,
        },
        {
          id: 9,
          name: "น้ำแร่ธรรมชาติ 600ml",
          price: 10,
          image: "https://placehold.co/200x200/png?text=Water",
          isNew: false,
          rating: 4.9,
          reviews: 150,
        },
        {
          id: 10,
          name: "ไอศครีมวานิลลาแท่ง",
          price: 20,
          image: "https://placehold.co/200x200/png?text=Vanilla+Ice+Cream",
          isNew: true,
          rating: 4.6,
          reviews: 94,
        },
        {
          id: 11,
          name: "ไก่ป๊อปทอดกรอบ",
          price: 39,
          image: "https://placehold.co/200x200/png?text=Chicken+Pop",
          isNew: false,
          rating: 4.8,
          reviews: 203,
        },
        {
          id: 12,
          name: "เฟรนช์ฟรายส์ ชีส",
          price: 32,
          image: "https://placehold.co/200x200/png?text=Cheese+Fries",
          isNew: true,
          rating: 4.7,
          reviews: 132,
        },
        {
          id: 13,
          name: "สาหร่ายอบกรอบโนริ",
          price: 15,
          image: "https://placehold.co/200x200/png?text=Seaweed",
          isNew: false,
          rating: 4.5,
          reviews: 50,
        },
        {
          id: 14,
          name: "บะหมี่กึ่งสำเร็จรูป ต้มยำ",
          price: 6,
          image: "https://placehold.co/200x200/png?text=Instant+Noodle",
          isNew: false,
          rating: 4.8,
          reviews: 180,
        },
        {
          id: 15,
          name: "โยเกิร์ตสตรอว์เบอร์รี",
          price: 25,
          image: "https://placehold.co/200x200/png?text=Strawberry+Yogurt",
          isNew: true,
          rating: 4.9,
          reviews: 144,
        },
        {
          id: 16,
          name: "น้ำส้มคั้นสด 250ml",
          price: 35,
          image: "https://placehold.co/200x200/png?text=Orange+Juice",
          isNew: false,
          rating: 4.7,
          reviews: 112,
        },
        {
          id: 17,
          name: "พิซซ่าชีสแผ่นเล็ก",
          price: 69,
          image: "https://placehold.co/200x200/png?text=Mini+Pizza",
          isNew: true,
          rating: 4.8,
          reviews: 99,
        },
        {
          id: 18,
          name: "แซนวิชทูน่าสลัด",
          price: 34,
          image: "https://placehold.co/200x200/png?text=Tuna+Sandwich",
          isNew: false,
          rating: 4.6,
          reviews: 76,
        },
        {
          id: 19,
          name: "ช็อกโกแลตบาร์คลาสสิค",
          price: 20,
          image: "https://placehold.co/200x200/png?text=Chocolate+Bar",
          isNew: false,
          rating: 4.7,
          reviews: 167,
        },
        {
          id: 20,
          name: "ชาเขียวมัทฉะเย็น",
          price: 45,
          image: "https://placehold.co/200x200/png?text=Matcha+Tea",
          isNew: true,
          rating: 4.9,
          reviews: 210,
        },
        {
          id: 21,
          name: "คุกกี้ช็อกชิพ",
          price: 18,
          image: "https://placehold.co/200x200/png?text=Choco+Cookie",
          isNew: false,
          rating: 4.6,
          reviews: 89,
        },
        {
          id: 22,
          name: "มันฝรั่งทอดรสต้นตำรับ",
          price: 25,
          image: "https://placehold.co/200x200/png?text=Potato+Chips",
          isNew: false,
          rating: 4.8,
          reviews: 130,
        },
        {
          id: 23,
          name: "นมเปรี้ยวพร้อมดื่ม",
          price: 12,
          image: "https://placehold.co/200x200/png?text=Milk+Drink",
          isNew: false,
          rating: 4.7,
          reviews: 95,
        },
        {
          id: 24,
          name: "บิงซูสตรอว์เบอร์รี",
          price: 79,
          image: "https://placehold.co/200x200/png?text=Bingsu",
          isNew: true,
          rating: 5.0,
          reviews: 310,
        },
        {
          id: 25,
          name: "โซดาเลม่อน",
          price: 29,
          image: "https://placehold.co/200x200/png?text=Lemon+Soda",
          isNew: false,
          rating: 4.5,
          reviews: 66,
        },
        {
          id: 26,
          name: "โมจิไอศครีม มัทฉะ",
          price: 39,
          image: "https://placehold.co/200x200/png?text=Mochi+Matcha",
          isNew: true,
          rating: 4.9,
          reviews: 155,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* เหลือไว้เฉพาะ CSS ของ Layout หลัก */
.force-font >>> .text-h1,
.force-font >>> .text-h2,
.force-font >>> .text-h3,
.force-font >>> .text-h4,
.force-font >>> .text-h5,
.force-font >>> .text-h6,
.force-font >>> .text-body-1,
.force-font >>> .text-body-2,
.force-font >>> .caption,
.force-font >>> .v-btn {
  font-family: inherit !important;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.carousel-section {
  height: 360px;
  background-color: #e0e0e0;
}

.side-banner-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.section-indicator {
  width: 4px;
  height: 24px;
  background-color: #067f3f;
  border-radius: 2px;
}

.hover-zoom {
  transition: transform 0.3s ease;
}
.hover-zoom:hover .v-image__image {
  transform: scale(1.05);
}

.icon-circle {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #067f3f 0%, #0da557 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.service-item:hover .icon-circle {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(6, 127, 63, 0.3);
}

@media (max-width: 768px) {
  .carousel-section {
    height: 220px;
  }
  .side-banner-wrapper {
    height: 140px;
  }
}
</style>
