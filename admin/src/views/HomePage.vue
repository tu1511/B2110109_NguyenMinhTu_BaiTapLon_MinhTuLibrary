<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <h1 class="text-4xl font-bold text-blue-600 mb-8 text-center">
      Quản Trị Thư Viện
    </h1>

    <!-- Statistics Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Books -->
      <div
        class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
      >
        <h2 class="text-xl font-semibold text-gray-700">Số Lượng Sách</h2>
        <p class="text-4xl font-bold text-blue-600">{{ stats.books }}</p>
      </div>

      <!-- Users -->
      <div
        class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
      >
        <h2 class="text-xl font-semibold text-gray-700">Số Lượng Người Đọc</h2>
        <p class="text-4xl font-bold text-green-600">{{ stats.users }}</p>
      </div>

      <!-- Orders -->
      <div
        class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
      >
        <h2 class="text-xl font-semibold text-gray-700">Số Lượng Đơn Hàng</h2>
        <p class="text-4xl font-bold text-purple-600">{{ stats.orders }}</p>
      </div>
    </div>

    <!-- Recent Orders Section -->
    <div class="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h3 class="text-2xl font-semibold text-gray-700 mb-6">
        Đơn Hàng Gần Đây
      </h3>
      <ul class="divide-y divide-gray-200">
        <li
          v-for="order in orders"
          :key="order.id"
          class="py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div>
            <p class="text-sm text-gray-600">Mã Đơn: {{ order._id }}</p>
            <p class="text-sm font-semibold">{{ order.userId?.fullname }}</p>
          </div>
          <span class="text-sm font-medium text-blue-500">
            {{ order.bookId?.title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Import UserService
import UserService from "./../services/user.service";
import borrowService from "../services/borrow.service";

export default {
  data() {
    return {
      stats: {
        books: 0, // Số lượng sách
        users: 0, // Số lượng người đọc (sẽ cập nhật sau khi fetch)
        orders: 0, // Số lượng đơn hàng
      },
      orders: [],
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },

  methods: {
    async fetchStatsUser() {
      try {
        // Lấy số lượng người dùng từ service
        const userCount = await UserService.countUsers();

        this.stats.users = userCount; // Cập nhật vào stats
      } catch (error) {
        console.error("Failed to fetch user count:", error);
        this.stats.users = 0; // Nếu có lỗi, gán mặc định là 0
      }
    },
    async fetchStatsBook() {
      try {
        // Lấy số lượng sách từ service
        const bookCount = await UserService.countBooks();

        this.stats.books = bookCount; // Cập nhật vào stats
      } catch (error) {
        console.error("Failed to fetch book count:", error);
        this.stats.books = 0; // Nếu có lỗi, gán mặc định là 0
      }
    },
    async fetchStatsOrder() {
      try {
        // Lấy số lượng đơn hàng từ service
        const orderCount = await UserService.countOrders();

        this.stats.orders = orderCount; // Cập nhật vào stats
      } catch (error) {
        console.error("Failed to fetch order count:", error);
        this.stats.orders = 0; // Nếu có lỗi, gán mặc định là 0
      }
    },
    async fetchOrdersByUser() {
      try {
        const response = await borrowService.getAllBorrowTransactions();

        this.orders = response;
      } catch (error) {
        this.error = "Lỗi khi lấy danh sách đơn hàng: " + error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchStatsUser();
    this.fetchStatsBook();
    this.fetchStatsOrder();
    this.fetchOrdersByUser();
  },
};
</script>

<style scoped>
/* Custom styles */
</style>
