<template>
  <div class="bg-blue-500 text-white">
    <!-- Navbar -->
    <div class="flex items-center justify-between p-2 border-b border-blue-700">
      <div class="flex items-center">
        <a href="/" class="hover:text-blue-300">
          <img src="./../assets/logo.png" alt="Logo" class="h-20" />
        </a>
        <h1 class="text-2xl font-bold">Minh Tu Library</h1>
      </div>

      <!-- Navigation Links -->
      <nav class="flex space-x-6">
        <ul class="flex space-x-6">
          <li
            v-for="item in menuItems"
            :key="item.id"
            @click="navigateTo(item.route)"
            class="flex items-center px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-800"
            :class="{ 'bg-blue-700': isActive(item.route) }"
          >
            <span class="text-lg mr-4">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </nav>

      <!-- Login/Logout Button -->
      <span v-if="isLoggedIn">Xin chào, {{ userInfo.name }}</span>

      <div class="ml-4">
        <button
          @click="handleAuth"
          class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          {{ isLoggedIn ? "Đăng xuất" : "Đăng nhập" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: null,
      menuItems: [
        { id: 1, name: "Dashboard", route: "/home", icon: "📊" },
        { id: 2, name: "Người Dùng", route: "/users", icon: "👥" },
        { id: 3, name: "Sản Phẩm", route: "/products", icon: "🛒" },
        { id: 4, name: "Đơn Hàng", route: "/orders", icon: "📦" },
        // { id: 5, name: "Báo Cáo", route: "/reports", icon: "📋" },
      ],
      currentRoute: "/home",
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    navigateTo(route) {
      this.currentRoute = route; // Đặt route hiện tại
      this.$router.push(route); // Điều hướng đến route
    },
    checkUser() {
      const token = localStorage.getItem("token");

      if (token) {
        const user = JSON.parse(localStorage.getItem("user"));
        this.userInfo = user ? { name: user.fullname } : null;
        this.isLoggedIn = true;
      } else {
        this.userInfo = null;
        this.isLoggedIn = false;
      }
    },
    isActive(route) {
      return this.currentRoute === route;
    },
    handleAuth() {
      if (this.isLoggedIn) {
        this.handleLogout();
      } else {
        this.handleLogin();
      }
    },
    handleLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Navbar styles */
nav ul {
  display: flex;
  gap: 24px;
}

nav ul li {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav ul li:hover {
  background-color: #2b6cb0;
}

nav ul li.bg-blue-700 {
  background-color: #2c5282;
}

button {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #e53e3e;
}

button:focus {
  outline: none;
}
</style>
