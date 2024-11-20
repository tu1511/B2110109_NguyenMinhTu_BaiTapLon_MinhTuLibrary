<template>
  <footer class="bg-gray-800 text-gray-200">
    <!-- Copyright -->
    <div class="bg-gray-700 text-center py-3">
      <p class="text-gray-400">
        © {{ new Date().getFullYear() }} Bản quyền thuộc về:
        <a href="#" class="text-gray-300 hover:text-white">Minh Tu Library</a>
      </p>
    </div>
    <!-- Copyright end -->
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {},
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
