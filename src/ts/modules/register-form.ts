export function initRegisterForm(): void {
  const registerButton = document.getElementById("addBtn") as HTMLButtonElement;
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const priceInput = document.getElementById("price") as HTMLInputElement;
  const quantityInput = document.getElementById("qty") as HTMLInputElement;

  const validateInputs = (): void => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);

    if (name && price && quantity) {
      registerButton.disabled = false;
    } else {
      registerButton.disabled = true;
    }

  };
    nameInput.addEventListener("input", validateInputs);
    priceInput.addEventListener("input", validateInputs);
    quantityInput.addEventListener("input", validateInputs);

    // ВАЖЛИВО: Викликаємо відразу, щоб заблокувати кнопку при старті
  validateInputs();
}
