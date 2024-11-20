<template>
  <div class="container mx-auto p-4">
    <!-- Back button -->
    <button
      @click="goBack"
      class="text-blue-600 hover:text-blue-800 font-semibold mb-4"
    >
      ← Quay lại
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <!-- Book cover image -->
      <div class="flex justify-center">
        <img
          :src="
            book.image && book.image.startsWith('http')
              ? book.image
              : book.image
              ? `http://localhost:5000/${book.image.replace(/\\/g, '/')}`
              : ''
          "
          :alt="book.title"
          class="w-full h-[65vh] max-w-sm rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      <!-- Book details -->
      <div class="space-y-6">
        <h1 class="text-4xl font-extrabold text-gray-800 mb-4">
          {{ book.title }}
        </h1>
        <p class="text-lg text-gray-600 mb-2">
          Tác giả:
          <span class="font-semibold text-gray-800">{{ book.author }}</span>
        </p>
        <p class="text-lg text-gray-600 mb-2">
          ISBN:
          <span class="font-semibold text-gray-800">{{ book.isbn }}</span>
        </p>
        <p class="text-lg text-gray-600 mb-2">
          Nhà xuất bản:
          <span class="font-semibold text-gray-800">{{ book.publisher }}</span>
        </p>
        <p class="text-lg text-gray-600 mb-2">
          Ngày xuất bản:
          <span class="font-semibold text-gray-800">{{ formattedDate }}</span>
        </p>
        <p class="text-lg text-gray-600 mb-2">
          Thể loại:
          <span class="font-semibold text-gray-800">{{
            book.categoryId.name
          }}</span>
        </p>
        <p class="text-gray-700 mb-6">{{ book.description }}</p>
        <p class="text-lg font-semibold text-gray-800 mb-2">
          Số lượng còn:
          <span
            :class="{
              'text-red-600': book.availableCopies === 0,
              'text-green-600': book.availableCopies > 0,
            }"
            >{{ book.availableCopies }}</span
          >
        </p>

        <!-- Borrow button -->
        <button
          @click="showConfirmDialog = true"
          :disabled="book.availableCopies === 0"
          class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none transition duration-200"
        >
          Mượn sách
        </button>
      </div>
    </div>
    <!-- Confirmation Dialog -->
    <div
      v-if="showConfirmDialog"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Xác nhận</h2>
        <p class="text-gray-600 mb-6">
          Bạn có chắc chắn muốn mượn sách
          <span class="font-bold">{{ book.title }}</span> không?
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showConfirmDialog = false"
            class="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            @click="confirmBorrowBook"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bookService from "./../services/book.service";
import borrowService from "./../services/borrow.service";

export default {
  name: "BookDetailPage",
  data() {
    return {
      book: {
        id: null,
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        publishedDate: "",
        coverImage: "",
        description: "",
        categoryId: {
          name: "",
        },
        availableCopies: 0,
      },
      showConfirmDialog: false,
    };
  },
  computed: {
    formattedDate() {
      const date = new Date(this.book.publishedDate);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  async mounted() {
    // Lấy thông tin sách từ params (hoặc từ API)
    const bookId = this.$route.params.id; // Giả sử bạn đang truyền `id` qua params
    console.log(bookId);

    try {
      const response = await bookService.getBookById(bookId);
      this.book = response;
    } catch (error) {
      console.error("Không thể lấy dữ liệu sách:", error);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async confirmBorrowBook() {
      if (this.book.availableCopies > 0) {
        try {
          const user = localStorage.getItem("user");
          const userId = JSON.parse(user)._id;
          const response = await borrowService.createBorrowTransaction({
            userId,
            bookId: this.book._id,
          });
          console.log("Giao dịch mượn sách:", response);

          // Cập nhật giao diện
          this.book.availableCopies--;
          alert("Bạn đã mượn sách thành công!");
        } catch (error) {
          console.error("Lỗi khi mượn sách:", error);
          alert("Có lỗi xảy ra khi mượn sách. Vui lòng thử lại.");
        } finally {
          this.showConfirmDialog = false; // Đóng dialog sau khi hoàn thành
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
