const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const menuBtn = $("#menuBtn");
const nav = $("#nav");
const plannerForm = $("#plannerForm");
const quickPlanForm = $("#quickPlanForm");
const quickDestination = $("#quickDestination");
const destination = $("#destination");
const days = $("#days");
const travelers = $("#travelers");
const style = $("#style");
const budget = $("#budget");
const startDate = $("#startDate");
const tripOutput = $("#tripOutput");
const resultSub = $("#resultSub");
const saveTripBtn = $("#saveTripBtn");
const printTripBtn = $("#printTripBtn");
const savedList = $("#savedList");
const clearTripsBtn = $("#clearTripsBtn");
const chat = $("#chat");
const askForm = $("#askForm");
const askInput = $("#askInput");
const waitlistForm = $("#waitlistForm");
const viewTripsBtn = $("#viewTripsBtn");
const joinBtn = $("#joinBtn");

let currentTrip = null;

const destinationIdeas = {
  greece: ["Athens arrival and rooftop dinner", "Acropolis, Plaka, and food tour", "Santorini sunset hotel check-in", "Catamaran cruise and beach day", "Mykonos beach club and old town", "Private island experience", "Final shopping and departure"],
  bali: ["Uluwatu arrival and cliff sunset", "Beach club and seafood dinner", "Ubud rice terraces and spa", "Waterfall tour and temples", "Nusa Penida day trip", "Cooking class and market walk", "Pool morning and departure"],
  italy: ["Rome arrival and Trastevere dinner", "Colosseum and Vatican highlights", "Florence train and Duomo walk", "Tuscan wine country day", "Venice canals and cicchetti", "Amalfi Coast scenic day", "Final espresso and departure"],
  "swiss alps": ["Zurich arrival and lake walk", "Lucerne and mountain views", "Interlaken adventure day", "Jungfrau or Grindelwald excursion", "Zermatt and Matterhorn views", "Spa and scenic train", "Chocolate shopping and departure"],
  miami: ["South Beach arrival", "Wynwood and Design District", "Boat day and Brickell dinner", "Key Biscayne beach day", "Everglades airboat trip", "Luxury spa and rooftop night", "Final brunch and departure"]
};

function money(n) {
  return Number(n).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function titleCase(text) {
  return text.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function createTrip(data) {
  const destKey = data.destination.toLowerCase().trim();
  const matchKey = Object.keys(destinationIdeas).find(key => destKey.includes(key)) || "greece";
  const ideas = destinationIdeas[matchKey];
  const dayCount = Number(data.days);
  const totalBudget = Number(data.budget);
  const hotel = Math.round(totalBudget * 0.42);
  const flight = Math.round(totalBudget * 0.26);
  const food = Math.round(totalBudget * 0.14);
  const activities = Math.round(totalBudget * 0.13);
  const transport = totalBudget - hotel - flight - food - activities;

  const itinerary = Array.from({ length: dayCount }, (_, i) => {
    const idea = ideas[i % ideas.length];
    return {
      day: i + 1,
      title: Day ${i + 1}: ${idea},
      details: ${data.style} plan with morning activity, afternoon free time, dinner recommendation, and organized notes for ${titleCase(data.destination)}.
    };
  });

  return {
    id: Date.now(),
    created: new Date().toLocaleDateString(),
    ...data,
    itinerary,
    budgetBreakdown: { Flights: flight, Hotels: hotel, Food: food, Activities: activities, Transport: transport },
    packing: ["Passport / ID", "Phone charger", "Comfortable shoes", "Travel insurance info", "Evening outfit", "Medication", "Sunglasses", "Backup credit card"],
    notes: [
      "Confirm flight times before booking.",
      "Keep one flexible day for weather or rest.",
      "Save hotel addresses and reservation numbers.",
      "Use this free plan first, then book when ready."
    ]
  };
}

function renderTrip(trip) {
  currentTrip = trip;
  resultSub.textContent = ${trip.days}-day ${trip.style.toLowerCase()} trip to ${titleCase(trip.destination)} for ${trip.travelers} traveler(s).;

  const budgetCards = Object.entries(trip.budgetBreakdown).map(([name, amount]) => `
    <article class="budget-card">
      <h4>${name}</h4>
      <p>${money(amount)}</p>
    </article>
  `).join("");

  const daysHtml = trip.itinerary.map(item => `
    <article class="day-card">
      <h4>${item.title}</h4>
      <p>${item.details}</p>
    </article>
  `).join("");

  tripOutput.className = "trip-output trip-built";
  tripOutput.innerHTML = `
    <div class="trip-summary">
      <article><small>Destination</small><strong>${titleCase(trip.destination)}</strong></article>
      <article><small>Length</small><strong>${trip.days} Days</strong></article>
      <article><small>Travelers</small><strong>${trip.travelers}</strong></article>
      <article><small>Budget</small><strong>${money(trip.budget)}</strong></article>
    </div>

    <div>
      <h3>Daily Itinerary</h3>
      <div class="day-grid">${daysHtml}</div>
    </div>

    <div>
      <h3>Budget Breakdown</h3>
      <div class="extra-grid">${budgetCards}</div>
    </div>

    <div class="extra-grid">
      <article class="packing-card">
        <h4>Packing List</h4>
        <ul>${trip.packing.map(item => <li>${item}</li>).join("")}</ul>
      </article>
      <article class="note-card">
        <h4>Trip Notes</h4>
        ${trip.notes.map(note => <p>• ${note}</p>).join("")}
      </article>
      <article class="note-card">
        <h4>Next Steps</h4>
        <p>Save this trip, print it as a PDF, or use the planner again to compare another destination.</p>
      </article>
    </div>
  `;

  $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveTrip() {
  if (!currentTrip) return alert("Create a trip first.");
  const trips = JSON.parse(localStorage.getItem("travelairTrips") || "[]");
  trips.unshift(currentTrip);
  localStorage.setItem("travelairTrips", JSON.stringify(trips.slice(0, 20)));
  renderSavedTrips();
  alert("Trip saved on this device.");
}

function renderSavedTrips() {
  const trips = JSON.parse(localStorage.getItem("travelairTrips") || "[]");
  if (!trips.length) {
    savedList.innerHTML = <p style="color:#c9c9c9">No saved trips yet. Create and save your first trip.</p>;
    return;
  }

  savedList.innerHTML = trips.map(trip => `
    <article class="saved-item">
      <div>
        <h3>${titleCase(trip.destination)} • ${trip.days} Days</h3>
        <p>${trip.style} • ${trip.travelers} traveler(s) • ${money(trip.budget)} • Saved ${trip.created}</p>
      </div>
      <button class="btn outline" data-load-trip="${trip.id}">Open</button>
    </article>
  `).join("");

  $$("[data-load-trip]").forEach(button => {
    button.addEventListener("click", () => {
      const selected = trips.find(trip => String(trip.id) === button.dataset.loadTrip);
      if (selected) renderTrip(selected);
    });
  });
}

function addChat(type, text) {
  const div = document.createElement("div");
  div.className = msg ${type};
  div.innerHTML = type === "bot" ? <b>TA</b><p>${text}</p> : <p>${text}</p>;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));

quickPlanForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = quickDestination.value.trim();
  if (!value) return;
  destination.value = value;
  $("#planner").scrollIntoView({ behavior: "smooth" });
});

$$("[data-idea]").forEach(button => {
  button.addEventListener("click", () => {
    destination.value = button.dataset.idea;
    quickDestination.value = button.dataset.idea;
    $("#planner").scrollIntoView({ behavior: "smooth" });
  });
});

plannerForm.addEventListener("submit", event => {
  event.preventDefault();
  const trip = createTrip({
    destination: destination.value.trim(),
    days: days.value,
    travelers: travelers.value,
    style: style.value,
    budget: budget.value,
    startDate: startDate.value || "Flexible"
  });

  renderTrip(trip);
  addChat("user", Create a ${trip.days}-day ${trip.style.toLowerCase()} trip to ${titleCase(trip.destination)}.);
  setTimeout(() => addChat("bot", Done. I created your ${trip.days}-day ${titleCase(trip.destination)} plan with itinerary, budget, packing list, notes, and save options.), 350);
});

saveTripBtn.addEventListener("click", saveTrip);
printTripBtn.addEventListener("click", () => window.print());

clearTripsBtn.addEventListener("click", () => {
  if (confirm("Clear all saved trips on this device?")) {
    localStorage.removeItem("travelairTrips");
    renderSavedTrips();
  }
});

askForm.addEventListener("submit", event => {
  event.preventDefault();
  const q = askInput.value.trim();
  if (!q) return;
  addChat("user", q);
  askInput.value = "";
  setTimeout(() => {
    addChat("bot", "I can help organize the destination, days, budget, activities, packing list, and notes. Use the free planner form to generate and save the full trip.");
  }, 350);
});

waitlistForm.addEventListener("submit", event => {
  event.preventDefault();
  const button = waitlistForm.querySelector("button");
  button.textContent = "Joined ✓";
  button.disabled = true;
  alert("You are on the TravelAir.ai founding member list.");
});

viewTripsBtn?.addEventListener("click", () => $("#saved").scrollIntoView({ behavior: "smooth" }));
joinBtn?.addEventListener("click", () => $("#waitlist").scrollIntoView({ behavior: "smooth" }));

$$("[data-load-greece]").forEach(button => {
  button.addEventListener("click", () => {
    destination.value = "Greece";
    days.value = "7";
    travelers.value = "2";
    style.value = "Luxury";
    budget.value = "8000";
    const trip = createTrip({ destination: "Greece", days: "7", travelers: "2", style: "Luxury", budget: "8000", startDate: "Flexible" });
    renderTrip(trip);
  });
});

renderSavedTrips();
