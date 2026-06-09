// На самому початку src/ts/script.ts додаєш:
import '../scss/style.scss'

// 1. Імпортуємо функцію з твого нового модуля
import { initCartOverlay } from './modules/cart-overlay';
import { initBurgerMenu } from './modules/burger';
import { initRegisterForm } from './modules/register-form';



// Ініціалізуємо всі функції після імпорту
initBurgerMenu();
initRegisterForm();
initCartOverlay();


// Додаємо клас "preload" до body, щоб приховати вміст до повного завантаження сторінки для vite
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
}); 