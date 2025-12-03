<template>
  <v-carousel hide-delimiters cycle height="100%" :show-arrows="false">
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <v-img
        :src="item.src"
        height="100%"
        width="100%"
        fit="cover"
        position="center center"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousels",
  // รับข้อมูลเข้ามาเหมือน Dropdown รับ options
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
/* จัดการให้ภาพไม่เพี้ยน */
.v-image__image {
  background-position: center center !important;
}
</style>
