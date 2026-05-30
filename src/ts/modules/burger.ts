export function initBurgerMenu() {
    const burger = document.querySelector('.burger') as HTMLElement;
    const menu = document.querySelector('.header-nav') as HTMLElement;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menu.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
    });

}