<template>
  <div class="about-us py-16 bg-gray-100">
    <div class="container mx-auto px-4 text-center">
      <!-- Tiêu đề -->
      <h2 class="text-4xl font-semibold text-gray-800 mb-8">Về Chúng Tôi</h2>

      <!-- Mô tả -->
      <p class="text-lg text-gray-600 mb-8">
        Chúng tôi là một đội ngũ nhiệt huyết với mục tiêu cung cấp những sản
        phẩm và dịch vụ tốt nhất cho khách hàng. Với kinh nghiệm nhiều năm trong
        ngành, chúng tôi cam kết mang đến những giải pháp sáng tạo, tiên tiến,
        và thân thiện với người dùng.
      </p>

      <!-- Các giá trị cốt lõi -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="value-item p-6 bg-white rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-blue-600 mb-4">Tận Tâm</h3>
          <p class="text-gray-600">
            Chúng tôi luôn đặt khách hàng lên hàng đầu và cam kết cung cấp các
            giải pháp tối ưu, phục vụ với lòng tận tâm và trách nhiệm.
          </p>
        </div>

        <div class="value-item p-6 bg-white rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-blue-600 mb-4">Sáng Tạo</h3>
          <p class="text-gray-600">
            Đội ngũ của chúng tôi luôn tìm kiếm những giải pháp sáng tạo, giúp
            mang đến những sản phẩm và dịch vụ vượt trội, đáp ứng nhu cầu của
            khách hàng.
          </p>
        </div>

        <div class="value-item p-6 bg-white rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-blue-600 mb-4">Chất Lượng</h3>
          <p class="text-gray-600">
            Chất lượng luôn là yếu tố quan trọng trong mọi quyết định của chúng
            tôi, từ sản phẩm đến dịch vụ, đảm bảo sự hài lòng tuyệt đối cho
            khách hàng.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about-us {
  background-color: #f8fafc;
}
</style>
