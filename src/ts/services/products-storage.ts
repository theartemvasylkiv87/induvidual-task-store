import { Product } from "../types/products.types";
import { DEFAULT_WATCHES } from "../modules/defaut-products";

// Ключ — це назва "коробки" в пам'яті браузера, де лежатимуть наші товари
const STORAGE_KEY = "products_list";

// Функція, яка завантажує товари зі сховища
export const getProductsFromStorage = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY); // отримуємо дані зі сховища за ключем STORAGE_KEY

  // Якщо в сховищі щось є, перетворюємо текст на масив об'єктів.
  // Якщо там порожньо (null), повертаємо новий порожній масив [].
  return data ? JSON.parse(data) : []; // JSON.parse перетворює текст у JavaScript-об'єкт (у нашому випадку — масив продуктів)
};

// Функція, яка перезаписує масив продуктів у сховищі
export const saveProductsToStorage = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const initializeStorage = (): void => {
  const savedProducts = getProductsFromStorage();
  // Якщо сховище порожне, заповнюємо його годинниками за замовчуванням
  if (savedProducts.length === 0) {
    saveProductsToStorage(DEFAULT_WATCHES);
  }
};
