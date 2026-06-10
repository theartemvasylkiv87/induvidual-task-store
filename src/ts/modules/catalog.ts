import { Product } from "../types/products.types";
import { getProductsFromStorage, saveProductsToStorage } from "../services/products-storage";
import { addProductToCart } from "../services/cart-service"; // Імпортуємо додавання в кошик
import { renderCartUI } from "./cart-view"; // Імпортуємо функцію оновлення UI кошика


export function initCatalog(): void {
  const productsList = document.getElementById("productsList") as HTMLUListElement | null;
  
  if (!productsList) {
    console.error("Не знайдено контейнер для списку товарів (productsList)!");
    return;
  }

  productsList.innerHTML = "";

  // 2. БЕРЕМО ДАНІ з нашого сервісу
  const products = getProductsFromStorage();

  // 3. ПЕРЕБИРАЄМО МАСИВ і створюємо HTML для кожного годинника
  products.forEach((product: Product) => {
    const listItem = document.createElement("li");
    listItem.classList.add("products-item");
    listItem.dataset.id = product.id.toString();

    listItem.innerHTML = `
      <div class="products-item-image">
          <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <div class="products-item-info">
          <h4 class="products-item-title">${product.name}</h4>
          <div class="products-item-details">
              <span class="products-item-price">Price: ${product.price.toFixed(2)} $</span>
              <span class="products-item-qty">Quantity: ${product.quantity} pcs.</span>
          </div>
      </div>
      <button class="edit-btn">Change</button>
      <button class="save-to-cart-btn">Add to Cart</button>
      <button class="delete-btn">Delete</button>
    `;

    // --- ЛОГІКА ВИДАЛЕННЯ ТОВАРУ ---
    const deleteButton = listItem.querySelector(".delete-btn") as HTMLButtonElement | null;
    deleteButton?.addEventListener("click", () => {
      const currentProducts = getProductsFromStorage();
      // Зберігаємо всі товари, окрім того, на який клікнули
      const updatedProducts = currentProducts.filter(p => p.id !== product.id);
      
      saveProductsToStorage(updatedProducts); // Оновлюємо базу
      initCatalog(); // Перезапускаємо каталог, щоб картка зникла з екрану
    });

    // --- ЛОГІКА ДОДАВАННЯ В КОШИК ---
    const addToCartButton = listItem.querySelector(".save-to-cart-btn") as HTMLButtonElement | null;
    addToCartButton?.addEventListener("click", (e: Event) => {
      e.preventDefault();
      
      // Просто кидаємо товар у сервіс кошика!
      addProductToCart(product);
      console.log(`Товар "${product.name}" додано в кошик!`);
      
     renderCartUI(); // Оновлюємо UI кошика, щоб відобразити новий товар
    });

    // 4. ВСТАВЛЯЄМО ГОТОВУ КАРТКУ В DOM
    productsList.appendChild(listItem);
  });
}