document.addEventListener("DOMContentLoaded", () => {

const revealItems = document.querySelectorAll(
".feature-card, .solution-card, .step-card, .dash-widget, .command-card"
);

const observer = new IntersectionObserver((entries) => {

entries.forEach((entry) => {

if (entry.isIntersecting) {

entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0px)";
observer.unobserve(entry.target);

}

});

}, {

threshold: 0.15

});

revealItems.forEach((item) => {

item.style.opacity = "0";
item.style.transform = "translateY(30px)";
item.style.transition = "all .6s ease";

observer.observe(item);

});

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", function(e) {

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

const globe = document.querySelector(".globe");

window.addEventListener("mousemove",(e)=>{

if(!globe) return;

const x=(e.clientX/window.innerWidth-.5)*18;
const y=(e.clientY/window.innerHeight-.5)*18;

globe.style.transform=translateX(-50%) rotateY(${x}deg) rotateX(${-y}deg);

});

});
