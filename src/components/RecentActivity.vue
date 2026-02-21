<template>
  <div
    class="card bg-base-100 shadow dark:bg-white/5 dark:backdrop-blur-md dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/20"
  >
    <div class="card-body">
      <h2 class="card-title">Recent Activity</h2>
      <ul class="timeline timeline-vertical">
        <li v-for="(activity, index) in recentActivities" :key="index">
          <template v-if="index % 2 === 0">
            <div
              class="timeline-start timeline-box bg-white dark:bg-backgroundDark"
            >
              {{ activity.type }}
            </div>
            <div class="timeline-middle">
              <Icon
                icon="line-md:circle-filled-to-confirm-circle-filled-transition"
                class="w-5 h-5 text-primary"
              />
            </div>
            <hr class="bg-primary" />
          </template>
          <template v-else>
            <hr class="bg-primary" />
            <div class="timeline-middle">
              <Icon
                icon="line-md:circle-filled-to-confirm-circle-filled-transition"
                class="w-5 h-5 text-primary"
              />
            </div>
            <div
              class="timeline-end timeline-box bg-white dark:bg-backgroundDark"
            >
              {{ activity.type }}
            </div>
            <hr class="bg-primary" />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const recentActivities = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(`${API}/api/recent-activity`);
    if (!res.ok) return;
    const rows = await res.json();
    recentActivities.value = rows.map((r) => ({
      type: r.description || r.type || "Activity",
      time: r.created_at ? new Date(r.created_at).toLocaleString() : "",
    }));
  } catch (err) {
    console.error("Failed to load recent activity", err);
  }
});
</script>

