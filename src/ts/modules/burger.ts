export function initBurgerMenu() : void {
    const burger = document.querySelector('.burger') as HTMLButtonElement | null;
    const menu = document.querySelector('.header-nav') as HTMLElement | null;

    if (!burger) {
        console.error('Burger button not found');
        return;
    }

    if (!menu) {
        console.error('Header navigation not found');
        return;
    }

    burger.addEventListener('click', () : void => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menu.addEventListener('click', (event : Event) : void => { // event працює так - при кліку він отримує таргет і він показує на який тег ми клікнули
        const target = event.target as HTMLElement; // додаем тип таргет для перевірки на клік по посиланню чи натиснули ми на посилання в меню
        if (target.tagName === 'A') {
            burger.classList.remove('active');
            menu.classList.remove('active');
        }
    });

}