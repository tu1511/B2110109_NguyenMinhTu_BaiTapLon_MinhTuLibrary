<template>
  <div class="mx-auto p-3">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">
      Liên Hệ Với Chúng Tôi
    </h1>

    <div class="flex gap-8 justify-center">
      <!-- Form Liên Hệ -->
      <div class="w-full bg-white p-8 shadow-lg rounded-lg">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="block text-gray-700 font-semibold"
              >Họ và Tên</label
            >
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập họ tên"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="block text-gray-700 font-semibold"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div class="mb-3">
            <label for="phone" class="block text-gray-700 font-semibold"
              >Số Điện Thoại</label
            >
            <input
              v-model="form.phone"
              type="tel"
              id="phone"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số điện thoại của bạn"
              required
            />
          </div>

          <div class="mb-3">
            <label for="message" class="block text-gray-700 font-semibold"
              >Tin Nhắn</label
            >
            <textarea
              v-model="form.message"
              id="message"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Nhập tin nhắn của bạn"
              required
            ></textarea>
          </div>

          <div class="mb-4">
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Gửi Tin Nhắn
            </button>
          </div>
        </form>
      </div>

      <!-- Bản Đồ -->
      <div class="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184425216!2d105.76803500992727!3d10.029933690035627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1731917287847!5m2!1svi!2s"
          width="700"
          height="520"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      // Xử lý khi người dùng gửi form
      console.log("Form submitted:", this.form);

      // Reset form
      this.form.name = "";
      this.form.email = "";
      this.form.phone = "";
      this.form.message = "";

      alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
