// js/ui.js
import { getProducts } from "./state.js";

export function renderProducts(productsToRender) {
  const products = productsToRender || getProducts();
  const productsContainer = document.querySelector("#productsList");
  if (!productsContainer) return;

  // Очищаємо контейнер перед кожним рендером
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `<p class="no-results">No watches found matching your search... 🔍</p>`;
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");

    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>In Stock: ${product.quantity}</p>
      <div class="product-item__actions">
        <button class="add-to-cart-btn" data-action="add-cart" data-id="${product.id}">Add to Cart 🛒</button>
        <button class="delete-btn" data-action="delete-product" data-id="${product.id}">Remove 🗑️</button>
      </div>
    `;
    productsContainer.appendChild(productElement);
  });
}

import { getProducts, getCart, getOrders } from "./state.js";
/* ==========================================
   2. КОШИК (CART)
========================================== */
export function renderCart() {
  const cartItemsContainer = document.querySelector("#cartItems");
  const cartCountBadge = document.querySelector(".cart-count");
  const cartTotalPriceEl = document.querySelector("#cartTotalPrice");

  if (!cartItemsContainer || !cartCountBadge || !cartTotalPriceEl) return;

  const cart = getCart();
  cartCountBadge.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="cart-drawer__empty">Your cart is empty.</p>`;
    cartTotalPriceEl.textContent = `$0.00`;
    return;
  }

  let cartTotal = 0;
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    cartTotal += item.price;

    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");
    cartItemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item__img">
      <div class="cart-item__info">
        <h4 class="cart-item__name">${item.name}</h4>
        <p class="cart-item__price">$${item.price.toFixed(2)}</p>
      </div>
      <button class="cart-item__remove" data-action="remove-from-cart" data-index="${index}">✖️</button>
    `;
    cartItemsContainer.appendChild(cartItemEl);
  });

  cartTotalPriceEl.textContent = `$${cartTotal.toFixed(2)}`;
}

/* ==========================================
   3. ЗАМОВЛЕННЯ (ORDERS)
========================================== */
export function renderOrders() {
  const ordersListContainer = document.querySelector("#ordersList");
  if (!ordersListContainer) return;

  const orders = getOrders();
  ordersListContainer.innerHTML = "";

  if (orders.length === 0) {
    ordersListContainer.innerHTML = `<p class="orders-empty">У вас ще немає замовлень. 📋</p>`;
    return;
  }

  orders
    .slice()
    .reverse()
    .forEach((order) => {
      const orderEl = document.createElement("div");
      orderEl.classList.add("order-item");
      orderEl.innerHTML = `
      <div class="order-item__header">
        <strong class="order-item__id">ID: ${order.id}</strong>
        <span class="order-item__date">${order.date}</span>
      </div>
      <div class="order-item__content">
        ${order.items
          .map(
            (item) => `
          <div class="order-item__product">
            <span class="order-item__product-name">${item.name}</span>
            <span class="order-item__product-price">$${item.price.toFixed(2)}</span>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="order-item__footer">
        Total: $${order.total.toFixed(2)}
      </div>
    `;
      ordersListContainer.appendChild(orderEl);
    });
}
