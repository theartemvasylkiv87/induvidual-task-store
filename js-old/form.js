// js/form.js
import { getProducts, saveProducts } from "./state.js";
import { renderProducts } from "./ui.js";

export function initForm() {
  const addBtn = document.querySelector("#addBtn");

  if (!addBtn) return;

  addBtn.addEventListener("click", () => {
    const name = document.querySelector("#name").value;
    const price = Number(document.querySelector("#price").value);
    const quantity = Number(document.querySelector("#qty").value);
    const image = document.querySelector("#image").value;

    if (!name || !price || !quantity) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      quantity,
      image: image || "https://example.com/default-watch.jpg",
    };

    const currentProducts = getProducts();
    const updatedProducts = [...currentProducts, newProduct];
    saveProducts(updatedProducts);

    // Викликаємо перемальовку екрану, щоб новий товар з'явився одразу!
    renderProducts();

    document
      .querySelectorAll("#name, #price, #qty, #image")
      .forEach((input) => (input.value = ""));
  });
}
