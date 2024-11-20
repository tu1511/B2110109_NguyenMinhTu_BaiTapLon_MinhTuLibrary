<template>
  <div class="app bg-gray-100 min-h-screen">
    <!-- Header -->
    <Navbar />

    <!-- Main Content -->
    <main class="container mx-auto py-8 px-4">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
/* Đảm bảo Footer luôn ở dưới */
.flex {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.flex-1 {
  flex: 1;
}

footer {
  margin-top: auto; /* Đảm bảo Footer luôn ở dưới */
}
</style>
