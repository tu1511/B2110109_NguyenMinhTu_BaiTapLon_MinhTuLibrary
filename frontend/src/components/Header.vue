<template>
  <header class="bg-blue-300 text-white shadow-md">
    <div class="container mx-auto flex justify-between items-center py-4 px-6">
      <!-- Logo -->
      <div class="text-2xl font-bold flex items-center">
        <a href="/" class="hover:text-blue-300">
          <img src="./../assets/logo.png" alt="Logo" class="h-20" />
        </a>
        <div class="flex-col justify-center">
          <span> Minh Tu </span> <br /><span>Library</span>
        </div>
      </div>

      <!-- Navigation Links (Desktop) -->
      <nav class="hidden md:flex space-x-10">
        <a
          v-for="(item, index) in navItems"
          :key="index"
          :href="item.link"
          :class="[
            'relative uppercase font-bold text-xl nav-item',
            isActive(item.link) ? 'text-blue-500' : 'hover:text-black',
          ]"
        >
          {{ item.name }}
        </a>

        <!-- Hiển thị thông tin tài khoản nếu có token -->
        <div v-if="userInfo">
          <a href="/profile" class="text-white hover:text-blue-500">
            Xin chào, {{ userInfo.name }}
          </a>
          <button @click="logout" class="text-white hover:text-blue-500 ml-4">
            Đăng xuất
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-white focus:outline-none"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu (Visible when toggled) -->
    <div v-if="isMenuOpen" class="md:hidden bg-blue-700">
      <nav class="flex flex-col items-center space-y-2 py-4">
        <a
          v-for="(item, index) in navItems"
          :key="index"
          :href="item.link"
          class="block text-white hover:text-blue-300"
        >
          {{ item.name }}
        </a>
        <!-- Hiển thị thông tin tài khoản trên mobile nếu có token -->
        <div v-if="userInfo" class="text-white">
          <a href="/profile" class="block">Xin chào, {{ userInfo.name }}</a>
          <button @click="logout" class="block text-white hover:text-blue-500">
            Đăng xuất
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      userInfo: null,
      navItems: [
        { name: "Trang chủ", link: "/home" },
        { name: "Kho sách", link: "/books" },
        { name: "Liên hệ", link: "/contact" },
        { name: "Chính sách", link: "/policy" },
      ],
    };
  },
  created() {
    // Kiểm tra thông tin người dùng và cập nhật menu
    this.checkUser();
  },
  methods: {
    // Đăng xuất
    logout() {
      // Xóa token và thông tin người dùng khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Gọi lại checkUser để cập nhật trạng thái menu
      this.checkUser();

      // Chuyển hướng đến trang đăng nhập
      this.$router.push("/login");
    },

    // Kiểm tra token trong localStorage và cập nhật thông tin người dùng
    checkUser() {
      const token = localStorage.getItem("token");

      if (token) {
        // Nếu có token, lấy thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        // Cập nhật thông tin người dùng với fullname
        this.userInfo = user ? { name: user.fullname } : null;

        // Ẩn các mục Đăng ký và Đăng nhập trong menu, thêm mục Đăng xuất
        this.navItems = this.navItems.filter(
          (item) => item.name !== "Đăng ký" && item.name !== "Đăng nhập"
        );
      } else {
        // Nếu không có token, hiển thị lại các mục Đăng ký và Đăng nhập
        this.userInfo = null;

        // Cập nhật lại menu (ẩn Đăng xuất, thêm Đăng ký và Đăng nhập)
        this.navItems = this.navItems.filter(
          (item) => item.name !== "Đăng xuất"
        );
        this.navItems.push({ name: "Đăng ký", link: "/register" });
        this.navItems.push({ name: "Đăng nhập", link: "/login" });
      }
    },

    // Mở hoặc đóng menu
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    // Kiểm tra xem đường dẫn hiện tại có phải là link đang active không
    isActive(link) {
      return window.location.pathname === link;
    },
  },
};
</script>

<style scoped>
.nav-item {
  position: relative;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.text-blue-500 {
  color: #3b82f6;
}
</style>
