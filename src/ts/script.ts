// На самому початку src/ts/script.ts додаєш:
import '../scss/style.scss'

// 1. Імпортуємо функцію з твого нового модуля
import { initCartOverlay } from './modules/cart-overlay';

// 2. Викликаємо її, щоб код почав працювати
initCartOverlay();