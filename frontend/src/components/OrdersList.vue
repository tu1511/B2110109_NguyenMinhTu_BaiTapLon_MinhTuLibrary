<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Danh sách đơn hàng</h2>

    <!-- Kiểm tra trạng thái tải dữ liệu -->
    <div v-if="loading" class="text-gray-500">
      Đang tải danh sách đơn hàng...
    </div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <!-- Bộ lọc trạng thái -->
    <div v-else class="mb-6 flex justify-between">
      <div class=""></div>
      <div class="">
        <label for="status-filter" class="text-gray-700 font-medium mr-4"
          >Lọc theo trạng thái:</label
        >
        <select
          id="status-filter"
          v-model="selectedStatus"
          class="border border-gray-300 rounded-lg py-2 px-4"
          @change="filterOrders"
        >
          <option value="">Tất cả</option>
          <option value="processing">Đang xử lý</option>
          <option value="borrowed">Đang mượn</option>
          <option value="returned">Đã trả</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>
    </div>

    <!-- Bảng danh sách đơn hàng -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-lg">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="py-3 px-6 text-left">#</th>
            <th class="py-3 px-6 text-left">Tên sách</th>
            <th class="py-3 px-6 text-left">Ngày mượn</th>
            <th class="py-3 px-6 text-left">Ngày trả</th>
            <th class="py-3 px-6 text-center">Trạng thái</th>
            <th class="py-3 px-6 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, index) in filteredOrders"
            :key="order._id"
            class="hover:bg-gray-100 transition-colors duration-200"
          >
            <td class="py-4 px-6">{{ index + 1 }}</td>
            <td class="py-4 px-6">
              {{ order.bookId?.title || "Không có dữ liệu" }}
            </td>
            <td class="py-4 px-6">
              {{
                order.borrowedDate
                  ? formatDate(order.borrowedDate)
                  : "Chưa cập nhật"
              }}
            </td>
            <td class="py-4 px-6">
              {{ order.dueDate ? formatDate(order.dueDate) : "Chưa cập nhật" }}
            </td>
            <td class="py-4 px-6 text-center">
              <span
                :class="getStatusClass(order.status)"
                class="py-1 px-3 rounded-lg text-sm"
              >
                {{ getStatusLabel(order.status) }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <button
                v-if="order.status === 'processing'"
                @click="cancelOrder(order._id)"
                class="bg-red-500 text-white py-1 px-4 rounded-lg text-sm hover:bg-red-600"
              >
                Hủy
              </button>
              <button
                v-else
                disabled
                class="bg-gray-300 text-gray-500 py-1 px-4 rounded-lg text-sm cursor-not-allowed"
              >
                Không thể hủy
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import borrowService from "../services/borrow.service";

export default {
  data() {
    return {
      orders: [], // Danh sách đơn hàng
      filteredOrders: [], // Danh sách đơn hàng sau khi lọc
      loading: true, // Trạng thái tải dữ liệu
      error: null, // Thông báo lỗi
      selectedStatus: "", // Trạng thái được chọn để lọc
    };
  },
  methods: {
    // Định dạng ngày
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    // Lấy class CSS theo trạng thái
    getStatusClass(status) {
      switch (status) {
        case "processing":
          return "bg-yellow-200 text-yellow-800";
        case "borrowed":
          return "bg-blue-200 text-blue-800";
        case "returned":
          return "bg-green-200 text-green-800";
        case "cancelled":
          return "bg-red-200 text-red-800";
        default:
          return "bg-gray-200 text-gray-800";
      }
    },
    // Lấy nhãn theo trạng thái
    getStatusLabel(status) {
      switch (status) {
        case "processing":
          return "Đang xử lý";
        case "borrowed":
          return "Đang mượn";
        case "returned":
          return "Đã trả";
        case "cancelled":
          return "Đã hủy";
        default:
          return "Không xác định";
      }
    },
    // Lấy danh sách đơn hàng theo user
    async fetchOrdersByUser() {
      this.loading = true;
      this.error = null;
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

      if (!user || !user._id) {
        this.error = "Không tìm thấy thông tin người dùng.";
        this.loading = false;
        return;
      }

      try {
        const response = await borrowService.getBorrowTransactionsByUser(
          user._id
        );
        this.orders = response;
        this.filteredOrders = response; // Gán giá trị ban đầu
      } catch (error) {
        this.error = "Lỗi khi lấy danh sách đơn hàng: " + error.message;
      } finally {
        this.loading = false;
      }
    },
    // Hủy đơn hàng
    async cancelOrder(transactionId) {
      try {
        await borrowService.cancelBorrowTransaction(transactionId);
        alert("Đã hủy giao dịch thành công!");
        this.fetchOrdersByUser(); // Cập nhật lại danh sách
      } catch (error) {
        alert("Lỗi khi hủy giao dịch: " + error.message);
      }
    },
    // Lọc đơn hàng theo trạng thái
    filterOrders() {
      if (this.selectedStatus) {
        this.filteredOrders = this.orders.filter(
          (order) => order.status === this.selectedStatus
        );
      } else {
        this.filteredOrders = this.orders;
      }
    },
  },
  mounted() {
    this.fetchOrdersByUser();
  },
};
</script>

<style scoped>
/* Tùy chỉnh khoảng cách và font */
table {
  border-collapse: collapse;
}
th {
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}
td {
  font-size: 0.9rem;
}
</style>
