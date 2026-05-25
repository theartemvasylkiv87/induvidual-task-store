// js/cart.js
import { getProducts, getCart, saveCart } from "./state.js";
import { renderCart } from "./ui.js";

// Функція для відкриття/закриття кошика
export function toggleCartDrawer() {
  const cartDrawer = document.querySelector("#cartDrawer");
  const cartOverlay = document.querySelector("#cartOverlay");
  
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.toggle("open");
    cartOverlay.classList.toggle("open");
  }
}

// Функція додавання в кошик
export function addToCart(productId) {
  const products = getProducts();
  const cart = getCart();
  
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  // Поки що залишаємо твою логіку з простою вставкою об'єкта
  const updatedCart = [...cart, product];
  saveCart(updatedCart);

  renderCart();

  // Автоматично відкриваємо кошик при додаванні
  const cartDrawer = document.querySelector("#cartDrawer");
  if (cartDrawer && !cartDrawer.classList.contains("open")) {
    toggleCartDrawer();
  }
}

// Функція видалення з кошика (за індексом)
export function removeFromCart(index) {
  const cart = getCart();
  
  // Копіюємо масив і вирізаємо елемент
  const updatedCart = [...cart];
  updatedCart.splice(index, 1);
  
  saveCart(updatedCart);
  renderCart();
}

// Ініціалізація слухачів подій для кошика
export function initCart() {
  const cartBtn = document.querySelector("#cartLink");
  const closeCartBtn = document.querySelector("#closeCartBtn");
  const cartOverlay = document.querySelector("#cartOverlay");
  const cartItemsContainer = document.querySelector("#cartItems");

  // Кнопки відкриття / закриття
  if (cartBtn) cartBtn.addEventListener("click", (e) => { e.preventDefault(); toggleCartDrawer(); });
  if (closeCartBtn) closeCartBtn.addEventListener("click", toggleCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", toggleCartDrawer);

  // СЛУХАЧ ДЛЯ ВИДАЛЕННЯ З КОШИКА (Делегування подій)
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
      // Шукаємо, чи клікнули на кнопку видалення з кошика
      const removeBtn = e.target.closest('[data-action="remove-from-cart"]');
      if (removeBtn) {
        const index = parseInt(removeBtn.dataset.index, 10);
        removeFromCart(index);
      }
    });
  }
}