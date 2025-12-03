<template>
  <div>
    <Navbar />

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
};
</script>
