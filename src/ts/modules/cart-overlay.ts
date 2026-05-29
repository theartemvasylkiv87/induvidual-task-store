export function initCartOverlay() : void {
    console.log('Cart overlay module initialized');
    // Тут буде код для роботи з оверлеєм корзини

    const cartOverlay = document.getElementById('cartOverlay') as HTMLElement;
    const cartButton = document.getElementById('cartLink') as HTMLElement;
    const closeButton = document.getElementById('closeCartBtn') as HTMLElement; 
    
    cartButton.addEventListener('click', (e: Event) : void => {
        e.preventDefault();
        cartOverlay.classList.toggle('active');
    });

    cartOverlay.addEventListener('click', (e: Event) : void => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });

    closeButton.addEventListener('click', (e: Event) : void => {
        e.preventDefault();
        cartOverlay.classList.remove('active');
    });
}