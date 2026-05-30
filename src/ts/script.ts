// На самому початку src/ts/script.ts додаєш:
import '../scss/style.scss'

// 1. Імпортуємо функцію з твого нового модуля
import { initCartOverlay } from './modules/cart-overlay';
import { initBurgerMenu } from './modules/burger';

// Ініціалізуємо бургер-меню
initBurgerMenu();

// 2. Викликаємо її, щоб код почав працювати
initCartOverlay();