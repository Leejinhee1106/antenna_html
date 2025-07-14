//햄버거
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const navBar = document.querySelector(".home-nav-bar");

    toggle.addEventListener("click", () => {
        navBar.classList.toggle("active");
        toggle.classList.toggle("open");
    });
});

//탑버튼
const topBtn = document.querySelector('.top-btn');

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});