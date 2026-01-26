<template>
  <div
    class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20 mb-6"
  >
    <h2 class="text-lg font-semibold mb-4">Product Performance by Region</h2>
    <Bar
      :data="stackedBarData"
      :options="stackedBarOptions"
      class="max-h-[400px]"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const stackedBarData = ref({
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "North",
      data: [3200, 2900, 4200, 5100],
      backgroundColor: "#4635B1",
      stack: "Region",
    },
    {
      label: "South",
      data: [2400, 2900, 4200, 4600],
      backgroundColor: "#ECE852",
      stack: "Region",
    },
    {
      label: "East",
      data: [2400, 2900, 4200, 4600],
      backgroundColor: "#EB2561",
      stack: "Region",
    },
    {
      label: "West",
      data: [3100, 2900, 4200, 3500],
      backgroundColor: "#FFA24C",
      stack: "Region",
    },
  ],
});

const stackedBarOptions = ref({
  responsive: true,
  maintainAspectRation: false,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      position: "top",
      labels: {
        color: "#64748b",
        boxWidth: 12,
        padding: 16,
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        afterLabel: function (context) {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((context.raw / total) * 100);
          return `Contribution: ${percentage}%`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748b",
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "rgba(0,0,0,0.05)",
      },
      ticks: {
        color: "#64748b",
        callbacks: function (value) {
          return "$" + value.toLocaleString();
        },
      },
    },
  },
});
</script>

