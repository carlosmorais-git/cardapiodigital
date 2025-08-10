const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const money = (n) => BRL.format(n);
const el = (id) => document.getElementById(id);

const TABS = CATALOG.map((c) => c.category);

// Estado
const cart = [];
let activeTab = TABS[0];

// ===========================
// Tabs + scroll to top
// ===========================
const tabsEl = el("tabs");
function renderTabs() {
  tabsEl.innerHTML = TABS.map(
    (t) =>
      `<button class="tab ${
        t === activeTab ? "active" : ""
      }" onclick="setTab('${t}')">${t}</button>`
  ).join("");
}
window.setTab = (t) => {
  activeTab = t;
  renderTabs();
  renderProducts();
  // rolagem suave para o topo ao mudar de aba
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ===========================
// Produtos (com animação)
// ===========================
const productListEl = el("productList");
function renderProducts() {
  const cat = CATALOG.find((c) => c.category === activeTab);
  const items = cat?.items || [];
  productListEl.innerHTML = items
    .map((p, idx) => {
      const hasVariants = !!p.variants;
      const price = hasVariants ? p.variants[0].price : p.price;
      // const tag = hasVariants ? p.variants.map((v) => v.label).join(" / ") : "";
      // <div class="product-thumb" aria-hidden="true">${
      //           tag || "ITEM"
      //         }</div>
      return `
            <article class="product-card reveal" style="animation-delay:${
              idx * 70
            }ms" data-id="${p.id}">
            
              

              <div class="product-body">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
              </div>
              <div style="display:grid;gap:8px;justify-items:end">
                <div class="price">${money(price)}</div>
                <button class="btn btn-add" onclick="chooseItem('${
                  p.id
                }')">Escolher</button>
              </div>
            </article>`;
    })
    .join("");
}

// ===========================
// Modal de item
// ===========================
const modal = el("itemModal");
const mTitle = el("mTitle"),
  mDesc = el("mDesc"),
  mVariantsBox = el("mVariantsBox"),
  mVariants = el("mVariants"),
  mAddonsBox = el("mAddonsBox"),
  mAddons = el("mAddons"),
  mQty = el("mQty"),
  mNote = el("mNote"),
  mTotal = el("mTotal");
let currentItem = null;

window.chooseItem = (id) => {
  const cat = CATALOG.find((c) => c.category === activeTab);
  const p = cat.items.find((i) => i.id === id);
  if (!p) return;
  currentItem = {
    product: p,
    variant: p.variants ? p.variants[0] : null,
    addons: new Set(),
    qty: 1,
    note: "",
  };
  mTitle.textContent = p.name;
  mDesc.textContent = p.desc;

  if (p.variants) {
    mVariantsBox.hidden = false;
    mVariants.innerHTML = p.variants
      .map(
        (v) =>
          `<button class="chip ${
            v.id === currentItem.variant.id ? "active" : ""
          }" data-id="${v.id}" onclick="selectVariant('${v.id}')">${
            v.label
          } — ${money(v.price)}</button>`
      )
      .join("");
  } else {
    mVariantsBox.hidden = true;
    mVariants.innerHTML = "";
  }

  const a = p.addons || [];
  if (a.length) {
    mAddonsBox.hidden = false;
    mAddons.innerHTML = a
      .map(
        (opt) => `
            <div class="addon">
              <span>${opt.label}</span>
              <div style="display:flex;gap:10px;align-items:center">
                <span>${money(opt.price)}</span>
                <input type="checkbox" data-id="${
                  opt.id
                }" onchange="toggleAddon('${opt.id}', this.checked)"/>
              </div>
            </div>`
      )
      .join("");
  } else {
    mAddonsBox.hidden = true;
    mAddons.innerHTML = "";
  }

  mQty.textContent = "1";
  mNote.value = "";
  updateModalTotal();
  modal.showModal();
};
window.selectVariant = (vid) => {
  if (!currentItem?.product?.variants) return;
  const v = currentItem.product.variants.find((v) => v.id === vid);
  if (!v) return;
  currentItem.variant = v;
  mVariants
    .querySelectorAll(".chip")
    .forEach((ch) => ch.classList.remove("active"));
  const btn = [...mVariants.children].find(
    (b) => b.getAttribute("data-id") === vid
  );
  if (btn) btn.classList.add("active");
  updateModalTotal();
};
window.toggleAddon = (aid, checked) => {
  if (!currentItem) return;
  checked ? currentItem.addons.add(aid) : currentItem.addons.delete(aid);
  updateModalTotal();
};
el("mMinus").onclick = () => {
  if (currentItem.qty > 1) {
    currentItem.qty--;
    mQty.textContent = String(currentItem.qty);
    updateModalTotal();
  }
};
el("mPlus").onclick = () => {
  currentItem.qty++;
  mQty.textContent = String(currentItem.qty);
  updateModalTotal();
};
el("mCancel").onclick = closeModal;
el("mClose").onclick = closeModal;
function closeModal() {
  if (modal.open) modal.close();
}
mNote.addEventListener("input", () => {
  if (currentItem) currentItem.note = mNote.value;
});
function updateModalTotal() {
  const base = currentItem.product.variants
    ? currentItem.variant.price
    : currentItem.product.price;
  const addonsArr = (currentItem.product.addons || []).filter((a) =>
    currentItem.addons.has(a.id)
  );
  const addonsTotal = addonsArr.reduce((s, a) => s + a.price, 0);
  mTotal.textContent = money((base + addonsTotal) * currentItem.qty);
}
el("mAdd").onclick = () => {
  if (!currentItem) return;
  const base = currentItem.product.variants
    ? currentItem.variant.price
    : currentItem.product.price;
  const addonsArr = (currentItem.product.addons || []).filter((a) =>
    currentItem.addons.has(a.id)
  );
  cart.push({
    id: `${currentItem.product.id}-${Date.now()}`,
    name: currentItem.product.name,
    variant: currentItem.product.variants ? currentItem.variant : null,
    addons: addonsArr,
    qty: currentItem.qty,
    basePrice: base,
    note: currentItem.note,
  });
  renderCart();
  updateFab();
  // 🎯 Animações no FAB e contador
  fabBtn.classList.remove("bump");
  void fabBtn.offsetWidth;
  fabBtn.classList.add("bump");

  fabCount.classList.remove("flash");
  void fabCount.offsetWidth;
  fabCount.classList.add("flash");

  closeModal();
  // abre o modal do carrinho automaticamente após adicionar (opcional: comente se não quiser)
  // cartModal.showModal();
};

// ===========================
// Carrinho (como MODAL)
// ===========================
const cartModal = el("cartModal");
const cartItemsEl = el("cartItems"),
  cartEmptyEl = el("cartEmpty"),
  totalsEl = el("totals"),
  subtotalEl = el("subtotal"),
  totalEl = el("total");
const fabBtn = el("fabCart"),
  fabCount = el("fabCount");
el("cClose").onclick = () => cartModal.close();
fabBtn.onclick = () => cartModal.showModal();

function cartItemTotal(it) {
  const addons = (it.addons || []).reduce((s, a) => s + a.price, 0);
  return (it.basePrice + addons) * it.qty;
}

function renderCart() {
  const empty = cart.length === 0;
  cartEmptyEl.style.display = empty ? "block" : "none";
  totalsEl.hidden = empty;
  if (empty) {
    cartItemsEl.innerHTML = "";
    subtotalEl.textContent = money(0);
    totalEl.textContent = money(0);
    return;
  }

  cartItemsEl.innerHTML = cart
    .map((it, idx) => {
      const line = cartItemTotal(it);
      const variant = it.variant
        ? ` — <span style="color:var(--text-muted)">${it.variant.label}</span>`
        : "";
      const addons = it.addons?.length
        ? `<div style="font-size:12px;color:var(--text-muted)">+ ${it.addons
            .map((a) => a.label)
            .join(", ")}</div>`
        : "";
      const note = it.note
        ? `<div style="font-size:12px;color:var(--text-muted)">Obs.: ${escapeHtml(
            it.note
          )}</div>`
        : "";
      return `
            <div class="pop" style="border-bottom:1px dashed var(--border);padding:10px 0;animation-delay:${
              idx * 40
            }ms">
              <div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center">
                <div>
                  <div style="font-weight:700">${it.name}${variant}</div>
                  <div style="font-size:13px;color:var(--text-muted)">${money(
                    it.basePrice
                  )} base</div>
                  ${addons || ""}${note || ""}
                </div>
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="qty">
                    <button onclick="decQty(${idx})">−</button><strong>${
        it.qty
      }</strong><button onclick="incQty(${idx})">+</button>
                  </div>
                  <div style="width:90px;text-align:right;font-weight:700">${money(
                    line
                  )}</div>
                  <button class="btn-outline" style="border-color:transparent;color:var(--danger)" onclick="removeItem(${idx})">Remover</button>
                </div>
              </div>
            </div>`;
    })
    .join("");

  const subtotal = cart.reduce((s, it) => s + cartItemTotal(it), 0);
  subtotalEl.textContent = money(subtotal);
  totalEl.textContent = money(subtotal);
}

window.incQty = (i) => {
  cart[i].qty++;
  renderCart();
  updateFab();
};
window.decQty = (i) => {
  cart[i].qty = Math.max(1, cart[i].qty - 1);
  renderCart();
  updateFab();
};
window.removeItem = (i) => {
  cart.splice(i, 1);
  renderCart();
  updateFab();
};
function clearCart() {
  cart.splice(0, cart.length);
  renderCart();
  updateFab();
}
el("clear").addEventListener("click", clearCart);

// FAB count/visibilidade
function updateFab() {
  const count = cart.reduce((s, it) => s + it.qty, 0);
  fabCount.textContent = String(count);
  fabBtn.hidden = count === 0; // aparece só quando tem itens
}

// ===========================
// WhatsApp + campos de entrega
// ===========================
function buildOrderMessage() {
  if (cart.length === 0) return "";
  const name = el("customerName").value?.trim();
  const delivery = el("delivery").value;
  const address = el("address").value?.trim();
  const notes = el("notes").value?.trim();

  const lines = [];
  lines.push("*🍔 Novo pedido — Lanchonete do Bairro*");
  if (name) lines.push(`*Cliente:* ${name}`);
  if (delivery) lines.push(`*Modo:* ${delivery}`);
  if (delivery === "Entrega" && address) lines.push(`*Endereço:* ${address}`);
  lines.push("");
  lines.push("*Itens:*");

  let total = 0;
  cart.forEach((it) => {
    const addons = it.addons?.length
      ? ` (+ ${it.addons.map((a) => a.label).join(", ")})`
      : "";
    const variant = it.variant ? ` ${it.variant.label}` : "";
    const lineTotal = cartItemTotal(it);
    total += lineTotal;
    lines.push(
      `• ${it.qty}x ${it.name}${variant}${addons} — ${money(lineTotal)}`
    );
    if (it.note) lines.push(`   Obs.: ${it.note}`);
  });

  lines.push("");
  lines.push(`*Total:* ${money(total)}`);
  if (notes) {
    lines.push("");
    lines.push(`*Obs. gerais:* ${notes}`);
  }
  lines.push("");
  lines.push("_Enviado automaticamente pelo cardápio digital._");
  return encodeURIComponent(lines.join("\n"));
}
function openWhatsApp() {
  if (!WHATSAPP_NUMBER || /\D/.test(WHATSAPP_NUMBER)) {
    alert(
      "Configure o número do WhatsApp no código (apenas dígitos: DDI+DDD+Número)."
    );
    return;
  }
  const msg = buildOrderMessage();
  if (!msg) {
    alert("Seu carrinho está vazio.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  window.open(url, "_blank");
}
el("finish").addEventListener("click", openWhatsApp);
el("delivery").addEventListener("change", (e) => {
  el("addressField").hidden = e.target.value !== "Entrega";
});

function escapeHtml(str) {
  return str.replace(
    /[&<>"]/g,
    (s) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[s])
  );
}

// Boot
renderTabs();
renderProducts();
renderCart();
updateFab();
