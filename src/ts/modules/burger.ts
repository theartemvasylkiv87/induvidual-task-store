export function initBurgerMenu() : void {
    const burger = document.querySelector('.burger') as HTMLButtonElement;
    const menu = document.querySelector('.header-nav') as HTMLElement;

    burger.addEventListener('click', () : void => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menu.addEventListener('click', () : void => {
        burger.classList.remove('active');
        menu.classList.remove('active');
    });

}