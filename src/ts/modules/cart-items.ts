import { Product } from "./products-storage";

interface CartItem {
  product: Product;
  quantity: number;
}

let cart: CartItem[] = [];

export function addProductToCart(product: Product): void {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  console.log("Оновлений кошик:", cart);
}

