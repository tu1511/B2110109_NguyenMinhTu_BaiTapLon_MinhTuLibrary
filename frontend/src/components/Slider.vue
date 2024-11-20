<template>
  <div class="carousel-container px-6">
    <!-- Carousel Wrapper -->
    <div class="carousel relative w-full mx-auto overflow-hidden">
      <!-- Carousel Track -->
      <div
        class="carousel-track flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="book in featuredBooks"
          :key="book.id"
          class="carousel-item w-full flex-shrink-0"
        >
          <div
            class="relative w-full h-[65vh] overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              :src="book.coverImage"
              alt="Book Cover"
              class="w-full h-full object-cover rounded-lg"
            />
            <!-- Optional overlay text -->
            <div class="absolute bottom-4 left-4 text-white font-bold text-2xl">
              <p>{{ book.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Controls -->
      <div class="absolute top-1/2 left-0 transform -translate-y-1/2 p-4">
        <button
          @click="prevSlide"
          class="text-white bg-black rounded-full p-4 hover:bg-gray-700 transition-all duration-200"
        >
          &#10094;
        </button>
      </div>
      <div class="absolute top-1/2 right-0 transform -translate-y-1/2 p-4">
        <button
          @click="nextSlide"
          class="text-white bg-black rounded-full p-4 hover:bg-gray-700 transition-all duration-200"
        >
          &#10095;
        </button>
      </div>
    </div>

    <!-- Optional Dots Navigation -->
    <div class="flex justify-center mt-4 space-x-2">
      <span
        v-for="(book, index) in featuredBooks"
        :key="book.id"
        @click="goToSlide(index)"
        :class="[
          'w-4 h-4 rounded-full cursor-pointer',
          currentSlide === index ? 'bg-blue-500' : 'bg-gray-300',
        ]"
        class="transition-all duration-200"
      ></span>
    </div>
  </div>
</template>

<script>
// import book1 from "./../assets/banner/1.png";
import book2 from "./../assets/banner/2.png";
import book3 from "./../assets/banner/3.png";
import book4 from "./../assets/banner/4.png";
export default {
  name: "Slider",
  data() {
    return {
      currentSlide: 0, // Track the current slide

      featuredBooks: [
        // {
        //   id: 1,
        //   title: "The Great Gatsby",
        //   coverImage: book1,
        // },
        {
          id: 2,
          title: "1984",
          coverImage: book2,
        },
        {
          id: 3,
          title: "To Kill a Mockingbird",
          coverImage: book3,
        },
        {
          id: 4,
          title: "Pride and Prejudice",
          coverImage: book4,
        },
      ],
    };
  },
  methods: {
    // Move to the next slide
    nextSlide() {
      if (this.currentSlide < this.featuredBooks.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0; // Loop back to the first slide
      }
    },
    // Move to the previous slide
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      } else {
        this.currentSlide = this.featuredBooks.length - 1; // Loop back to the last slide
      }
    },
    // Go to a specific slide
    goToSlide(index) {
      this.currentSlide = index;
    },
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
}

.carousel-item {
  width: 100%;
  display: flex;
  justify-content: center;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.carousel button {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 1rem;
  font-size: 2rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.carousel button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel .carousel-item {
  transition: transform 0.5s ease-in-out;
}

.carousel button:focus {
  outline: none;
}

.carousel .carousel-item img {
  border-radius: 16px;
}

.carousel .carousel-controls {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}

.carousel .carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.carousel .carousel-dots span {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel .carousel-dots span:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel .carousel-dots .active {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
