<template>
  <div class="homepage">
    <!-- Banner Section -->
    <Slider />

    <!-- Latest Books Section -->
    <section class="p-4 bg-gray-100">
      <h2
        class="text-4xl font-semibold text-center text-gray-800 mb-2 uppercase"
      >
        Sách mới nhất
      </h2>
      <div class="flex justify-between py-2">
        <div class=""></div>
        <div
          class="text-white bg-blue-300 p-2 border-2 rounded-xl cursor-pointer hover:bg-blue-400 transition duration-200"
          @click="goToBookPage"
        >
          Xem thêm
        </div>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <BookItem
          v-for="book in books.slice(0, 4)"
          :key="book.id"
          :book="book"
          class="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>
    </section>

    <AboutUs />

    <!-- Fun GIF Section -->
    <section class="text-center py-12 bg-gray-100">
      <h3 class="text-4xl font-bold text-gray-800 mb-6">
        Khám Phá & Thưởng Thức
      </h3>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Tại LibraryApp, chúng tôi tin rằng việc đọc sách sẽ trở nên thú vị hơn
        bao giờ hết!
      </p>
      <img
        src="https://media.giphy.com/media/xUOwGk9Z0Z8f4CX3xW/giphy.gif"
        alt="Reading Fun GIF"
        class="mx-auto rounded-lg shadow-xl"
      />
    </section>
  </div>
</template>

<script>
// Import Banner component
import Slider from "../components/Slider.vue";
import AboutUs from "../components/AboutUs.vue";
import bookService from "../services/book.service";
import BookItem from "../components/BookItem.vue";

export default {
  name: "HomePage",
  components: {
    Slider,
    AboutUs,
    BookItem,
  },
  data() {
    return {
      // Sample latest books data
      books: [],
    };
  },
  methods: {
    goToBookPage() {
      this.$router.push({ name: "BooksPage" });
    },
    goToBookDetail() {
      this.$router.push(`/books/${this.book._id}`);
    },
    async fetchBooks() {
      try {
        const response = await bookService.getAllBooks();
        this.books = response;
        console.log(response);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
/* No custom CSS needed, as Tailwind CSS classes are used for styling */
</style>
