<template>
  <div class="login-container">
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12 rounded-xl overflow-hidden login-card">
            <v-row class="fill-height ma-0">
              <v-col
                cols="12"
                class="login-header text-center py-10 white--text"
              >
                <div class="mb-4">
                  <span class="material-symbols-rounded icon-logo"
                    >shopping_bag</span
                  >
                </div>
                <h2 class="text-h4 font-weight-bold mb-2 mitr-font">
                  ยินดีต้อนรับกลับมา!
                </h2>
                <p class="subtitle-1 mitr-font opacity-80">
                  กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
                </p>
              </v-col>

              <v-col cols="12" class="white py-8 px-6 px-md-10">
                <h3
                  class="text-h5 font-weight-bold text-center mb-6 primary--text mitr-font"
                >
                  เข้าสู่ระบบ
                </h3>

                <v-form
                  ref="form"
                  v-model="valid"
                  @submit.prevent="handleLogin"
                >
                  <v-text-field
                    v-model="form.identifier"
                    label="Username, Email หรือ เบอร์โทรศัพท์"
                    outlined
                    dense
                    class="mitr-font rounded-lg"
                    :rules="[(v) => !!v || 'กรุณากรอกข้อมูลระบุตัวตน']"
                    hide-details="auto"
                  >
                    <template v-slot:prepend-inner>
                      <span
                        class="material-symbols-rounded grey--text text--darken-2 mr-2"
                        >person</span
                      >
                    </template>
                  </v-text-field>

                  <div class="my-4"></div>

                  <v-text-field
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    label="รหัสผ่าน"
                    outlined
                    dense
                    class="mitr-font rounded-lg"
                    :rules="[(v) => !!v || 'กรุณากรอกรหัสผ่าน']"
                    hide-details="auto"
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

                  <div class="d-flex justify-end mt-2 mb-6">
                    <a
                      href="#"
                      class="text-caption text-decoration-none grey--text text--darken-1 mitr-font hover-link"
                    >
                      ลืมรหัสผ่าน?
                    </a>
                  </div>

                  <v-btn
                    block
                    x-large
                    color="primary"
                    class="rounded-lg mitr-font btn-gradient elevation-6"
                    type="submit"
                    :loading="loading"
                  >
                    <span class="font-weight-bold text-h6">เข้าสู่ระบบ</span>
                  </v-btn>
                </v-form>

                <div class="text-center mt-6">
                  <span class="grey--text mitr-font text-body-2"
                    >ยังไม่มีบัญชี?
                  </span>
                  <a
                    href="/register"
                    class="primary--text font-weight-bold text-decoration-none mitr-font hover-link"
                  >
                    สมัครสมาชิกเลย
                  </a>
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
  name: "Login",
  data: () => ({
    valid: false,
    loading: false,
    showPassword: false,
    form: {
      identifier: "",
      password: "",
    },
    // ข้อมูล Mockup สำหรับทดสอบ
    mockUser: {
      username: "admin",
      email: "admin@test.com",
      phone: "0812345678",
      password: "password123",
    },
  }),
  methods: {
    handleLogin() {
      // ตรวจสอบความถูกต้องของฟอร์ม
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      // จำลองการดีเลย์ส่งข้อมูล (Network request simulation)
      setTimeout(() => {
        const { identifier, password } = this.form;
        const {
          username,
          email,
          phone,
          password: correctPassword,
        } = this.mockUser;

        // ตรวจสอบว่า identifier ตรงกับ username, email หรือ phone ตัวใดตัวหนึ่งหรือไม่
        const isUserMatch = [username, email, phone].includes(identifier);
        const isPasswordMatch = password === correctPassword;

        if (isUserMatch && isPasswordMatch) {
          // Login สำเร็จ
          this.showSuccessAlert();
        } else {
          // Login ล้มเหลว
          this.showErrorAlert();
          this.loading = false;
        }
      }, 1000);
    },
    showSuccessAlert() {
      Swal.fire({
        icon: "success",
        title: '<span style="font-family: Mitr">เข้าสู่ระบบสำเร็จ!</span>',
        html: '<span style="font-family: Mitr">กำลังนำท่านไปที่หน้า Home...</span>',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#fff",
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          this.$router.push("/");
        },
      });
    },
    showErrorAlert() {
      Swal.fire({
        icon: "error",
        title: '<span style="font-family: Mitr">เข้าสู่ระบบไม่สำเร็จ</span>',
        text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        confirmButtonText: "ลองใหม่อีกครั้ง",
        confirmButtonColor: "#ff4422",
        customClass: {
          popup: "mitr-font-swal", // Class นี้ต้องไปใส่ global หรือ style ไม่ scoped
        },
      });
    },
  },
};
</script>

<style scoped>
/* พื้นหลังไล่เฉดสี */
.login-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* การ์ด Login */
.login-card {
  border: none;
}

/* ส่วนหัวด้านบนของการ์ด */
.login-header {
  background: linear-gradient(135deg, #ff4422 0%, #ff8c5b 100%);
  position: relative;
  overflow: hidden;
}

/* เอฟเฟกต์วงกลมตกแต่ง */
.login-header::before {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -50px;
  right: -50px;
}
.login-header::after {
  content: "";
  position: absolute;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  bottom: -30px;
  left: -30px;
}

.icon-logo {
  font-size: 64px;
  color: white;
  animation: float 3s ease-in-out infinite;
}

/* ปุ่ม Gradient */
.btn-gradient {
  background: linear-gradient(90deg, #f53d2d 0%, #ff6e2f 100%) !important;
  color: white !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(245, 61, 45, 0.4);
}

/* Utility Classes */
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

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* บังคับ Font ใน SweetAlert (ถ้า scoped ไม่ทำงาน อาจต้องย้ายไป App.vue) */
.mitr-font-swal {
  font-family: "Mitr", sans-serif !important;
}
</style>
