<template>
  <div class="container mx-auto py-4">
    <!-- Tiêu đề -->
    <!-- <h1 class="text-3xl font-bold text-center text-blue-600 mb-10">Kho Sách</h1> -->

    <!-- Thanh công cụ tìm kiếm và bộ lọc -->
    <div
      class="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4"
    >
      <!-- Tìm kiếm -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm sách..."
        class="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
      />

      <!-- Lọc theo loại -->
      <select
        v-model="selectedCategory"
        class="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/4"
      >
        <option value="">Tất cả loại</option>
        <option
          v-for="category in categories"
          :key="category._id"
          :value="category._id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div v-if="filteredBooks.length > 0">
      <!-- Danh sách sách -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <BookItem
          v-for="book in paginatedBooks"
          :key="book._id"
          :book="book"
          @add-to-cart="handleAddToCart"
        />
      </div>

      <!-- Điều hướng phân trang -->
      <div class="flex justify-center items-center mt-8 space-x-4">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Tiếp
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Không tìm thấy sách phù hợp.
    </div>
  </div>
</template>

<script>
import BookItem from "@/components/BookItem.vue";
import categoryService from "./../services/category.service";
import bookService from "./../services/book.service";

export default {
  name: "BooksPage",
  components: {
    BookItem,
  },
  data() {
    return {
      // Danh sách sách mẫu
      books: [],
      // Biến để lưu dữ liệu tìm kiếm và lọc
      searchQuery: "",
      selectedCategory: "",
      // Danh sách các loại sách (categories)
      categories: [],
      // Phân trang
      currentPage: 1,
      booksPerPage: 8, // Số lượng sách trên mỗi trang
    };
  },
  computed: {
    // Lọc các sách dựa trên tìm kiếm và loại sách
    filteredBooks() {
      return this.books.filter((book) => {
        const matchesSearch = book.title
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        const matchesCategory =
          this.selectedCategory === "" ||
          (book.categoryId && book.categoryId._id === this.selectedCategory); // So sánh `_id`

        return matchesSearch && matchesCategory;
      });
    },
    // Phân trang sách

    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.booksPerPage;
      const endIndex = startIndex + this.booksPerPage;
      return this.filteredBooks.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    },
  },
  methods: {
    // Hàm thêm sách vào giỏ hàng
    handleAddToCart(book) {
      alert(`Thêm "${book.title}" vào giỏ hàng thành công!`);
    },
    // Định dạng giá thành tiền VND
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    goToBookDetail(bookId) {
      this.$router.push({ name: "BookDetailPage", params: { id: bookId } });
    },
    // Gọi API để lấy danh sách loại sách
    async fetchCategories() {
      try {
        const response = await categoryService.getAll();
        this.categories = response || [];
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    },
    async fetchBooks() {
      try {
        const response = await bookService.getAllBooks();
        this.books = response || [];
        console.log(response);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchBooks();
  },
};
</script>

<style scoped>
/* Các style bổ sung nếu cần */
</style>
