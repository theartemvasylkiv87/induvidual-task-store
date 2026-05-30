export function initCartOverlay() : void {
    console.log('Cart overlay module initialized');
    // Тут буде код для роботи з оверлеєм корзини

    const cartOverlay = document.getElementById('cartOverlay') as HTMLElement;
    const cartButton = document.getElementById('cartLink') as HTMLElement;
    const closeButton = document.getElementById('closeCartBtn') as HTMLElement; 

    function toggleCartOverlay() : void {
        cartOverlay.classList.toggle('active');
    }
    
    cartButton.addEventListener('click', (e: Event) : void => {
        e.preventDefault();
        toggleCartOverlay();
    });

    cartOverlay.addEventListener('click', (e: Event) : void => {
        if (e.target === cartOverlay) {
            toggleCartOverlay();
        }
    });

    closeButton.addEventListener('click', (e: Event) : void => {
        e.preventDefault();
        toggleCartOverlay();
    });
}