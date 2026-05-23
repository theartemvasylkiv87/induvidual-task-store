// js/ui.js
import { getProducts } from "./state.js";

export function renderProducts(productsToRender = null) {
  const products = productsToRender || getProducts();
  const productsContainer = document.querySelector("#productsList");
  if (!productsContainer) return;

  // Очищаємо контейнер перед кожним рендером
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `<p class="no-results">No watches found matching your search... 🔍</p>`;
    return;
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-item");

    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>In Stock: ${product.quantity}</p>
      <div class="product-item__actions">
        <button class="add-to-cart-btn" data-action="add-cart" data-id="${product.id}">Add to Cart 🛒</button>
        <button class="delete-btn" data-action="delete-product" data-id="${product.id}">Remove 🗑️</button>
      </div>
    `;
    productsContainer.appendChild(productElement);
  });
}
