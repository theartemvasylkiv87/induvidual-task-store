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

  const addProduct = (): void => {
    // створюємо обєкт продукту з даних, які ввів користувач
    const name: string = nameInput.value.trim();
    const price: number = parseFloat(priceInput.value);
    const quantity: number = parseInt(quantityInput.value);
    const image: string = imageInput.value.trim(); // Валідуємо, щоб картинка теж була вказана
    const listItem: HTMLLIElement = document.createElement("li");
    listItem.classList.add("products-item");
    listItem.innerHTML = `
    <div class="products-item-image">
            <img src="${image}" alt="${name}" class="product-image">
        </div>
        <div class="products-item-info">
            <h4 class="products-item-title">${name}</h4>
            <div class="products-item-details">
                <span class="products-item-price">Ціна: ${price.toFixed(2)} $</span>
                <span class="products-item-qty">Кількість: ${quantity} шт.</span>
            </div>
        </div>
        <button class="delete-btn">Видалити</button>
    `;
    productsList.appendChild(listItem); // додаємо новий елемент до списку продуктів

    // Додаємо слухач події для кнопки видалення, щоб видалити відповідний елемент списку при натисканні
    const deleteButton = listItem.querySelector(
      ".delete-btn",
    ) as HTMLButtonElement | null;
    if (deleteButton) {
      deleteButton.addEventListener("click", (): void => {
        productsList.removeChild(listItem);
      });
    }
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

  // Перша валідація при завантаженні
  validateInputs();
}
