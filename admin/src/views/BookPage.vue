<template>
  <div class="container p-4">
    <h2 class="text-2xl font-bold mb-6">Danh sách sách</h2>
    <div class="flex justify-between">
      <!-- Input tìm kiếm -->
      <div class="mb-4">
        <label for="search" class="text-gray-700 font-medium mr-4"
          >Tìm kiếm:</label
        >
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Tìm kiếm theo tên sách..."
          class="p-2 border border-gray-300 rounded-md w-[20vw]"
        />
      </div>
      <!-- Nút thêm sách -->
      <button
        @click="openAddBookModal"
        class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Thêm sách
      </button>
    </div>

    <!-- Bảng danh sách sách -->
    <table class="min-w-full bg-white rounded-lg shadow-lg">
      <thead class="bg-blue-500 text-white">
        <tr>
          <th class="py-3 px-6 text-left">#</th>
          <th class="py-3 px-6 text-left">Hình ảnh</th>
          <th class="py-3 px-6 text-left">Tiêu đề</th>
          <th class="py-3 px-6 text-left">ISBN</th>
          <th class="py-3 px-6 text-left">Ngày xuất bản</th>
          <th class="py-3 px-6 text-left">Số lượng</th>
          <th class="py-3 px-6 text-left">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(book, index) in pagedBooks"
          :key="book._id"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="py-4 px-6">
            {{ index + 1 + (currentPage - 1) * booksPerPage }}
          </td>
          <td class="py-4 px-6">
            <img
              :src="formatImageUrl(book.image)"
              alt="Book Image"
              class="w-16 h-16 object-cover"
            />
          </td>
          <td class="py-4 px-6">{{ book.title || "Không có dữ liệu" }}</td>
          <td class="py-4 px-6">{{ book.isbn || "Chưa cập nhật" }}</td>
          <td class="py-4 px-6">
            {{ formatDate(book.publishedDate) || "Chưa cập nhật" }}
          </td>
          <td class="py-4 px-6">{{ book.availableCopies || 0 }}</td>
          <td class="py-4 px-6">
            <button
              @click="openEditBookModal(book)"
              class="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-600"
            >
              Cập nhật
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <div class="flex justify-between items-center mt-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-80"
      >
        Trang trước
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-80"
      >
        Trang sau
      </button>
    </div>

    <!-- Modal Thêm/Cập nhật sách -->
    <div
      v-if="showBookForm"
      class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-[60vw]">
        <h2 class="text-xl font-bold mb-4">
          {{ isEditing ? "Cập nhật Sách" : "Thêm Sách" }}
        </h2>

        <form @submit.prevent="isEditing ? updateBook() : addBook()">
          <div class="flex justify-between gap-10">
            <div class="flex-1">
              <div class="mb-4">
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700"
                  >Tiêu đề</label
                >
                <input
                  type="text"
                  id="title"
                  v-model="currentBook.title"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="author"
                  class="block text-sm font-medium text-gray-700"
                  >Tác giả</label
                >
                <input
                  type="text"
                  id="author"
                  v-model="currentBook.author"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="isbn"
                  class="block text-sm font-medium text-gray-700"
                  >ISBN</label
                >
                <input
                  type="text"
                  id="isbn"
                  v-model="currentBook.isbn"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="category"
                  class="block text-sm font-medium text-gray-700"
                  >Thể loại
                </label>
                <select
                  id="category"
                  v-model="currentBook.categoryId"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                >
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex-1">
              <div class="mb-4">
                <label
                  for="publishedDate"
                  class="block text-sm font-medium text-gray-700"
                  >Ngày xuất bản</label
                >
                <input
                  type="date"
                  id="publishedDate"
                  v-model="currentBook.publishedDate"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <!-- Trường Publisher -->
              <div class="mb-4">
                <label
                  for="publisher"
                  class="block text-sm font-medium text-gray-700"
                  >Nhà xuất bản</label
                >
                <input
                  type="text"
                  id="publisher"
                  v-model="currentBook.publisher"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <!-- Trường Available Copies -->
              <div class="mb-4">
                <label
                  for="availableCopies"
                  class="block text-sm font-medium text-gray-700"
                  >Số lượng còn lại</label
                >
                <input
                  type="number"
                  id="availableCopies"
                  v-model="currentBook.availableCopies"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="totalCopies"
                  class="block text-sm font-medium text-gray-700"
                  >Số lượng</label
                >
                <input
                  type="number"
                  id="totalCopies"
                  v-model="currentBook.availableCopies"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  for="image"
                  class="block text-sm font-medium text-gray-700"
                  >Hình ảnh</label
                >
                <input
                  type="file"
                  id="image"
                  @change="onImageChange"
                  class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {{ isEditing ? "Cập nhật" : "Thêm" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from "./../services/book.service";
import categoryService from "./../services/category.service";

export default {
  data() {
    return {
      books: [],
      showBookForm: false,
      isEditing: false,
      currentBook: {
        title: "",
        author: "",
        isbn: "",
        categoryId: "",
        publisher: "",
        publishedDate: "",
        totalCopies: 0,
        availableCopies: 0,
        image: null,
      },
      categories: [],
      searchQuery: "",
      currentPage: 1, // Trang hiện tại
      booksPerPage: 5, // Số sách trên mỗi trang
    };
  },
  computed: {
    // Lọc sách theo tên dựa trên searchQuery
    filteredBooks() {
      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    // Phân trang: Trả về các sách của trang hiện tại
    pagedBooks() {
      const startIndex = (this.currentPage - 1) * this.booksPerPage;
      const endIndex = startIndex + this.booksPerPage;
      return this.filteredBooks.slice(startIndex, endIndex);
    },
    // Tính tổng số trang
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    },
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await BookService.getAllBooks();
        this.books = response;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await categoryService.getAll();
        this.categories = response || [];
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", options);
    },
    formatImageUrl(imagePath) {
      return imagePath && imagePath.startsWith("http")
        ? imagePath
        : `http://localhost:5000/${imagePath.replace(/\\/g, "/")}`;
    },
    openAddBookModal() {
      this.isEditing = false;
      this.resetCurrentBook();
      this.showBookForm = true;
    },
    openEditBookModal(book) {
      this.isEditing = true;
      this.currentBook = { ...book };
      if (this.currentBook.publishedDate) {
        this.currentBook.publishedDate =
          this.currentBook.publishedDate.split("T")[0]; // Chỉ lấy phần `YYYY-MM-DD`
      }
      this.showBookForm = true;
    },
    closeModal() {
      this.showBookForm = false;
      this.resetCurrentBook();
    },
    resetCurrentBook() {
      this.currentBook = {
        title: "",
        author: "",
        isbn: "",
        categoryId: "",
        publishedDate: "",
        totalCopies: 0,
        image: null,
      };
    },
    onImageChange(event) {
      const file = event.target.files[0];
      this.currentBook.image = file;
    },
    async addBook() {
      try {
        const formData = new FormData();
        for (let key in this.currentBook) {
          formData.append(key, this.currentBook[key]);
        }
        await BookService.addBook(formData);
        this.closeModal();
        this.fetchBooks();
      } catch (error) {
        console.error("Error adding book: ", error);
      }
    },
    async updateBook() {
      try {
        const formData = new FormData();
        for (let key in this.currentBook) {
          formData.append(key, this.currentBook[key]);
        }
        await BookService.updateBook(this.currentBook._id, formData);
        this.closeModal();
        this.fetchBooks();
      } catch (error) {
        console.error("Error updating book: ", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted() {
    this.fetchBooks();
    this.fetchCategories();
  },
};
</script>

<style>
/* Add styles here */
</style>
