<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
  >
    <!-- Hình ảnh sách -->
    <img
      :src="
        book.image.startsWith('http')
          ? book.image
          : `http://localhost:5000/${book.image.replace(/\\/g, '/')}`
      "
      :alt="book.title"
      class="w-full h-60 object-cover"
    />

    <!-- Thông tin sách -->
    <div class="p-4">
      <!-- Tiêu đề sách, hiển thị tối đa 3 dòng -->
      <div class="line-clamp-3 mb-4">
        <h2 class="text-2xl font-semibold text-gray-800 truncate">
          {{ book.title }}
        </h2>
      </div>

      <!-- Thông tin về tác giả -->
      <p class="text-gray-600 text-sm mb-2">
        <span class="font-medium">Tác giả:</span> {{ book.author }}
      </p>

      <!-- Thông tin về loại sách (Danh mục) -->
      <p class="text-gray-600 text-sm mb-2">
        <span class="font-medium">Loại:</span> {{ book.categoryId?.name }}
      </p>

      <!-- Thông tin về nhà xuất bản -->
      <p class="text-gray-600 text-sm mb-4">
        <span class="font-medium">Nhà xuất bản:</span> {{ book.publisher }},
        {{ formatPublishedYear(book.publishedDate) }}
      </p>

      <!-- Nút Xem Chi Tiết -->
      <button
        @click.stop="goToBookDetail"
        class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors ease-in-out duration-300"
      >
        Xem chi tiết
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Chuyển đến trang chi tiết sách
    goToBookDetail() {
      this.$router.push(`/books/${this.book._id}`);
    },
    formatPublishedYear(publishedDate) {
      if (publishedDate) {
        const date = new Date(publishedDate);
        return date.getFullYear(); // Trả về năm
      }
      return "";
    },
    // Thêm sách vào giỏ hàng
    // addToCart() {
    //   this.$emit("add-to-cart", this.book);
    // },

    // Định dạng giá thành tiền
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>

<style scoped>
/* Các style tùy chỉnh nếu cần */
</style>
