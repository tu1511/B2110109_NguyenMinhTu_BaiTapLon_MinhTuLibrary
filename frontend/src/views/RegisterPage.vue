<template>
  <div class="container mx-auto px-6 py-6">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">
      Đăng Ký Tài Khoản
    </h1>

    <div class="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <form @submit.prevent="handleSubmit">
        <!-- Tên người dùng -->
        <div class="mb-4">
          <label for="fullname" class="block text-gray-700 font-semibold">
            Tên Người Dùng
          </label>
          <input
            v-model="form.fullname"
            type="text"
            id="fullname"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên người dùng"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email của bạn"
            required
            :class="{ 'border-red-500': !isEmailValid(form.email) }"
          />
          <span v-if="!isEmailValid(form.email)" class="text-red-500 text-sm"
            >Email không hợp lệ</span
          >
          <span v-if="errorMessage.email" class="text-red-500 text-sm">{{
            errorMessage.email
          }}</span>
        </div>

        <!-- Mật khẩu -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold"
            >Mật Khẩu</label
          >
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu của bạn"
            required
            minlength="6"
          />
        </div>

        <!-- Xác nhận mật khẩu -->
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700 font-semibold"
            >Xác Nhận Mật Khẩu</label
          >
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Xác nhận mật khẩu"
            required
            :class="{
              'border-red-500': form.password !== form.confirmPassword,
            }"
          />
          <span
            v-if="form.password !== form.confirmPassword"
            class="text-red-500 text-sm"
            >Mật khẩu không khớp</span
          >
        </div>

        <!-- Button Đăng ký -->
        <div class="mb-4">
          <button
            type="submit"
            :disabled="
              form.password !== form.confirmPassword ||
              !isEmailValid(form.email)
            "
            class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            Đăng Ký
          </button>
        </div>
      </form>

      <!-- Hiển thị lỗi nếu có -->
      <div v-if="errorMessage.general" class="text-red-500 text-center mt-4">
        {{ errorMessage.general }}
      </div>

      <!-- Đăng nhập nếu đã có tài khoản -->
      <p class="text-center text-gray-600">
        Đã có tài khoản?
        <router-link to="/login" class="text-blue-600 hover:text-blue-500">
          Đăng nhập ngay
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import authService from "./../services/auth.service";

export default {
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage: {
        email: "",
        general: "",
      },
    };
  },
  methods: {
    // Hàm kiểm tra email hợp lệ
    isEmailValid(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },
    async handleSubmit() {
      try {
        const data = {
          fullname: this.form.fullname,
          email: this.form.email,
          password: this.form.password,
          confirmPassword: this.form.confirmPassword,
        };

        // Gọi API đăng ký
        const response = await authService.register(data);

        // Reset form nếu đăng ký thành công
        this.form.fullname = "";
        this.form.email = "";
        this.form.password = "";
        this.form.confirmPassword = "";

        // Hiển thị thông báo thành công
        alert("Đăng ký thành công! Vui lòng đăng nhập.");

        this.$router.push("/login");
      } catch (error) {
        // Hiển thị thông báo lỗi
        if (error.response && error.response.data) {
          this.errorMessage.general =
            error.response.data.message || "Đã có lỗi xảy ra";
          alert(this.errorMessage.general);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Các kiểu tùy chỉnh có thể thêm ở đây */
</style>
