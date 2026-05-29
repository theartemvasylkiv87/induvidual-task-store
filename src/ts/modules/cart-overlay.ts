export function initCartOverlay() : void {
    console.log('Cart overlay module initialized');
    // Тут буде код для роботи з оверлеєм корзини

    const cartOverlay = document.getElementById('cartOverlay') as HTMLElement;
    const cartButton = document.getElementById('cartLink') as HTMLElement;
    
    cartButton.addEventListener('click', (e: Event) => {
        e.preventDefault();
        cartOverlay.classList.toggle('active');
    });

    cartOverlay.addEventListener('click', () => {
        cartOverlay.classList.remove('active')
    });
}