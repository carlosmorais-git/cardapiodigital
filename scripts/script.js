// ====== Moeda, helpers e estado ======
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

// Helpers p/ addons com quantidade
window.getAddonQty = (aid) => currentItem?.addons?.get(aid) ?? 0;
window.adjustAddon = (aid, delta) => {
  if (!currentItem) return;
  const prev = currentItem.addons.get(aid) ?? 0;
  const next = Math.max(0, prev + delta);
  if (next === 0) currentItem.addons.delete(aid);
  else currentItem.addons.set(aid, next);
  const span = document.getElementById(`qty-${aid}`);
  if (span) span.textContent = String(next);
  updateModalTotal();
};

window.chooseItem = (id) => {
  const cat = CATALOG.find((c) => c.category === activeTab);
  const p = cat.items.find((i) => i.id === id);
  if (!p) return;

  currentItem = {
    product: p,
    variant: p.variants ? p.variants[0] : null,
    addons: new Map(), // <-- antes era Set()
    qty: 1,
    note: "",
  };

  mTitle.textContent = p.name;
  mDesc.textContent = p.desc;

  // Variantes
  if (p.variants) {
    mVariantsBox.classList.remove("esconder");
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
    mVariantsBox.classList.add("esconder");
    mVariants.innerHTML = "";
  }

  // Addons -> UI com quantidade
  const a = p.addons || [];
  if (a.length) {
    mAddonsBox.classList.remove("esconder");
    mAddons.innerHTML = a
      .map(
        (opt) => `
          <div class="addon">
            <span>${opt.label} <span style="color:var(--text-muted)">— ${money(
          opt.price
        )}</span></span>
            <div class="qty">
              <button onclick="adjustAddon('${opt.id}', -1)">−</button>
              <strong id="qty-${opt.id}">${getAddonQty(opt.id)}</strong>
              <button onclick="adjustAddon('${opt.id}', 1)">+</button>
            </div>
          </div>`
      )
      .join("");
  } else {
    mAddonsBox.classList.add("esconder");
    mAddons.innerHTML = "";
  }

  mQty.textContent = "1";
  mNote.value = "";
  updateModalTotal();

  // Bloqueia rolagem de fundo e abre o modal
  document.body.classList.add("modal-open");
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
  if (modal.open) modal.close(); // 'close' removerá a classe do body (listener abaixo)
}
mNote.addEventListener("input", () => {
  if (currentItem) currentItem.note = mNote.value;
});

function updateModalTotal() {
  const base = currentItem.product.variants
    ? currentItem.variant.price
    : currentItem.product.price;
  const addonsList = currentItem.product.addons || [];
  const addonsTotal = addonsList.reduce((sum, a) => {
    const q = currentItem.addons.get(a.id) ?? 0;
    return sum + a.price * q;
  }, 0);
  mTotal.textContent = money((base + addonsTotal) * currentItem.qty);
}

el("mAdd").onclick = () => {
  if (!currentItem) return;
  const base = currentItem.product.variants
    ? currentItem.variant.price
    : currentItem.product.price;

  const addonsArr = (currentItem.product.addons || [])
    .map((a) => ({
      id: a.id,
      label: a.label,
      price: a.price,
      qty: currentItem.addons.get(a.id) ?? 0,
    }))
    .filter((a) => a.qty > 0);

  cart.push({
    id: `${currentItem.product.id}-${Date.now()}`,
    name: currentItem.product.name,
    variant: currentItem.product.variants ? currentItem.variant : null,
    addons: addonsArr, // agora com qty
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
  // Se quiser abrir o carrinho automaticamente:
  // document.body.classList.add('modal-open');
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

// abre/fecha carrinho com trava de rolagem
el("cClose").onclick = () => cartModal.close();
fabBtn.onclick = () => {
  document.body.classList.add("modal-open");
  cartModal.showModal();
};

// trava de fundo quando QUALQUER modal fechar
modal.addEventListener("close", () =>
  document.body.classList.remove("modal-open")
);
cartModal.addEventListener("close", () =>
  document.body.classList.remove("modal-open")
);

function cartItemTotal(it) {
  const addons = (it.addons || []).reduce(
    (s, a) => s + a.price * (a.qty ?? 0),
    0
  );
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
            .map((a) => (a.qty > 1 ? `${a.label} x${a.qty}` : a.label))
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

  // ✅ habilita/desabilita o botão "Finalizar"
  const finishBtn = el("finish");
  if (finishBtn) finishBtn.disabled = cart.length === 0;
}

window.incQty = (i) => {
  cart[i].qty++;
  renderCart();
  updateFab();
};
//  Pegunta o usuario se pretende remover o item que tem quatidade 0
window.decQty = async (i) => {
  const prev = cart[i].qty;
  const next = Math.max(0, prev - 1);
  if (next === 0) {
    const ok = await confirmAction(
      `Quantidade vai ficar 0. Remover "${cart[i].name}" do carrinho?`,
      { yesLabel: "Remover" }
    );
    if (!ok) return; // mantém como estava
    cart.splice(i, 1);
  } else {
    cart[i].qty = next;
  }
  renderCart();
  updateFab();
};

window.removeItem = async (i) => {
  const it = cart[i];
  if (!it) return;
  const ok = await confirmAction(`Remover "${it.name}" do carrinho?`);
  if (!ok) return;
  cart.splice(i, 1);
  renderCart();
  updateFab();
};

async function clearCart() {
  if (cart.length === 0) return;
  const ok = await confirmAction("Deseja limpar todo o carrinho?", {
    yesLabel: "Sim, limpar",
  });
  if (!ok) return;
  cart.splice(0, cart.length);
  renderCart();
  updateFab();
}

el("clear").addEventListener("click", clearCart);

// ===== CONFIRM MODAL (reutilizável) =====
const confirmModal = el("confirmModal");
const confirmMsg = el("confirmMsg");
const confirmYes = el("confirmYes");
const confirmNo = el("confirmNo");
const confirmClose = el("confirmClose");

// remove trava ao fechar
confirmModal.addEventListener("close", () =>
  document.body.classList.remove("modal-open")
);

function confirmAction(
  message,
  { yesLabel = "Confirmar", noLabel = "Cancelar" } = {}
) {
  return new Promise((resolve) => {
    confirmMsg.textContent = message;
    confirmYes.textContent = yesLabel;
    confirmNo.textContent = noLabel;

    const onYes = () => close(true);
    const onNo = () => close(false);
    const onCancel = () => close(false);
    const onKey = (e) => {
      if (e.key === "Escape") close(false);
    };

    function cleanup() {
      confirmYes.removeEventListener("click", onYes);
      confirmNo.removeEventListener("click", onNo);
      confirmClose.removeEventListener("click", onNo);
      confirmModal.removeEventListener("cancel", onCancel);
      document.removeEventListener("keydown", onKey);
    }
    function close(result) {
      cleanup();
      confirmModal.close();
      resolve(result);
    }

    confirmYes.addEventListener("click", onYes);
    confirmNo.addEventListener("click", onNo);
    confirmClose.addEventListener("click", onNo);
    confirmModal.addEventListener("cancel", onCancel);
    document.addEventListener("keydown", onKey);

    document.body.classList.add("modal-open");
    confirmModal.showModal();
  });
}

// FAB count/visibilidade
function updateFab() {
  const count = cart.reduce((s, it) => s + it.qty, 0);
  fabCount.textContent = String(count);
  fabBtn.hidden = count === 0; // aparece só quando tem itens
}

// ===========================
// WhatsApp + confirmação + lock + reset
// ===========================

// (opcional) mantém seu buildOrderMessage como está
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
      ? ` (+ ${it.addons
          .map((a) => (a.qty > 1 ? `${a.label} x${a.qty}` : a.label))
          .join(", ")})`
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

// ---------- LOCK anti reabrir ----------
function waSetLock(ms = 5000) {
  sessionStorage.setItem("wa_lock_until", String(Date.now() + ms));
}
function waLocked() {
  return Date.now() < Number(sessionStorage.getItem("wa_lock_until") || 0);
}

// ---------- limpar carrinho + UI ----------
function clearCartAll() {
  try {
    if (typeof cartModal !== "undefined" && cartModal?.open) cartModal.close();
  } catch {}
  try {
    if (typeof itemModal !== "undefined" && itemModal?.open) itemModal.close();
  } catch {}

  cart.splice(0, cart.length);
  localStorage.removeItem("cart"); // ok remover se não usa, mas não atrapalha

  renderCart();
  updateFab();

  // desabilita o botão finalizar até ter itens novamente
  const finishBtn = el("finish");
  if (finishBtn) finishBtn.disabled = true;
}

// ---------- abrir WhatsApp de forma estável ----------
function openWhatsApp() {
  if (!WHATSAPP_NUMBER || /\D/.test(WHATSAPP_NUMBER)) {
    alert(
      "Configure o número do WhatsApp no código (apenas dígitos: DDI+DDD+Número)."
    );
    return;
  }
  if (waLocked()) return; // evita reabrir

  const msg = buildOrderMessage();
  if (!msg) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

  // âncora invisível (melhor que window.open no mobile)
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.style.display = "none";
  document.body.appendChild(a);

  waSetLock(5000); // trava 5s
  a.click();
  a.remove();

  // limpa carrinho logo depois
  setTimeout(clearCartAll, 100);
}

// ---------- confirma com o usuário ----------
el("finish").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }
  const subtotal = cart.reduce((s, it) => s + cartItemTotal(it), 0);
  const ok = await confirmAction(
    `Finalizar pedido no WhatsApp?\nTotal: ${money(subtotal)}`,
    { yesLabel: "Sim, finalizar" }
  );
  if (!ok) return;
  openWhatsApp();
});

el("delivery").addEventListener("change", (e) => {
  el("addressField").hidden = e.target.value !== "Entrega";
});

// helpers
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
