
export function initCartOverlay(): void {
  const cartOverlay = document.getElementById(
    "cartOverlay",
  ) as HTMLElement | null;
  const cartButton = document.getElementById(
    "cartLink",
  ) as HTMLButtonElement | null;
  const closeButton = document.getElementById(
    "closeCartBtn",
  ) as HTMLButtonElement | null;

  const cartItemsContainer = document.getElementById(
    "cartItems",
  ) as HTMLElement | null;

  if (
    !cartOverlay ||
    !cartButton ||
    !closeButton ||
    !cartItemsContainer
  ) {
    console.error("One or more required elements not found");
    return;
  }

  const toggleCartOverlay = (): void => {
    cartOverlay.classList.toggle("active");
  };

  cartButton.addEventListener("click", (e: Event): void => {
    e.preventDefault();
    toggleCartOverlay();
  });

  cartOverlay.addEventListener("click", (e: Event): void => {
    if (e.target === cartOverlay) {
      toggleCartOverlay();
    }
  });

  closeButton.addEventListener("click", (e: Event): void => {
    e.preventDefault();
    toggleCartOverlay();
  });
}
