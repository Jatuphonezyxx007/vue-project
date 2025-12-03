<template>
  <v-menu
    v-model="menu"
    offset-y
    transition="slide-y-transition"
    bottom
    content-class="elevation-4 rounded-lg"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        v-bind="attrs"
        v-on="on"
        class="category-trigger d-flex align-center cursor-pointer mr-4"
      >
        <span class="body-1 grey--text text--darken-2 font-weight-medium mr-1">
          {{ label }}
        </span>

        <v-icon
          class="material-symbols-rounded transition-icon"
          color="grey darken-2"
        >
          {{ menu ? "expand_less" : "expand_more" }}
        </v-icon>
      </div>
    </template>

    <v-list dense class="py-2">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        link
        class="px-4 mb-1 category-item"
        @click="$emit('select', item)"
      >
        <v-list-item-icon v-if="item.icon" class="mr-3">
          <v-icon color="primary" class="material-symbols-rounded">
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="body-2 font-weight-medium">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "Dropdown",
  // รับค่าจากภายนอกผ่าน props
  props: {
    label: {
      type: String,
      default: "เมนู", // ค่าเริ่มต้นถ้าไม่ส่งอะไรมา
    },
    items: {
      type: Array,
      default: () => [], // ลิสต์รายการ items { title, icon }
    },
  },
  data: () => ({
    menu: false, // สถานะเปิด/ปิด ยังคงอยู่ที่ตัวลูกเหมือนเดิม
  }),
};
</script>

<style scoped>
.category-trigger {
  user-select: none;
  transition: all 0.3s ease;
}

.category-trigger:hover span {
  color: #000 !important;
}

.transition-icon {
  transition: transform 0.2s ease-in-out;
}

.category-item:hover {
  background-color: #f3f3f3 !important;
  color: #000;
}
</style>
