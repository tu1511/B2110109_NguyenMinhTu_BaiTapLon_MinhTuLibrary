<template>
  <footer class="bg-gray-800 text-gray-200 pt-8">
    <!-- Grid container -->
    <div class="mx-auto px-8">
      <!-- Section: Social media -->
      <section class="mb-8 text-center">
        <div class="text-lg font-semibold mb-3">Kết nối với chúng tôi qua</div>
        <SocialMediaIcon />
      </section>
      <!-- Section: Social media end -->

      <!-- Section: Links -->
      <section>
        <div class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <!-- Grid column 1 -->

          <div>
            <h6 class="text-xl font-bold mb-4 flex">Minh Tu Library</h6>
            <p class="text-gray-400 leading-relaxed">
              Khám phá thế giới sách phong phú tại Minh Tu Library. Chúng tôi
              cung cấp đa dạng các thể loại sách như Văn học, Khoa học, Kinh tế,
              Tâm lý học, và nhiều hơn nữa. Cùng với các chương trình khuyến mãi
              hấp dẫn và dịch vụ giao hàng tận nơi, Minh Tu Library giúp bạn dễ
              dàng tiếp cận các cuốn sách yêu thích.
            </p>
          </div>
          <!-- Grid column 1 end -->

          <!-- Grid column 2 -->
          <div>
            <h6 class="text-xl font-bold mb-4">Các thể loại sách</h6>
            <ul>
              <li class="mb-2">
                <a href="#" class="text-gray-400 hover:text-white">
                  Sách về Khoa học viễn tưởng</a
                >
              </li>
              <li class="mb-2">
                <a href="#" class="text-gray-400 hover:text-white"
                  >Sách về Lịch sử</a
                >
              </li>
              <li class="mb-2">
                <a href="#" class="text-gray-400 hover:text-white"
                  >Sách về Kỹ năng sống</a
                >
              </li>
              <li class="mb-2">
                <a href="#" class="text-gray-400 hover:text-white"
                  >Sách về học tiếng Anh</a
                >
              </li>
              <li class="mb-2">
                <a href="#" class="text-gray-400 hover:text-white"
                  >Sách về Truyện tranh</a
                >
              </li>
            </ul>
          </div>
          <!-- Grid column 2 end -->

          <!-- Grid column 3 -->
          <div>
            <h6 class="text-xl font-bold mb-4">
              Trách nhiệm của Minh Tu Library
            </h6>
            <p class="text-gray-400 leading-relaxed">
              Minh Tu Library luôn nhận thức rõ trách nhiệm của mình đối với
              cộng đồng và nền tảng tri thức. Chúng tôi cam kết mang đến những
              cuốn sách chất lượng, cập nhật và hữu ích nhất, phục vụ mọi nhu
              cầu học tập, nghiên cứu và giải trí của bạn đọc.
            </p>
          </div>
          <!-- Grid column 3 end -->

          <!-- Grid column 4 -->
          <div>
            <h6 class="text-xl font-bold mb-4">Liên hệ</h6>
            <ul class="space-y-2">
              <li>
                <span class="flex items-center">
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/valentine-day-16/512/683_home_love_heart_wedding_valentine_valentines_day_love-64.png"
                    class="inline-block rounded-full mr-2 h-8 w-8"
                    alt="Location"
                  />
                  Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
                </span>
              </li>
              <li>
                <span class="flex items-center">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/aami-flat-emails/64/email-41-64.png"
                    class="inline-block rounded-full mr-2 h-8 w-8"
                    alt="Email"
                  />
                  tub2110109@student.ctu.edu.vn
                </span>
              </li>
              <li>
                <span class="flex items-center">
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/buno-ui-interface/32/__phone_call-64.png"
                    class="inline-block rounded-full mr-2 h-8 w-8"
                    alt="Phone"
                  />
                  + 0845 969 757
                </span>
              </li>
            </ul>
          </div>
          <!-- Grid column 4 end -->
        </div>
      </section>
      <!-- Section: Links end -->
    </div>
    <!-- Grid container end -->

    <!-- Copyright -->
    <div class="bg-gray-700 text-center py-3 mt-8">
      <p class="text-gray-400">
        © {{ new Date().getFullYear() }} Bản quyền thuộc về:
        <a href="#" class="text-gray-300 hover:text-white">Minh Tu Library</a>
      </p>
    </div>
    <!-- Copyright end -->
  </footer>
</template>

<script>
import SocialMediaIcon from "@/components/SocialMediaIcon.vue";
export default {
  name: "Footer",
  components: {
    SocialMediaIcon,
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
