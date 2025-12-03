<template>
  <v-app>
    <content>
      <router-view />
    </content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
/* บังคับให้ทุก Class มาตรฐานของ Vuetify ใช้ Font Mitr 
   (รวมถึง Headers, Body, Caption และปุ่มต่างๆ)
*/
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
.v-application .title {
  font-family: "Mitr", sans-serif !important;
}

/* Class สำหรับเรียกใช้ Material Symbols Rounded */
.material-symbols-rounded {
  font-family: "Material Symbols Rounded";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* ขนาด icon มาตรฐาน */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
</style>
