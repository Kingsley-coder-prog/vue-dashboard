<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title">Messages</h2>

      <div class="mb-4">
        <form @submit.prevent="createOrUpdate">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              v-model="form.sender"
              type="text"
              placeholder="Sender"
              class="input input-bordered"
            />
            <input
              v-model="form.subject"
              type="text"
              placeholder="Subject"
              class="input input-bordered"
            />
            <div class="flex gap-2">
              <button class="btn btn-primary" type="submit">
                {{ editId ? "Update" : "Create" }}
              </button>
              <button class="btn" type="button" @click="resetForm">
                Clear
              </button>
            </div>
          </div>
          <textarea
            v-model="form.body"
            class="textarea textarea-bordered mt-2"
            placeholder="Message body"
          ></textarea>
        </form>
      </div>

      <ul class="menu p-2">
        <li v-for="m in messages" :key="m.id" class="p-2 border-b">
          <div class="flex justify-between">
            <div>
              <div class="font-semibold">{{ m.subject }}</div>
              <div class="text-sm text-gray-600">
                {{ m.sender }} ·
                {{
                  m.created_at ? new Date(m.created_at).toLocaleString() : ""
                }}
              </div>
              <div class="mt-1">{{ m.body }}</div>
            </div>
            <div class="flex flex-col gap-2">
              <button class="btn btn-sm btn-ghost" @click="startEdit(m)">
                Edit
              </button>
              <button class="btn btn-sm btn-error" @click="remove(m.id)">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";
const messages = ref([]);
const form = ref({ sender: "", subject: "", body: "" });
const editId = ref(null);

const load = async () => {
  try {
    const res = await fetch(`${API}/api/messages`);
    if (!res.ok) return;
    messages.value = await res.json();
  } catch (err) {
    console.error("Failed to load messages", err);
  }
};

const resetForm = () => {
  form.value = { sender: "", subject: "", body: "" };
  editId.value = null;
};

const createOrUpdate = async () => {
  try {
    if (editId.value) {
      const res = await fetch(`${API}/api/messages/${editId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      });
      if (!res.ok) throw new Error("Failed to update");
    } else {
      const res = await fetch(`${API}/api/messages`, {
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

const startEdit = (m) => {
  editId.value = m.id;
  form.value = { sender: m.sender, subject: m.subject, body: m.body };
};

const remove = async (id) => {
  if (!confirm("Delete message?")) return;
  try {
    const res = await fetch(`${API}/api/messages/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    await load();
  } catch (err) {
    console.error(err);
  }
};

onMounted(load);
</script>
