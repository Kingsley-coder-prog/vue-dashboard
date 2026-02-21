<template>
  <div
    class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/50"
  >
    <div class="card-body">
      <h2 class="card-title">Recent Orders</h2>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in recentOrders" :key="index">
              <td>{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.date }}</td>
              <td>{{ order.amount }}</td>
              <td>
                <span :class="`badge badge-${getStatusClass(order.status)}`">{{
                  order.status
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-actions justify-end mt-4">
        <button class="btn btn-primary">View All</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const recentOrders = ref([]);

function getStatusClass(status) {
  const statusMap = {
    Delivered: "success",
    Completed: "success",
    Pending: "warning",
    Cancelled: "error",
    Shipped: "info",
  };
  return statusMap[status] || "neutral";
}

onMounted(async () => {
  try {
    const res = await fetch(`${API}/api/recent-orders`);
    if (!res.ok) return;
    const rows = await res.json();
    recentOrders.value = rows.map((r) => ({
      id: `#${r.id}`,
      customer: r.customer_name || r.customer || "-",
      date: r.created_at
        ? new Date(r.created_at).toISOString().slice(0, 10)
        : "-",
      amount: r.price ? `$${Number(r.price).toFixed(2)}` : "-",
      status: r.status || "-",
    }));
  } catch (err) {
    console.error("Failed to load recent orders", err);
  }
});
</script>
