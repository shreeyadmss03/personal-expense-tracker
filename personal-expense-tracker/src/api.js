// All HTTP calls to the JSON Server backend live here.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const api = {
  list: (resource) => request(`/${resource}`),                                              // READ
  create: (resource, data) => request(`/${resource}`, { method: "POST", body: JSON.stringify(data) }), // CREATE
  update: (resource, id, data) => request(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }), // UPDATE
  remove: (resource, id) => request(`/${resource}/${id}`, { method: "DELETE" }),            // DELETE
};
