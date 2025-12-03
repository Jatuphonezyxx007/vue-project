<template>
  <div class="register-container">
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="5">
          <v-card class="elevation-12 rounded-xl overflow-hidden register-card">
            <v-row class="fill-height ma-0">
              <v-col
                cols="12"
                class="register-header text-center py-8 white--text"
              >
                <div class="mb-2">
                  <span class="material-symbols-rounded icon-logo"
                    >person_add</span
                  >
                </div>
                <h2 class="text-h4 font-weight-bold mb-1 mitr-font">
                  สมัครสมาชิกใหม่
                </h2>
                <p class="subtitle-1 mitr-font opacity-80">
                  เข้าร่วมกับเรา MyShop Thailand
                </p>
              </v-col>

              <v-col cols="12" class="white py-8 px-6 px-md-10">
                <v-form
                  ref="form"
                  v-model="valid"
                  @submit.prevent="handleRegister"
                >
                  <v-row>
                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="form.username"
                        label="ชื่อผู้ใช้ (Username)"
                        outlined
                        dense
                        class="mitr-font rounded-lg"
                        :rules="[(v) => !!v || 'กรุณากรอกชื่อผู้ใช้']"
                      >
                        <template v-slot:prepend-inner>
                          <span
                            class="material-symbols-rounded grey--text text--darken-2 mr-2"
                            >badge</span
                          >
                        </template>
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="form.phone"
                        label="เบอร์โทรศัพท์"
                        outlined
                        dense
                        type="tel"
                        class="mitr-font rounded-lg"
                        :rules="[
                          (v) => !!v || 'กรุณากรอกเบอร์โทรศัพท์',
                          (v) =>
                            /^[0-9]{10}$/.test(v) || 'เบอร์โทรศัพท์ไม่ถูกต้อง',
                        ]"
                      >
                        <template v-slot:prepend-inner>
                          <span
                            class="material-symbols-rounded grey--text text--darken-2 mr-2"
                            >smartphone</span
                          >
                        </template>
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="form.email"
                        label="อีเมล"
                        outlined
                        dense
                        type="email"
                        class="mitr-font rounded-lg"
                        :rules="[
                          (v) => !!v || 'กรุณากรอกอีเมล',
                          (v) => /.+@.+\..+/.test(v) || 'รูปแบบอีเมลไม่ถูกต้อง',
                        ]"
                      >
                        <template v-slot:prepend-inner>
                          <span
                            class="material-symbols-rounded grey--text text--darken-2 mr-2"
                            >email</span
                          >
                        </template>
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="form.password"
                        :type="showPassword ? 'text' : 'password'"
                        label="รหัสผ่าน"
                        outlined
                        dense
                        class="mitr-font rounded-lg"
                        :rules="[
                          (v) => !!v || 'กรุณากรอกรหัสผ่าน',
                          (v) =>
                            v.length >= 6 || 'รหัสผ่านต้องมีอย่างน้อย 6 ตัว',
                        ]"
                      >
                        <template v-slot:prepend-inner>
                          <span
                            class="material-symbols-rounded grey--text text--darken-2 mr-2"
                            >lock</span
                          >
                        </template>
                        <template v-slot:append>
                          <span
                            class="material-symbols-rounded cursor-pointer grey--text hover-icon"
                            @click="showPassword = !showPassword"
                          >
                            {{ showPassword ? "visibility" : "visibility_off" }}
                          </span>
                        </template>
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field
                        v-model="form.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        label="ยืนยันรหัสผ่าน"
                        outlined
                        dense
                        class="mitr-font rounded-lg"
                        :rules="[
                          (v) => !!v || 'กรุณายืนยันรหัสผ่าน',
                          (v) => v === form.password || 'รหัสผ่านไม่ตรงกัน',
                        ]"
                      >
                        <template v-slot:prepend-inner>
                          <span
                            class="material-symbols-rounded grey--text text--darken-2 mr-2"
                            >lock_reset</span
                          >
                        </template>
                        <template v-slot:append>
                          <span
                            class="material-symbols-rounded cursor-pointer grey--text hover-icon"
                            @click="showConfirmPassword = !showConfirmPassword"
                          >
                            {{
                              showConfirmPassword
                                ? "visibility"
                                : "visibility_off"
                            }}
                          </span>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-btn
                    block
                    x-large
                    color="primary"
                    class="rounded-lg mitr-font btn-gradient elevation-6 mt-4"
                    type="submit"
                    :loading="loading"
                  >
                    <span class="font-weight-bold text-h6">ลงทะเบียน</span>
                  </v-btn>
                </v-form>

                <div class="text-center mt-6">
                  <span class="grey--text mitr-font text-body-2"
                    >มีบัญชีอยู่แล้ว?
                  </span>
                  <router-link
                    to="/login"
                    class="primary--text font-weight-bold text-decoration-none mitr-font hover-link"
                  >
                    เข้าสู่ระบบ
                  </router-link>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Register",
  data: () => ({
    valid: false,
    loading: false,
    showPassword: false,
    showConfirmPassword: false,
    form: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  }),
  methods: {
    handleRegister() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      // จำลองการสมัครสมาชิก (Mockup Process)
      setTimeout(() => {
        this.loading = false;
        this.showSuccessAlert();
      }, 1500);
    },
    showSuccessAlert() {
      Swal.fire({
        icon: "success",
        title: '<span style="font-family: Mitr">สมัครสมาชิกสำเร็จ!</span>',
        text: "บัญชีของคุณถูกสร้างเรียบร้อยแล้ว",
        confirmButtonText: "ไปหน้าเข้าสู่ระบบ",
        confirmButtonColor: "#ff4422",
        customClass: {
          popup: "mitr-font-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style scoped>
/* ใช้ CSS ชุดเดียวกับหน้า Login เพื่อคุมธีม */
.register-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.register-card {
  border: none;
}

.register-header {
  background: linear-gradient(135deg, #ff4422 0%, #ff8c5b 100%);
  position: relative;
  overflow: hidden;
}

/* เอฟเฟกต์ตกแต่ง Header */
.register-header::before {
  content: "";
  position: absolute;
  width: 250px;
  height: 250px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -100px;
  left: -50px;
}
.register-header::after {
  content: "";
  position: absolute;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  bottom: -50px;
  right: -20px;
}

.icon-logo {
  font-size: 56px;
  color: white;
  animation: pulse 2s infinite;
}

.btn-gradient {
  background: linear-gradient(90deg, #f53d2d 0%, #ff6e2f 100%) !important;
  color: white !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(245, 61, 45, 0.4);
}

.cursor-pointer {
  cursor: pointer;
}

.hover-icon:hover {
  color: #ff4422 !important;
}

.hover-link:hover {
  text-decoration: underline !important;
}

.opacity-80 {
  opacity: 0.8;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.mitr-font-swal {
  font-family: "Mitr", sans-serif !important;
}
</style>
