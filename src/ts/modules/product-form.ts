import { Product } from "../types/products.types";
import { getProductsFromStorage, saveProductsToStorage } from "../services/products-storage";
import { initCatalog } from "../modules/catalog"; // імпортуємо каталог, щоб оновлювати його

export function initProductForm(): void {
  // 1. ШУКАЄМО ЕЛЕМЕНТИ ФОРМИ
  const registerButton = document.getElementById("addBtn") as HTMLButtonElement | null;
  const nameInput = document.getElementById("name") as HTMLInputElement | null;
  const priceInput = document.getElementById("price") as HTMLInputElement | null;
  const quantityInput = document.getElementById("qty") as HTMLInputElement | null;
  const imageInput = document.getElementById("image") as HTMLInputElement | null;

  if (!registerButton || !nameInput || !priceInput || !quantityInput || !imageInput) {
    console.error("Елементи форми не знайдено!");
    return;
  }

  // 2. ВАЛІДАЦІЯ (перевірка, чи правильно все введено)
  const validateInputs = (): void => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);
    const image = imageInput.value.trim();

    registerButton.disabled = !(
      name && image && !isNaN(price) && !isNaN(quantity) && price > 0 && quantity > 0
    );
  };

  // 3. ОЧИЩЕННЯ ПОЛІВ
  const clearForm = (): void => {
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
    imageInput.value = "";
    validateInputs(); 
  };

  // 4. ДОДАВАННЯ ТОВАРУ
  const addProduct = (): void => {
    // Збираємо дані з інпутів у чистий об'єкт
    const newProduct: Product = {
      id: Date.now(), 
      name: nameInput.value.trim(),
      price: parseFloat(priceInput.value),
      quantity: parseInt(quantityInput.value),
      image: imageInput.value.trim(),
    };

    // Просимо СЕРВІС зберегти дані
    const currentProducts = getProductsFromStorage();
    currentProducts.push(newProduct);
    saveProductsToStorage(currentProducts);

    // СВІЖИЙ ХІД: Кажемо КАТАЛОГУ: "Привіт, перемалюй вітрину, бо з'явився новий товар!"
    initCatalog(); 
  };

  // 5. СЛУХАЧІ ПОДІЙ
  [nameInput, priceInput, quantityInput, imageInput].forEach((input) => {
    input.addEventListener("input", validateInputs);
  });

  registerButton.addEventListener("click", (e: Event): void => {
    e.preventDefault();
    addProduct();
    clearForm();
  });

  // Перша перевірка при завантаженні (щоб кнопка була заблокована відразу)
  validateInputs();
}