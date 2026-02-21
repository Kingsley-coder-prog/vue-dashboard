<template>
  <div>
    <StatsCards />
    <Charts />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <RecentOrders class="lg:col-span-2" />
      <RecentActivity />
    </div>
    <StackedBarChart class="mt-6" />
  </div>
</template>

<script setup>
import StatsCards from "./StatsCards.vue";
import Charts from "./Charts.vue";
import RecentOrders from "./RecentOrders.vue";
import RecentActivity from "./RecentActivity.vue";
import StackedBarChart from "./StackedBarChart.vue";
</script>
