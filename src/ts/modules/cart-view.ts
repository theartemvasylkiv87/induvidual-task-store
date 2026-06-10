// Імпортуємо функції з нашого "складу даних"
import { getCartItems, getCartTotal } from "./../services/cart-service";

// Ця функція просто бере поточні дані з сервісу і малює їх на екрані
export function renderCartUI(): void {
  console.log("Оновлюємо UI кошика...");
  const cartItemsContainer = document.getElementById("cartItems") as HTMLElement | null;
  const totalPriceElement = document.getElementById("cartTotalPrice") as HTMLElement | null;

  if (!cartItemsContainer || !totalPriceElement) return;

  // 1. Очищаємо екран
  cartItemsContainer.innerHTML = "";

  // 2. Просимо у сервіса: "Дай мені актуальний масив товарів!"
  const currentItems = getCartItems();

  // 3. Перебираємо масив і малюємо HTML
  currentItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item"); 

    cartItemElement.innerHTML = `
      <div class="cart-item__image">
        <img src="${item.product.image}" alt="${item.product.name}" width="50">
      </div>
      <div class="cart-item__info">
        <h4 class="cart-item__title">${item.product.name}</h4>
        <p class="cart-item__price">${item.product.price.toFixed(2)} $ x ${item.quantity}</p>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);
  });

  // 4. Просимо у сервіса порахувати загальну суму і виводимо її
  totalPriceElement.textContent = `$${getCartTotal().toFixed(2)}`;
}