document.addEventListener('DOMContentLoaded', function () {
    // изменение цвета фона меню
    const navInit = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
        
        const links = document.querySelectorAll('.nav-link'); // ищем все навигационные ссылки
        const sections = document.querySelectorAll('section'); // ишем все секции
        
        sections.forEach(section => { // для каждой секции
            if (window.scrollY >= (section.offsetTop - 100)) { // проверяем если стр прокручена больше чем расстояние секции от начала стр
                // отладка, потом можно удалить
                // console.log(window.scrollY + ' >= ' + section.offsetTop + ' ' + section.id);
                links.forEach(link => {  // для каждой ссылки
                    link.classList.remove('active') // удаляем активный класс
                    if (link.href.split('#').pop() === section.id) { // проверяем совпадают ли трибуты секции и ссылки
                        // прверяем если href ссылки без # === id секции
                        // console.log('I am here')
                        link.classList.add('active') // добавляем активный класс
                    }
                })
            }
        })
    }
    
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }
    
    // анимация контента
    const animItems = document.querySelectorAll('.animate');
    if (animItems.length > 0) {
        console.log('here')

        function onEntry(params) {
            animItems.forEach(item => {
                const itemHeight = item.offsetHeight; // высота анимируемого объекта
                const itemOffset = offset(item).top; // позиция объекта от верхнего края
                const startPos = 2; // параметр регулирования старта анимации
                const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

                if (itemHeight > document.documentElement.clientHeight) {
                    const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
                }
                if ((scrollY > itemOffset - animPoint) && scrollY < itemOffset + itemHeight) {
                    item.classList.add('show');
                } else {
                    if (!item.classList.contains('no-hide')) {
                        item.classList.remove('show');
                    }
                }
            })
        }
    }
    
    // работает только при вертикальном сдвиге (особенности работы с API IntersectionObserver)
    // function onEntry(entry) {
    //     entry.forEach(change => {
    //         if (change.isIntersecting) {
    //             change.target.classList.add('show');
    //         } else change.target.classList.remove('show');
    //     });
    // }
    // let options = {threshold: [0.5]};
    // let observer = new IntersectionObserver(onEntry, options);
    // let elements = document.querySelectorAll('.animate');
    //
    // for (let elm of elements) {
    //     observer.observe(elm);
    // }
    
    onEntry();
    navInit();
    window.addEventListener('scroll', () => {
        navInit();  // Запускаем функцию при скроле страницы
        onEntry();
    })
    window.addEventListener('resize', () => {
        navInit();  // Запускаем функцию при ресайзе страницы
    })
})