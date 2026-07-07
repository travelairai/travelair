const mobileMenu = document.querySelector(".mobile-menu");
const nav = document.querySelector(".nav");
const plannerSearch = document.getElementById("plannerSearch");
const destinationInput = document.getElementById("destinationInput");
const assistantInput = document.getElementById("assistantInput");
const chatInput = document.getElementById("chatInput");
const chatStream = document.getElementById("chatStream");
const waitlistForm = document.getElementById("waitlistForm");

mobileMenu?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

function addUserMessage(text) {
  const row = document.createElement("div");
  row.className = "chat-row user";
  row.innerHTML = <p>${text}</p>;
  chatStream.appendChild(row);
  chatStream.scrollTop = chatStream.scrollHeight;
}

function addBotMessage(text) {
  const row = document.createElement("div");
  row.className = "chat-row bot";
  row.innerHTML = <div class="small-mark">TA</div><p>${text}</p>;
  chatStream.appendChild(row);
  chatStream.scrollTop = chatStream.scrollHeight;
}

plannerSearch?.addEventListener("submit", (event) => {
  event.preventDefault();

  const trip = destinationInput.value.trim();
  if (!trip) return;

  addUserMessage(Plan a trip to ${trip}.);
  setTimeout(() => {
    addBotMessage(Perfect. I can build a custom TravelAir.ai itinerary for ${trip} with flights, hotels, activities, timing, and estimated budget.);
  }, 450);

  destinationInput.value = "";
});

document.querySelectorAll("[data-trip]").forEach((button) => {
  button.addEventListener("click", () => {
    destinationInput.value = button.dataset.trip;
    destinationInput.focus();
  });
});

assistantInput?.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = chatInput.value.trim();
  if (!question) return;

  addUserMessage(question);
  setTimeout(() => {
    addBotMessage("I’m building that plan now. TravelAir.ai can organize the trip by destination, hotel style, flight needs, activities, budget, and travel dates.");
  }, 450);

  chatInput.value = "";
});

waitlistForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = waitlistForm.querySelector("button");
  button.textContent = "Joined ✓";
  button.disabled = true;
});
