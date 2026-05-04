

const toogleButton = document.querySelector('.toggle');


toogleButton.addEventListener("click", () => {
    const main = document.querySelector('.main');
    const sidebar = document.querySelector('.sidebar');
    main.classList.toggle('main2');
    sidebar.classList.toggle('sidebar-active');
 
}); 