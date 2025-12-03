<template>
  <v-card
    class="mx-auto rounded-lg product-card clickable-card d-flex flex-column"
    height="100%"
    outlined
    style="border-color: #f0f0f0"
    hover
  >
    <div class="d-flex flex-column pa-0">
      <v-img
        :src="product.image"
        height="160"
        width="100%"
        cover
        class="product-image rounded-t-lg"
      >
        <v-chip
          v-if="product.isNew"
          color="error"
          text-color="white"
          x-small
          label
          class="ma-2 font-weight-bold px-2"
        >
          ใหม่
        </v-chip>
      </v-img>
    </div>

    <v-card-text class="px-3 pt-3 pb-0 flex-grow-1">
      <div
        class="product-title mb-1 text-body-2 font-weight-bold text--primary"
      >
        {{ product.name }}
      </div>
    </v-card-text>

    <div class="px-3 pb-3 pt-2 mt-auto">
      <div class="d-flex align-center mb-1">
        <v-rating
          :value="product.rating || 4.5"
          color="amber"
          background-color="grey lighten-2"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <span class="caption grey--text ml-1">
          ({{ product.reviews || 99 }})
        </span>
      </div>

      <div class="d-flex align-baseline">
        <span
          class="error--text font-weight-black text-h6"
          style="line-height: 1"
        >
          {{ product.price }}
        </span>
        <span class="caption grey--text ml-1">.-</span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    product: {
      type: Object,
      required: true,
      // โครงสร้างข้อมูลที่คาดหวัง: { name, price, image, isNew, rating, reviews }
    },
  },
};
</script>

<style scoped>
.product-card {
  transition: all 0.2s ease-in-out;
  border: 1px solid #f5f5f5;
  background-color: white;
  cursor: pointer;
}

/* เพิ่ม overflow hidden เพื่อไม่ให้รูปทะลุ border-radius ด้านบน */
.product-card {
  overflow: hidden;
}

.clickable-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
  border-color: #067f3f !important;
}

.product-image {
  transition: transform 0.3s ease;
}

.clickable-card:hover .product-image {
  transform: scale(1.05); /* ซูมรูปภาพนิดหน่อยตอน Hover */
}

.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 40px; /* ความสูงคงที่สำหรับ 2 บรรทัด */
  line-height: 1.4;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .product-title {
    font-size: 0.85rem !important;
    height: 38px;
  }
}
</style>
