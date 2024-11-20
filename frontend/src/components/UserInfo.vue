<template>
  <div class="container mx-auto px-4 py-8">
    <div
      class="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      <h1 class="text-4xl font-bold text-center text-indigo-600 mb-8">
        Thông tin người dùng
      </h1>

      <!-- Hiển thị thông tin người dùng -->
      <div
        class="mb-6 flex justify-between items-center space-x-4 border-b pb-4"
      >
        <label class="block text-lg font-medium text-gray-700 w-1/4"
          >Tên người dùng:</label
        >
        <p class="text-xl text-gray-900 w-3/4">
          {{ userInfo?.fullname || "Chưa có thông tin" }}
        </p>
      </div>

      <div
        class="mb-6 flex justify-between items-center space-x-4 border-b pb-4"
      >
        <label class="block text-lg font-medium text-gray-700 w-1/4"
          >Email:</label
        >
        <p class="text-xl text-gray-900 w-3/4">
          {{ userInfo?.email || "Chưa có thông tin" }}
        </p>
      </div>

      <div
        class="mb-6 flex justify-between items-center space-x-4 border-b pb-4"
      >
        <label class="block text-lg font-medium text-gray-700 w-1/4"
          >Vai trò:</label
        >
        <p class="text-xl text-gray-900 w-3/4">
          {{ getStatusLabel(userInfo?.role || "Chưa có thông tin") }}
        </p>
      </div>

      <div class="mb-6 flex justify-between items-center space-x-4">
        <label class="block text-lg font-medium text-gray-700 w-1/4"
          >Ngày tham gia:</label
        >
        <p class="text-xl text-gray-900 w-3/4">
          {{ formatDate(userInfo?.createdAt) || "Chưa có thông tin" }}
        </p>
      </div>

      <!-- Button Đăng xuất -->
      <!-- <div class="mt-8 flex justify-center">
        <button
          class="bg-red-500 text-white py-2 px-6 rounded-full text-lg font-semibold transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          @click="logout"
        >
          Đăng xuất
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("user")) || null, // Lấy thông tin người dùng từ localStorage
    };
  },
  methods: {
    // Hàm xử lý đăng xuất
    // logout() {
    //   // Xóa token và thông tin người dùng khỏi localStorage
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");

    //   // Chuyển hướng đến trang đăng nhập
    //   this.$router.push("/login");
    // },
    getStatusLabel(status) {
      switch (status) {
        case "user":
          return "Người dùng";
        case "admin":
          return "Quản trị viên";
        default:
          return "Không xác định";
      }
    },
    // Hàm định dạng ngày tham gia
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.bg-white {
  background-color: #fff;
}

.text-indigo-600 {
  color: #4f46e5;
}

.text-gray-700 {
  color: #374151;
}

.text-gray-900 {
  color: #1f2937;
}

button {
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #f87171;
}

.border-b {
  border-bottom: 1px solid #e5e7eb;
}
</style>
