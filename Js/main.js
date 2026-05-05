

const toogleButton = document.querySelector('.toggle');


toogleButton.addEventListener("click", () => {
    const main = document.querySelector('.main');
    const sidebar = document.querySelector('.sidebar');
    main.classList.toggle('main2');
    sidebar.classList.toggle('sidebar-active');
 
}); 


const home = document.getElementById('home');
const prof = document.getElementById('profile');
const counseling = document.getElementById('counseling');
const simulator = document.getElementById('simulator');
const news = document.getElementById('news');
const logout = document.getElementById('logout');


home.addEventListener("click", () => {
    window.location.href = "main.html";
});  


logout.addEventListener("click", () => {

    window.location.href = "index.html";
});