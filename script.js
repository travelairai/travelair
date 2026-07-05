document.addEventListener("DOMContentLoaded", () => {

const revealItems = document.querySelectorAll(
".feature-card, .solution-card, .step-card, .command-widget, .executive-card, .network-card"
);

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
observer.unobserve(entry.target);
}
});
}, {
threshold: 0.15
});

revealItems.forEach((item) => {
item.classList.add("reveal");
observer.observe(item);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
link.addEventListener("click", function(e) {
e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if (target) {
target.scrollIntoView({
behavior: "smooth",
block: "start"
});
}
});
});

const orb = document.querySelector(".orb-system");

window.addEventListener("mousemove", (e) => {
if (!orb) return;

const x = (e.clientX / window.innerWidth - 0.5) * 14;
const y = (e.clientY / window.innerHeight - 0.5) * 14;

orb.style.transform = translateX(-50%) rotateY(${x}deg) rotateX(${-y}deg);
});

});
