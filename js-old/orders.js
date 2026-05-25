// js/orders.js
import { getCart, saveCart, getOrders, saveOrders } from "./state.js";
import { renderOrders, renderCart } from "./ui.js";

// Функція для оформлення замовлення (Checkout)
export function handleCheckout() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Ваш кошик порожній!");
    return;
  }

  // Створюємо об'єкт нового замовлення
  const newOrder = {
    id: `ORD-${Date.now()}`,
    date: new Date().toLocaleString(),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price, 0),
  };

  // Отримуємо поточні замовлення, додаємо нове і зберігаємо
  const currentOrders = getOrders();
  const updatedOrders = [...currentOrders, newOrder];
  saveOrders(updatedOrders);

  // Очищуємо кошик у стейті
  saveCart([]);

  // Оновлюємо інтерфейс через модуль UI
  renderCart();

  // Закриваємо шторку кошика після оформлення
  const cartDrawer = document.querySelector("#cartDrawer");
  const cartOverlay = document.querySelector("#cartOverlay");
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
  }

  alert("Замовлення успішно оформлено! Перевірте вкладку Orders.");
}

// Ініціалізація слухачів подій для замовлень та навігації
export function initOrders() {
  const inventoryLink = document.querySelector("#inventoryLink");
  const ordersLink = document.querySelector("#ordersLink");
  const shopView = document.querySelector("#shopView");
  const ordersView = document.querySelector("#ordersView");
  const checkoutBtn = document.querySelector("#checkoutBtn");

  // Перемикання на вкладку "Магазин"
  if (inventoryLink) {
    inventoryLink.addEventListener("click", (e) => {
      e.preventDefault();
      shopView?.classList.remove("is-hidden");
      ordersView?.classList.add("is-hidden");
    });
  }

  // Перемикання на вкладку "Замовлення"
  if (ordersLink) {
    ordersLink.addEventListener("click", (e) => {
      e.preventDefault();
      shopView?.classList.add("is-hidden");
      ordersView?.classList.remove("is-hidden");
      renderOrders(); // Малюємо список замовлень
    });
  }

  // Клікт на кнопку "Оформити замовлення"
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
  }
}