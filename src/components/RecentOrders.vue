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
import { ref } from "vue";

const recentOrders = ref([
  {
    id: "#12345",
    customer: "John Doe",
    date: "2026-01-26",
    status: "Completed",
  },
  {
    id: "#12345",
    customer: "John Doe",
    date: "2026-01-26",
    status: "Completed",
  },
  {
    id: "#12345",
    customer: "John Doe",
    date: "2026-01-26",
    status: "Completed",
  },
  {
    id: "#12345",
    customer: "John Doe",
    date: "2026-01-26",
    status: "Completed",
  },
  {
    id: "#12345",
    customer: "John Doe",
    date: "2026-01-26",
    status: "Completed",
  },
]);

function getStatusClass(status) {
  const statusMap = {
    Completed: "success",
    Pending: "warning",
    Cancelled: "error",
  };
  return statusMap[status] || "neutral";
}
</script>
