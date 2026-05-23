// js/script.js
import { initForm } from "./form.js";
import { renderProducts } from "./ui.js";

let isInitialized = false; // Запобіжник, щоб не запустити код двічі

function init() {
  const addBtn = document.querySelector("#addBtn");
  const productsContainer = document.querySelector("#productsList");

  // Перевіряємо, чи вже існують на сторінці і кнопка форми, і контейнер для товарів
  if (addBtn && productsContainer && !isInitialized) {
    console.log("✅ Всі необхідні блоки знайдено в DOM. Запускаємо вітрину та форму!");
    initForm();
    renderProducts();
    isInitialized = true; // Ставимо прапорець, що все успішно запущено
  }
}

// 1. Перевіряємо при звичайному завантаженні сторінки
document.addEventListener("DOMContentLoaded", init);

// 2. Перевіряємо після кожного шматка HTML, який підвантажує HTMX
document.body.addEventListener("htmx:afterSettle", init);