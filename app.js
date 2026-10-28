const STORAGE_KEY = "simple-crm-customers-v1";
const starterCustomers = [
  {id: crypto.randomUUID(), name:"Priya Sharma", company:"Bright Solutions", email:"priya@example.com", phone:"+91 98765 43210", status:"Active", notes:"Existing customer"},
  {id: crypto.randomUUID(), name:"Arun Kumar", company:"AK Traders", email:"arun@example.com", phone:"+91 91234 56780", status:"Lead", notes:"Interested in a product demo"},
  {id: crypto.randomUUID(), name:"Meena Raj", company:"Green Leaf Co.", email:"meena@example.com", phone:"+91 99887 76655", status:"Follow-up", notes:"Call next week"}
];
let customers = loadCustomers();

const rows = document.getElementById("customerRows");
const dialog = document.getElementById("customerDialog");
const form = document.getElementById("customerForm");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function loadCustomers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return JSON.parse(saved);
  } catch (error) { console.warn("Could not read local CRM data.", error); }
  return starterCustomers;
}
function saveCustomers() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(customers)); }
  catch (error) { alert("Could not save data in this browser. Check storage settings."); }
}
function escapeHTML(value="") {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function render() {
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const filtered = customers.filter(c => {
    const matches = [c.name,c.company,c.email,c.phone].some(v => (v || "").toLowerCase().includes(query));
    return matches && (status === "all" || c.status === status);
  });
  rows.innerHTML = filtered.map(c => `
    <tr>
      <td><span class="person">${escapeHTML(c.name)}</span>${c.notes ? `<span class="subtext">${escapeHTML(c.notes)}</span>` : ""}</td>
      <td>${escapeHTML(c.company || "—")}</td><td>${escapeHTML(c.email || "—")}</td>
      <td>${escapeHTML(c.phone || "—")}</td><td><span class="pill ${escapeHTML(c.status)}">${escapeHTML(c.status)}</span></td>
      <td><div class="row-actions"><button class="edit-btn" data-edit="${escapeHTML(c.id)}">Edit</button><button class="delete-btn" data-delete="${escapeHTML(c.id)}">Delete</button></div></td>
    </tr>`).join("");
  document.getElementById("emptyMessage").hidden = filtered.length !== 0;
  document.getElementById("totalCount").textContent = customers.length;
  document.getElementById("leadCount").textContent = customers.filter(c => c.status === "Lead").length;
  document.getElementById("followCount").textContent = customers.filter(c => c.status === "Follow-up").length;
}
function openAdd() {
  form.reset();
  document.getElementById("customerId").value = "";
  document.getElementById("dialogTitle").textContent = "Add customer";
  dialog.showModal();
}
function openEdit(id) {
  const c = customers.find(item => item.id === id);
  if (!c) return;
  document.getElementById("customerId").value = c.id;
  for (const key of ["name","company","email","phone","status","notes"]) document.getElementById(key).value = c[key] || "";
  document.getElementById("dialogTitle").textContent = "Edit customer";
  dialog.showModal();
}
document.getElementById("addCustomerBtn").addEventListener("click", openAdd);
document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
document.getElementById("cancelBtn").addEventListener("click", () => dialog.close());
searchInput.addEventListener("input", render);
statusFilter.addEventListener("change", render);
rows.addEventListener("click", event => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;
  if (editId) openEdit(editId);
  if (deleteId) {
    const c = customers.find(item => item.id === deleteId);
    if (c && confirm(`Delete ${c.name} from this browser's CRM list?`)) {
      customers = customers.filter(item => item.id !== deleteId);
      saveCustomers(); render();
    }
  }
});
form.addEventListener("submit", event => {
  event.preventDefault();
  const id = document.getElementById("customerId").value;
  const customer = {
    id: id || crypto.randomUUID(),
    name: document.getElementById("name").value.trim(),
    company: document.getElementById("company").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    status: document.getElementById("status").value,
    notes: document.getElementById("notes").value.trim()
  };
  if (!customer.name) return;
  if (id) customers = customers.map(c => c.id === id ? customer : c);
  else customers.unshift(customer);
  saveCustomers(); render(); dialog.close();
});
render();
