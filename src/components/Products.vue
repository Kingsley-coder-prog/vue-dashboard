<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <h2 class="card-title">Products</h2>
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
              v-model.number="form.price"
              type="number"
              step="0.01"
              placeholder="Price"
              class="input input-bordered"
            />
            <input
              v-model.number="form.stock"
              type="number"
              placeholder="Stock"
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
        </form>
      </div>

      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in products" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.name }}</td>
              <td>{{ p.price ? `$${Number(p.price).toFixed(2)}` : "-" }}</td>
              <td>{{ p.stock ?? "-" }}</td>
              <td>
                {{
                  p.created_at ? new Date(p.created_at).toLocaleString() : "-"
                }}
              </td>
              <td>
                <button class="btn btn-sm btn-ghost" @click="startEdit(p)">
                  Edit
                </button>
                <button class="btn btn-sm btn-error" @click="remove(p.id)">
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
const products = ref([]);
const form = ref({ name: "", price: null, stock: 0 });
const editId = ref(null);

const load = async () => {
  try {
    const res = await fetch(`${API}/api/products`);
    if (!res.ok) return;
    products.value = await res.json();
  } catch (err) {
    console.error("Failed to load products", err);
  }
};

const resetForm = () => {
  form.value = { name: "", price: null, stock: 0 };
  editId.value = null;
};

const createOrUpdate = async () => {
  try {
    if (editId.value) {
      const res = await fetch(`${API}/api/products/${editId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      });
      if (!res.ok) throw new Error("Failed to update");
    } else {
      const res = await fetch(`${API}/api/products`, {
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

const startEdit = (p) => {
  editId.value = p.id;
  form.value = {
    name: p.name,
    price: p.price ? Number(p.price) : null,
    stock: p.stock || 0,
  };
};

const remove = async (id) => {
  if (!confirm("Delete product?")) return;
  try {
    const res = await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    await load();
  } catch (err) {
    console.error(err);
  }
};

onMounted(load);
</script>
