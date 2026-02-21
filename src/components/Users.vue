<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title">Users</h2>
      <div class="mb-4">
        <form @submit.prevent="createOrUpdate">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
            <input
              v-model="form.name"
              type="text"
              placeholder="Name"
              class="input input-bordered"
            />
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              class="input input-bordered"
            />
            <select v-model="form.role" class="select select-bordered">
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <div class="flex gap-2">
              <button class="btn btn-primary" type="submit">
                {{ editId ? "Update" : "Create" }}
              </button>
              <button class="btn" type="button" @click="resetForm">
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.id }}</td>
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.role }}</td>
              <td>
                {{
                  u.created_at ? new Date(u.created_at).toLocaleString() : "-"
                }}
              </td>
              <td>
                <button class="btn btn-sm btn-ghost" @click="startEdit(u)">
                  Edit
                </button>
                <button class="btn btn-sm btn-error" @click="remove(u.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";
const users = ref([]);
const form = ref({ name: "", email: "", role: "user" });
const editId = ref(null);

const load = async () => {
  try {
    const res = await fetch(`${API}/api/users`);
    if (!res.ok) return;
    users.value = await res.json();
  } catch (err) {
    console.error("Failed to load users", err);
  }
};

const resetForm = () => {
  form.value = { name: "", email: "", role: "user" };
  editId.value = null;
};

const createOrUpdate = async () => {
  try {
    if (editId.value) {
      const res = await fetch(`${API}/api/users/${editId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      });
      if (!res.ok) throw new Error("Failed to update");
    } else {
      const res = await fetch(`${API}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      });
      if (!res.ok) throw new Error("Failed to create");
    }
    await load();
    resetForm();
  } catch (err) {
    console.error(err);
  }
};

const startEdit = (u) => {
  editId.value = u.id;
  form.value = { name: u.name, email: u.email, role: u.role || "user" };
};

const remove = async (id) => {
  if (!confirm("Delete user?")) return;
  try {
    const res = await fetch(`${API}/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    await load();
  } catch (err) {
    console.error(err);
  }
};

onMounted(load);
</script>
