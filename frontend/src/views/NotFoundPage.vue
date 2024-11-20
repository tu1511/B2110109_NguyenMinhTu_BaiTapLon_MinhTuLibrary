<template>
  <div
    class="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 text-gray-800"
  >
    <!-- Icon hoặc hình ảnh 404 -->
    <div class="text-9xl font-bold text-blue-500">404</div>

    <!-- Thông báo -->
    <h1 class="text-3xl md:text-4xl font-semibold mt-4">Trang không tồn tại</h1>
    <p class="text-lg mt-2 mb-8 text-center px-4">
      Xin lỗi, trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
    </p>

    <!-- Nút quay về trang chủ -->
    <router-link
      to="/"
      class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
    >
      Quay về trang chủ
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
/* Nếu cần thêm style tùy chỉnh */
</style>
