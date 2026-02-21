<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Analytics</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card bg-base-100 p-4 shadow">
        <div class="text-sm text-gray-500">Total Sales</div>
        <div class="text-2xl font-bold">
          {{ analytics.stats?.total_sales ?? "-" }}
        </div>
      </div>
      <div class="card bg-base-100 p-4 shadow">
        <div class="text-sm text-gray-500">Total Orders</div>
        <div class="text-2xl font-bold">
          {{ analytics.stats?.total_orders ?? "-" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";
const analytics = ref({});

onMounted(async () => {
  try {
    const res = await fetch(`${API}/api/analytics`);
    if (!res.ok) return;
    analytics.value = await res.json();
  } catch (err) {
    console.error("Failed to load analytics", err);
  }
});
</script>
