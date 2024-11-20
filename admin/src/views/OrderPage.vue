<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Danh sách đơn hàng</h2>

    <!-- Kiểm tra trạng thái tải dữ liệu -->
    <div v-if="loading" class="text-gray-500">
      Đang tải danh sách đơn hàng...
    </div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div class="flex justify-between">
      <!-- Tìm kiếm -->
      <div class="mb-4 flex items-center">
        <label for="search" class="text-gray-700 font-medium mr-4"
          >Tìm kiếm:</label
        >
        <input
          id="search"
          v-model="searchQuery"
          @input="searchOrders"
          class="border border-gray-300 rounded-lg py-2 px-4"
          placeholder="Nhập tên người mượn, tên sách hoặc mã đơn hàng"
        />
      </div>

      <!-- Bộ lọc trạng thái -->
      <div class="mb-6 flex justify-between">
        <div class=""></div>
        <div class="flex items-center">
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
    </div>

    <!-- Bảng danh sách đơn hàng -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-lg">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="py-3 px-6 text-left">#</th>
            <th class="py-3 px-6 text-left">Người mượn</th>
            <th class="py-3 px-6 text-left">Tên sách</th>
            <th class="py-3 px-6 text-left">Ngày mượn</th>
            <th class="py-3 px-6 text-left">Hạn trả</th>
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
              {{ order.userId?.fullname || "Không có dữ liệu" }}
            </td>
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
            <td class="py-4 px-6">
              {{
                order.returnedDate
                  ? formatDate(order.returnedDate)
                  : "Chưa cập nhật"
              }}
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
              <div
                v-if="
                  order.status !== 'returned' && order.status !== 'cancelled'
                "
              >
                <!-- Dropdown để thay đổi trạng thái -->
                <select
                  v-model="order.status"
                  @change="handleStatusChange(order)"
                  class="bg-white border border-gray-300 py-1 px-4 rounded-lg text-sm"
                >
                  <option value="processing">Đang xử lý</option>
                  <option value="borrowed">Đang mượn</option>
                  <option value="returned">Đã trả</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
              <div v-else>
                <span
                  class="bg-gray-200 text-gray-800 py-1 px-4 rounded-lg text-sm"
                >
                  Đã xử lý
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Phân trang -->
    <div class="mt-6 flex justify-between items-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Trước
      </button>
      <span class="text-gray-700">Trang {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage * itemsPerPage >= filteredOrders.length"
        class="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Sau
      </button>
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
      searchQuery: "", // Chuỗi tìm kiếm
      currentPage: 1, // Trang hiện tại
      itemsPerPage: 5, // Số đơn hàng mỗi trang
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
    searchOrders() {
      this.filteredOrders = this.orders.filter((order) => {
        const searchQuery = this.searchQuery.toLowerCase();
        return (
          order.userId?.fullname.toLowerCase().includes(searchQuery) ||
          order.bookId?.title.toLowerCase().includes(searchQuery) ||
          order._id.toLowerCase().includes(searchQuery)
        );
      });
      this.paginateOrders(); // Sau khi tìm kiếm, phân trang lại
    },
    // Phân trang đơn hàng
    paginateOrders() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedOrders = this.filteredOrders.slice(startIndex, endIndex); // Phân trang trên filteredOrders
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
    // Lấy danh sách đơn hàng
    async fetchOrdersByUser() {
      try {
        const response = await borrowService.getAllBorrowTransactions();
        console.log(response);
        this.orders = response;
        this.filteredOrders = response; // Gán giá trị ban đầu
      } catch (error) {
        this.error = "Lỗi khi lấy danh sách đơn hàng: " + error.message;
      } finally {
        this.loading = false;
      }
    },
    // Cập nhật trạng thái mượn sách
    async borrowBook(orderId) {
      try {
        await borrowService.borrowBook(orderId); // API mượn sách
        alert("Cập nhật trạng thái thành công!");
        this.fetchOrdersByUser();
      } catch (error) {
        alert("Lỗi khi cập nhật trạng thái: " + error.message);
      }
    },
    // Cập nhật trạng thái trả sách
    async returnBook(orderId) {
      try {
        await borrowService.updateReturnTransaction(orderId); // API trả sách
        alert("Cập nhật trạng thái thành công!");
        this.fetchOrdersByUser();
      } catch (error) {
        alert("Lỗi khi cập nhật trạng thái: " + error.message);
      }
    },
    // Cập nhật trạng thái hủy đơn hàng
    async cancelOrder(orderId) {
      try {
        await borrowService.cancelBorrowTransaction(orderId); // API hủy đơn hàng
        alert("Đã hủy giao dịch thành công!");
        this.fetchOrdersByUser();
      } catch (error) {
        alert("Lỗi khi hủy giao dịch: " + error.message);
      }
    },
    // Xử lý thay đổi trạng thái
    async handleStatusChange(order) {
      if (order.status === "borrowed") {
        this.borrowBook(order._id);
      } else if (order.status === "cancelled") {
        this.cancelOrder(order._id);
      } else if (order.status === "returned") {
        this.returnBook(order._id);
      }
      this.filterOrders(); // Lọc lại đơn hàng sau khi thay đổi trạng thái
      this.paginateOrders(); // Phân trang lại
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
      this.paginateOrders(); // Sau khi lọc, phân trang lại
    },
    // Chuyển sang trang tiếp theo
    nextPage() {
      this.currentPage++;
      this.paginateOrders();
    },
    // Chuyển sang trang trước
    prevPage() {
      this.currentPage--;
      this.paginateOrders();
    },
    // Chuyển tới trang cụ thể
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.paginateOrders();
    },
  },
  mounted() {
    this.fetchOrdersByUser();
  },
};
</script>
