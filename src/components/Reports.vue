<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Reports (Recent Orders)</h2>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reports" :key="r.id">
            <td>{{ r.id }}</td>
            <td>{{ r.customer_name }}</td>
            <td>{{ r.product }}</td>
            <td>{{ r.price ? `$${Number(r.price).toFixed(2)}` : "-" }}</td>
            <td>{{ r.status }}</td>
            <td>
              {{ r.created_at ? new Date(r.created_at).toLocaleString() : "-" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";
const reports = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(`${API}/api/reports`);
    if (!res.ok) return;
    reports.value = await res.json();
  } catch (err) {
    console.error("Failed to load reports", err);
  }
});
</script>
