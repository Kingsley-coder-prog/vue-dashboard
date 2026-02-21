<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title">Settings</h2>
      <div v-if="loaded">
        <form @submit.prevent="save">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label">Site name</label>
              <input v-model="form.site_name" class="input input-bordered" />
            </div>
            <div>
              <label class="label">Items per page</label>
              <input
                v-model.number="form.items_per_page"
                type="number"
                class="input input-bordered"
              />
            </div>
            <div>
              <label class="label">Allow signups</label>
              <select
                v-model="form.allow_signups"
                class="select select-bordered"
              >
                <option :value="true">true</option>
                <option :value="false">false</option>
              </select>
            </div>
          </div>
          <div class="mt-4">
            <button class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";
const settings = ref(null);
const form = ref({ site_name: "", items_per_page: 20, allow_signups: true });
const loaded = ref(false);

const load = async () => {
  try {
    const res = await fetch(`${API}/api/settings`);
    if (!res.ok) return;
    const data = await res.json();
    settings.value = data;
    form.value = {
      site_name: data.site_name || "",
      items_per_page: Number(data.items_per_page) || 20,
      allow_signups:
        data.allow_signups === true || data.allow_signups === "true",
    };
    loaded.value = true;
  } catch (err) {
    console.error("Failed to load settings", err);
  }
};

const save = async () => {
  try {
    const payload = {
      site_name: form.value.site_name,
      items_per_page: String(form.value.items_per_page),
      allow_signups: String(form.value.allow_signups),
    };
    const res = await fetch(`${API}/api/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save settings");
    const updated = await res.json();
    settings.value = updated;
    alert("Settings saved");
  } catch (err) {
    console.error(err);
    alert("Failed to save settings");
  }
};

onMounted(load);
</script>
