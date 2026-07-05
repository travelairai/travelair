document.addEventListener("DOMContentLoaded", () => {

const cards = document.querySelectorAll(".feature-card, .dashboard-card, .solution-card, .timeline-item");

const observer = new IntersectionObserver((entries) => {

entries.forEach((entry) => {

if (entry.isIntersecting) {

entry.target.classList.add("show");

}

});

}, {

threshold: 0.15

});

cards.forEach((card) => {

observer.observe(card);

});

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {

link.addEventListener("click", function(e) {

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if (target) {

target.scrollIntoView({

behavior: "smooth"

});

}

});

});

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

const offset = window.scrollY * 0.15;

if (hero) {

hero.style.backgroundPositionY = ${offset}px;

}

});

});
