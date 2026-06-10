// На самому початку src/ts/script.ts додаєш:
import '../scss/style.scss'

// 1. Імпортуємо функції з модулів
import { initCartOverlay } from './modules/cart-overlay';
import { initBurgerMenu } from './modules/burger';
import { initProductForm } from './modules/product-form';
import { initCatalog } from './modules/catalog';
import { initializeStorage } from './services/products-storage';

// Ініціалізуємо всі функції після імпорту
initializeStorage();
initBurgerMenu();
initCatalog();
initProductForm();
initCartOverlay();

// Додаємо клас "preload" до body, щоб приховати вміст до повного завантаження сторінки для vite
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
}); 