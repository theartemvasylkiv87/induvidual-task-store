import { Product } from "../types/products.types";
import { CartItem } from "../types/cart.types";

// Наш чистий масив товарів у пам'яті
let cart: CartItem[] = [];

// Функція 1: Тільки додає товар у масив (або збільшує кількість)
export function addProductToCart(product: Product): void {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
}

// Функція 2: Віддає поточний стан кошика (щоб інший файл міг його намалювати)
export function getCartItems(): CartItem[] {
  return cart;
}

// Функція 3: Тільки рахує цифри
export function getCartTotal(): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}