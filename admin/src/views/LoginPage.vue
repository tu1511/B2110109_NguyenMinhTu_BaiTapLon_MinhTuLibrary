<template>
  <div class="flex items-center justify-center min-h-[80vh] bg-gray-100">
    <!-- Form đăng nhập -->
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <!-- Tiêu đề -->
      <h2 class="text-2xl font-semibold text-center text-blue-600 mb-6">
        Đăng Nhập
      </h2>

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Nhập Email"
            required
          />
        </div>

        <!-- Mật khẩu -->
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <!-- Nút đăng nhập -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Đăng Nhập
        </button>

        <!-- Thông báo lỗi -->
        <div v-if="errorMessage" class="text-red-500 text-center mt-4">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authService from "../services/auth.service";

export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        this.errorMessage = "Vui lòng nhập đầy đủ email và mật khẩu.";
        return;
      }

      try {
        const loginData = {
          email: this.email,
          password: this.password,
        };

        // Gọi service login
        const response = await authService.login(loginData);

        // Kiểm tra kết quả trả về
        if (response.token && response.user) {
          // Lưu token và thông tin người dùng vào localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));

          this.$router.push("/"); // Chuyển hướng tới trang chủ
        } else {
          this.errorMessage = "Đăng nhập thất bại, vui lòng thử lại!";
        }
      } catch (error) {
        this.errorMessage = "Đăng nhập thất bại, vui lòng thử lại!";
      }
    },
  },
};
</script>

<style scoped>
/* Đảm bảo input có màu chữ và nền rõ ràng */
input {
  color: black;
  background-color: white;
}
</style>
