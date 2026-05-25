// js/script.js

// 1. Імпортуємо все необхідне
import { initForm } from "./form.js";
import { getProducts } from "./state.js";
import { renderProducts, renderCart, updateTotalPrice } from "./ui.js";
import { initCart, addToCart } from "./cart.js";
import { initOrders } from "./orders.js";

let isInitialized = false;

/* ==========================================
   ЛОГІКА ПОШУКУ ТА СОРТУВАННЯ
========================================== */
function searchAndSortProducts() {
  const searchInput = document.querySelector("#searchInput");
  const sortSelect = document.querySelector("#sortSelect");
  
  if (!searchInput || !sortSelect) return;

  const query = searchInput.value.toLowerCase();
  const sortType = sortSelect.value;
  const products = getProducts();

  let filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  if (sortType === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortType === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  }

  renderProducts(filtered);
}

/* ==========================================
   ДЕЛЕГУВАННЯ ПОДІЙ ДЛЯ ВІТРИНИ
========================================== */
function initProductsEvents() {
  const productsContainer = document.querySelector("#productsList");
  const searchInput = document.querySelector("#searchInput");
  const sortSelect = document.querySelector("#sortSelect");

  if (searchInput) searchInput.addEventListener("input", searchAndSortProducts);
  if (sortSelect) sortSelect.addEventListener("change", searchAndSortProducts);

  if (productsContainer) {
    productsContainer.addEventListener("click", (e) => {
      const target = e.target;

      // Клік на "Add to Cart"
      if (target.dataset.action === "add-cart") {
        const id = parseInt(target.dataset.id, 10);
        addToCart(id);
      }

      // Клік на "Remove" (видалення товару з вітрини)
      if (target.dataset.action === "delete-product") {
        const id = parseInt(target.dataset.id, 10);
        
        // Прямо тут можемо імпортувати saveProducts або робити це через state,
        // але для простоти імпортуємо saveProducts на початку файлу, якщо потрібно.
        // Оскільки видалення — це зміна стейту, давай додамо імпорт saveProducts зі state.js
        import("./state.js").then(({ getProducts, saveProducts }) => {
          const currentProducts = getProducts();
          const updatedProducts = currentProducts.filter((p) => p.id !== id);
          
          saveProducts(updatedProducts);
          renderProducts();
          updateTotalPrice();
        });
      }
    });
  }
}

/* ==========================================
   ГОЛОВНА ІНІЦІАЛІЗАЦІЯ (ДЛЯ HTMX)
========================================== */
function init() {
  const addBtn = document.querySelector("#addBtn");
  const productsContainer = document.querySelector("#productsList");

  // Додаємо перевірку на інші важливі блоки, які приходять від HTMX
  if (addBtn && productsContainer && !isInitialized) {
    console.log("✅ Всі необхідні блоки знайдено в DOM. Запускаємо повний функціонал!");
    
    // Ініціалізуємо модулі подій
    initForm();
    initCart();
    initOrders();
    initProductsEvents();

    // Робимо перше малювання інтерфейсу з даними, що вже є в LocalStorage
    renderProducts();
    renderCart();
    updateTotalPrice();

    isInitialized = true; 
  }
}

// 1. Звичайне завантаження
document.addEventListener("DOMContentLoaded", init);

// 2. Завантаження через HTMX
document.body.addEventListener("htmx:afterSettle", init);