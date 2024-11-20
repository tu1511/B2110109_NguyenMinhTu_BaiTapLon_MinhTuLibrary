<template>
  <div class="flex bg-gray-50 gap-6">
    <!-- Sidebar -->
    <div
      class="w-80 bg-blue-500 text-white flex flex-col items-start p-6 space-y-4 rounded-lg"
    >
      <div class="flex-col border-b pb-2 mb-8 w-full text-center">
        <h2 class="text-2xl font-bold border-blue-500">Thông tin cá nhân</h2>
        <span class="text-white cursor-pointer">Thay đổi</span>
      </div>
      <ul class="w-full">
        <li
          v-for="tab in tabs"
          :key="tab.key"
          @click="changeTab(tab.key)"
          :class="{ 'bg-indigo-700': selectedTab === tab.key }"
          class="cursor-pointer text-lg py-3 px-4 rounded-md hover:bg-indigo-500 transition-colors duration-200"
        >
          <span>{{ tab.label }}</span>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8 bg-white rounded-lg shadow-lg">
      <div v-if="selectedTab === 'info'">
        <UserInfo />
      </div>
      <div v-if="selectedTab === 'orders'">
        <OrderList />
      </div>
      <div v-if="selectedTab === 'others'">
        <!-- <OtherInfo /> -->
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "./../components/UserInfo.vue";

import OrderList from "./../components/OrdersList.vue";

export default {
  components: {
    UserInfo,
    OrderList,
  },
  data() {
    return {
      selectedTab: "info",
      tabs: [
        { key: "info", label: "Thông tin" },
        { key: "orders", label: "Đơn hàng" },
        { key: "others", label: "Các mục khác" },
      ],
    };
  },
  methods: {
    changeTab(tabKey) {
      this.selectedTab = tabKey;
    },
  },
};
</script>

<style scoped>
/* Styling improvements */
</style>
