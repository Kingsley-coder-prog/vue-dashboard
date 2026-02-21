<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <!-- Animated Revenue Line Chart -->
    <div
      class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20"
    >
      <h2 class="text-lg font-semibold mb-4">Monthly Revenue</h2>
      <Line
        :data="revenueChartData"
        :options="LineChartOptions"
        class="max-h-[300px]"
        :key="lineChartKey"
      />
    </div>

    <!-- Animated Doughnut Chart -->
    <div
      class="bg-base-100 p-6 rounded-xl shadow-md dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20"
    >
      <h2 class="text-lg font-semibold mb-4">Revenue Sources</h2>
      <Doughnut
        :data="doughnutChartData"
        :options="doughnutChartOptions"
        class="max-h-[300px]"
        :key="doughnutChartKey"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Doughnut, Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  plugins,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);
const lineChartKey = ref(0);
const doughnutChartKey = ref(0);

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const revenueChartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [12000, 1900, 3000, 5000, 20000, 3000],
      fill: false,
      borderColor: "#E82561",
      backgroundColor: "#E82561",
      tension: 0.4,
    },
  ],
});

const doughnutChartData = ref({
  labels: ["Products", "Services", "Subscription", "Consulting"],
  datasets: [
    {
      data: [35, 25, 20, 20],
      backgroundColor: ["#4635B1", "#E82561", "#ECE852", "#FFA24C"],
      borderWidth: 0,
      hoverOffset: 10,
    },
  ],
});

const LineChartOptions = ref({
  responsive: true,
  maintainAspectRation: false,
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 1,
      to: 0,
      loop: false,
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#64748b",
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(0,0,0,0.1)",
      },
      ticks: {
        color: "#64748b",
      },
    },
    y: {
      grid: {
        color: "rgba(0,0,0,0.1)",
      },
      ticks: {
        color: "#64748b",
      },
    },
  },
});

const doughnutChartOptions = ref({
  responsive: true,
  maintainAspectRation: false,
  cutout: "70%",
  animations: {
    duration: 1000,
    easing: "easeOutQuart",
    animateScale: true,
    animateRotate: true,
  },
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "#64748b",
        boxWidth: 12,
        padding: 16,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.raw}%`;
        },
      },
    },
  },
});
onMounted(() => {
  // Trigger re-render to start animation
  lineChartKey.value++;
  doughnutChartKey.value++;

  (async () => {
    try {
      const res = await fetch(`${API}/api/charts`);
      if (!res.ok) return;
      const rows = await res.json();
      if (!Array.isArray(rows) || rows.length === 0) return;
      revenueChartData.value.labels = rows.map((r) => r.label);
      revenueChartData.value.datasets[0].data = rows.map((r) =>
        Number(r.value)
      );
      lineChartKey.value++;
    } catch (err) {
      console.error("Failed to load chart data", err);
    }
  })();
});
</script>

<style>
</style>