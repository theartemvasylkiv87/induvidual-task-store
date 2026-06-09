// для локалстореджу
import {
  getProductsFromStorage,
  saveProductsToStorage,
} from "./products-storage";
import { DEFAULT_WATCHES } from "./defaut-products";
import { addProductToCart} from "../services/cart-service";
import { Product } from "../types/products.types";

export function initRegisterForm(): void {
  const registerButton = document.getElementById(
    "addBtn",
  ) as HTMLButtonElement | null;
  const nameInput = document.getElementById("name") as HTMLInputElement | null;
  const priceInput = document.getElementById(
    "price",
  ) as HTMLInputElement | null;
  const quantityInput = document.getElementById(
    "qty",
  ) as HTMLInputElement | null;

  const productsList = document.getElementById(
    "productsList",
  ) as HTMLUListElement | null;

  const imageInput = document.getElementById(
    "image",
  ) as HTMLInputElement | null;

  if (
    !productsList ||
    !registerButton ||
    !nameInput ||
    !priceInput ||
    !quantityInput ||
    !imageInput
  ) {
    console.error("Form elements not found or product list not found!");
    return;
  }

  const validateInputs = (): void => {
    const name: string = nameInput.value.trim(); // value це з обєкту nameInput, trim() видаляє пробіли з початку і кінця рядка
    const price: number = parseFloat(priceInput.value); // parseFloat перетворює рядок в число з плаваючою точкою
    const quantity: number = parseInt(quantityInput.value); // parseInt перетворює рядок в ціле число
    const image: string = imageInput.value.trim(); // Валідуємо, щоб картинка теж була вказана trim() видаляє пробіли з початку і кінця рядка

    // Логічний вираз замість if/else — коротше і зрозуміліше
    // тут ми перевіряємо, чи всі умови виконуються для активації кнопки реєстрації:
    // якщо в середені все true, то disvabled буде false, якщо хоча б одна умова false, то disabled буде true
    registerButton.disabled = !(
      name &&
      image &&
      !isNaN(price) &&
      !isNaN(quantity) &&
      price > 0 &&
      quantity > 0
    );
  };

  const renderProductItem = (product: Product): void => {
    const listItem: HTMLLIElement = document.createElement("li");
    listItem.classList.add("products-item");

    // Перетворюємо числове id в рядок для HTML-атрибуту
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
      <button class="save-to-cart-btn" id="addToCartBtn">Add to Cart</button>
      <button class="delete-btn">Delete</button>
    `;

    const deleteButton = listItem.querySelector(
      ".delete-btn",
    ) as HTMLButtonElement | null;
    if (deleteButton) {
      deleteButton.addEventListener("click", (): void => {
        // 1. Дістаємо поточний масив продуктів зі сховища
        const currentProducts = getProductsFromStorage();

        // 2. Фільтруємо масив, видаляючи продукт з відповідним id
        const updatedProducts = currentProducts.filter(
          (p) => p.id !== product.id,
        );

        // 3. Записуємо оновлений масив назад у сховище
        saveProductsToStorage(updatedProducts);

        // 4. Видаляємо елемент зі сторінки
        productsList.removeChild(listItem);
      });
    }

    // 1. Знаходимо кнопку "Додати в кошик" на картці товару, яку ми щойно створили
    const addToCartButton = listItem.querySelector(
      ".save-to-cart-btn",
    ) as HTMLButtonElement | null;

    if (addToCartButton) {
      addToCartButton.addEventListener("click", (e: Event): void => {
        e.preventDefault();

        // 2. Каталог просто бере об'єкт `product` і "викидає" його в модуль кошика
        // Самим кошиком каталог НЕ КЕРУЄ, він просто передає дані!
        addProductToCart(product);
      });
    }

    productsList.appendChild(listItem);
  };

  const addProduct = (): void => {
    // 1. Збираємо дані з форми та створюємо правильний об'єкт
    const newProduct: Product = {
      id: Date.now(), // Створюємо унікальне число через мілісекунди
      name: nameInput.value.trim(),
      price: parseFloat(priceInput.value),
      quantity: parseInt(quantityInput.value),
      image: imageInput.value.trim(),
    };

    // 2. Дістаємо поточний масив продуктів зі сховища
    const currentProducts = getProductsFromStorage();

    // 3. Додаємо наш новий продукт у цей масив
    currentProducts.push(newProduct);

    // 4. Записуємо оновлений масив назад у сховище
    saveProductsToStorage(currentProducts);

    // 5. Передаємо об'єкт у функцію рендерингу, щоб він з'явився на екрані
    renderProductItem(newProduct);
  };

  const clearForm = (): void => {
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    imageInput.value = "";
    validateInputs(); // Оновлюємо стан кнопки після очищення форми
  };

  // Реєструємо слухачі подій для кожного поля вводу, щоб викликати validateInputs при кожному зміненні
  [nameInput, priceInput, quantityInput, imageInput].forEach((input): void => {
    input.addEventListener("input", validateInputs);
  });

  registerButton.addEventListener("click", (e: Event): void => {
    e.preventDefault(); // Запобігаємо стандартній поведінці кнопки (якщо вона в формі)
    addProduct();
    clearForm();
  });

  // 1. Описуємо функцію ініціалізації (заповнення localStorage на першому завантаженні)
  const initializeStorage = (): void => {
    const savedProducts = getProductsFromStorage();
    // Якщо сховище порожне, заповнюємо його годинниками за замовчуванням
    if (savedProducts.length === 0) {
      saveProductsToStorage(DEFAULT_WATCHES);
    }
  };

  // 2. Описуємо функцію завантаження
  const initLoad = (): void => {
    const savedProducts = getProductsFromStorage();
    savedProducts.forEach((product) => renderProductItem(product));
  };

  // 3. Спочатку ініціалізуємо сховище
  initializeStorage();

  // 4. Потім завантажуємо продукти зі сховища
  initLoad();

  // 5. Твоя рідна перша валідація при завантаженні
  validateInputs();
} // Кінець функції initRegisterForm
