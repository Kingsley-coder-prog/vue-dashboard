<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <div
      v-for="(stat, index) in statsData"
      :key="index"
      class="stats bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20"
    >
      <div class="stat">
        <div class="stat-title">{{ stat.title }}</div>
        <div class="stat-value">{{ stat.value }}</div>
        <div
          class="stat-desc"
          :class="{
            'text-green-500': isPositiveChange(stat.desc),
            'text-red-500': !isPositiveChange(stat.desc),
          }"
        >
          {{ stat.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const statsData = ref([
  { title: "Total Sales", value: "-", desc: "" },
  { title: "Total Orders", value: "-", desc: "" },
  { title: "Total Customers", value: "-", desc: "" },
  { title: "Active Projects", value: "-", desc: "" },
]);

const isPositiveChange = (desc) => {
  return desc && desc.includes("↗");
};

onMounted(async () => {
  try {
    const res = await fetch(`${API}/api/stats`);
    if (!res.ok) return;
    const data = await res.json();
    statsData.value = [
      {
        title: "Total Sales",
        value: data.total_sales
          ? `$${Number(data.total_sales).toLocaleString()}`
          : "$0",
        desc: data.revenue_change
          ? `${data.revenue_change >= 0 ? "↗" : "↘"} ${Math.abs(
              Number(data.revenue_change)
            ).toFixed(1)}% from last month`
          : "",
      },
      {
        title: "Total Orders",
        value: data.total_orders ? `${data.total_orders}` : "0",
        desc: data.orders_change
          ? `${data.orders_change >= 0 ? "↗" : "↘"} ${Math.abs(
              Number(data.orders_change)
            ).toFixed(1)}% from last month`
          : "",
      },
      {
        title: "Total Customers",
        value: data.total_customers ? `${data.total_customers}` : "0",
        desc: data.customers_change
          ? `${data.customers_change >= 0 ? "↗" : "↘"} ${Math.abs(
              Number(data.customers_change)
            ).toFixed(1)}% from last month`
          : "",
      },
      {
        title: "Active Projects",
        value: "—",
        desc: "",
      },
    ];
  } catch (err) {
    console.error("Failed to load stats", err);
  }
});
</script>

<style>
</style>