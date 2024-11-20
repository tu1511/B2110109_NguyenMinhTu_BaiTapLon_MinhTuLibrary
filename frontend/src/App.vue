<template>
  <div class="app bg-gray-100 min-h-screen">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="container mx-auto py-8 px-4">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
/* Nếu cần thêm style toàn cục cho ứng dụng */
</style>
