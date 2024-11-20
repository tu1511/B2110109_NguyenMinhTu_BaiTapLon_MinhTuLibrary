<template>
  <div class="overflow-x-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Quản lý người dùng</h1>
    <div class="flex justify-between">
      <!-- Tìm kiếm tên người dùng -->
      <div class="mb-4 flex items-center gap-4">
        <label for="search" class="text-gray-700 font-medium mr-4"
          >Tìm kiếm:</label
        >
        <input
          type="text"
          id="searchInput"
          v-model="searchQuery"
          @input="filterUsers"
          placeholder="Nhập tên người dùng"
          class="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <!-- Dropdown lọc vai trò -->
      <div class="mb-4 flex items-center gap-4">
        <label for="roleFilter" class="font-semibold">Lọc theo vai trò:</label>
        <select
          id="roleFilter"
          v-model="selectedRole"
          @change="filterUsers"
          class="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Tất cả</option>
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>
    </div>

    <!-- Bảng danh sách người dùng -->
    <table class="min-w-full bg-white rounded-lg shadow-lg">
      <thead class="bg-blue-500 text-white">
        <tr>
          <th class="py-3 px-6 text-left">#</th>
          <th class="py-3 px-6 text-left">Tên người dùng</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-left">Ngày tạo</th>
          <th class="py-3 px-6 text-center">Vai trò</th>
          <th class="py-3 px-6 text-center">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in paginatedUsers"
          :key="user._id"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="py-4 px-6">
            {{ index + 1 + (currentPage - 1) * pageSize }}
          </td>
          <td class="py-4 px-6">{{ user.fullname || "Không có dữ liệu" }}</td>
          <td class="py-4 px-6">{{ user.email || "Chưa cập nhật" }}</td>
          <td class="py-4 px-6">
            {{ user.createdAt ? formatDate(user.createdAt) : "Chưa cập nhật" }}
          </td>
          <td class="py-4 px-6 text-center">{{ getStatusLabel(user.role) }}</td>
          <td class="py-4 px-6 text-center">
            <button
              class="bg-blue-200 text-blue-800 py-1 px-4 rounded-lg text-sm hover:bg-blue-300"
              @click="viewDetails(user._id)"
            >
              Chi tiết
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <div class="flex justify-between items-center mt-4">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="bg-blue-500 text-white py-1 px-4 rounded-lg mr-2"
      >
        Trang trước
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="bg-blue-500 text-white py-1 px-4 rounded-lg"
      >
        Trang sau
      </button>
    </div>

    <!-- Modal chi tiết người dùng -->
    <div
      v-if="selectedUser"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-1/2 shadow-lg relative">
        <!-- Nút đóng -->
        <button
          class="absolute top-5 right-5 text-gray-500 hover:text-gray-700 text-2xl"
          @click="closeModal"
        >
          ✕
        </button>

        <h2 class="text-2xl font-bold mb-6 text-center">
          Thông tin người dùng
        </h2>

        <div class="space-y-4">
          <!-- Thông tin người dùng -->
          <p>
            <strong class="font-semibold text-gray-700">Tên: </strong>
            <span class="text-gray-900">{{ selectedUser?.fullname }}</span>
          </p>
          <p>
            <strong class="font-semibold text-gray-700">Email: </strong>
            <span class="text-gray-900">{{ selectedUser.email }}</span>
          </p>
          <p>
            <strong class="font-semibold text-gray-700">Ngày tạo: </strong>
            <span class="text-gray-900">
              {{ formatDate(selectedUser.createdAt) }}
            </span>
          </p>

          <!-- Vai trò (dropdown thay đổi vai trò tạm thời) -->
          <div>
            <label
              for="roleSelect"
              class="block font-semibold text-gray-700 mb-2"
              >Vai trò:</label
            >
            <select
              id="roleSelect"
              v-model="updatedRole"
              class="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
        </div>

        <!-- Nút cập nhật vai trò -->
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg mt-6 block mx-auto"
          @click="updateUserRole"
        >
          Cập nhật
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "./../services/user.service";

export default {
  name: "UserPage",
  data() {
    return {
      users: [], // Danh sách tất cả người dùng
      filteredUsers: [], // Danh sách người dùng sau khi lọc
      selectedUser: null, // Người dùng được chọn
      selectedRole: "", // Vai trò được chọn để lọc
      updatedRole: "", // Vai trò tạm thời khi thay đổi trong dropdown
      searchQuery: "", // Tìm kiếm tên người dùng
      currentPage: 1, // Trang hiện tại
      pageSize: 5, // Số lượng người dùng hiển thị mỗi trang
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await UserService.getUsers();
        this.users = response.users;
        this.filteredUsers = this.users; // Khởi tạo danh sách đã lọc
      } catch (error) {
        console.error("Không thể lấy danh sách người dùng:", error);
      }
    },
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
    filterUsers() {
      const searchQuery = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter((user) => {
        const matchesRole =
          !this.selectedRole || user.role === this.selectedRole;
        const matchesSearch =
          user.fullname.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery);
        return matchesRole && matchesSearch;
      });
      this.currentPage = 1; // Reset trang về 1 khi thay đổi lọc
    },
    viewDetails(userId) {
      this.selectedUser = this.users.find((user) => user._id === userId);
      this.updatedRole = this.selectedUser.role; // Gán vai trò hiện tại vào updatedRole khi mở modal
    },
    async updateUserRole() {
      try {
        // Cập nhật vai trò chính thức cho người dùng
        await UserService.updateUserRole(this.selectedUser._id, {
          role: this.updatedRole,
        });
        this.selectedUser.role = this.updatedRole; // Cập nhật vai trò trong danh sách người dùng
        alert("Cập nhật vai trò thành công!");
        this.closeModal();
      } catch (error) {
        console.error("Cập nhật vai trò thất bại:", error);
        alert("Cập nhật vai trò thất bại");
      }
    },
    closeModal() {
      this.selectedUser = null; // Đóng modal
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("vi-VN", options);
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
