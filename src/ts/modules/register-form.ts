// для локалстореджу
import {
  Product,
  getProductsFromStorage,
  saveProductsToStorage,
} from "./products-storage";

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

  // Перевірка, чи всі елементи існують (Type Guard) якщо є null, то виводимо помилку і виходимо з функції
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
    // створюємоо функцію для валідації полів вводу, яка буде викликатися при кожному зміненні в полях
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
              <span class="products-item-price">Ціна: ${product.price.toFixed(2)} $</span>
              <span class="products-item-qty">Кількість: ${product.quantity} шт.</span>
          </div>
      </div>
      <button class="delete-btn">Видалити</button>
    `;

    const deleteButton = listItem.querySelector(
      ".delete-btn",
    ) as HTMLButtonElement | null;
    if (deleteButton) {
      deleteButton.addEventListener("click", (): void => {
        productsList.removeChild(listItem);
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

  // ... (весь твій попередній код, слухачі подій тощо)

  // 1. Описуємо функцію завантаження
  const initLoad = (): void => {
    const savedProducts = getProductsFromStorage();
    savedProducts.forEach((product) => renderProductItem(product));
  };

  // 2. Викликаємо її, щоб товари з'явилися при старті
  initLoad();

  // 3. Твоя рідна перша валідація при завантаженні
  validateInputs();
} // Кінець функції initRegisterForm
