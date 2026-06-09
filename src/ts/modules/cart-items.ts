import { Product } from "./products-storage";

interface CartItem {
  product: Product;
  quantity: number;
}

let cart: CartItem[] = [];

export function addProductToCart(product: Product): void {
  const existingItem = cart.find((item) => item.product.id === product.id);
  const cartItemsContainer = document.getElementById(
    "cartItems",
  ) as HTMLElement | null;

  if (!cartItemsContainer) {
    console.error("Контейнер кошика не знайдено в HTML");
    return;
  }

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  // Очищаємо вміст кошика перед тим, як малювати оновлений список
  cartItemsContainer.innerHTML = "";
  // Перебираємо всі товари, які зараз є в кошику
  cart.forEach((item) => {
    // Створюємо окремий елемент-обгортку для товару в кошику
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item"); // додаємо клас для стилів

    // Наповнюємо його HTML-структурою, використовуючи дані про товар
    cartItemElement.innerHTML = `
    <div class="cart-item__image">
      <img src="${item.product.image}" alt="${item.product.name}" width="50">
    </div>
    <div class="cart-item__info">
      <h4 class="cart-item__title">${item.product.name}</h4>
      <p class="cart-item__price">${item.product.price.toFixed(2)} $ x ${item.quantity}</p>
    </div>
  `;

    // Додаємо створений товар в наш головний контейнер кошика
    cartItemsContainer.appendChild(cartItemElement);

    // 1. Знаходимо елемент загальної вартості в HTML
  });
  const totalPriceElement = document.getElementById(
    "cartTotalPrice",
  ) as HTMLElement | null;

  if (totalPriceElement) {
    // 2. Рахуємо загальну суму за допомогою методу reduce
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    // 3. Виводимо суму, форматуючи її до двох знаків після коми
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }

  console.log("Оновлений кошик:", cart);
}
