const menu = document.getElementById("mobileMenu");
const closebtn = document.getElementById("closeMobileMenu");
const openbtn = document.getElementById("openMenuBtn");

const ACTIVE_CLASS = "mobile-menu_active";

closebtn.onclick = () => {
  menu.classList.remove(ACTIVE_CLASS);
  document.body.style.overflow = "auto";
};
openbtn.onclick = () => {
    menu.classList.add(ACTIVE_CLASS)
    document.body.style.overflow = "hidden";
};
