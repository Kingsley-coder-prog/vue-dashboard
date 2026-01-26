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
import { ref } from "vue";

const recentActivities = ref([
  { type: "User login", time: "10:30AM", icon: "check" },
  { type: "New Order", time: "10:30AM", icon: "check" },
  { type: "System update", time: "10:30AM", icon: "check" },
  { type: "User login", time: "10:30AM", icon: "check" },
  { type: "User login", time: "10:30AM", icon: "check" },
]);
</script>

