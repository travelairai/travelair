const toast = document.getElementById("toast");
const chatWindow = document.getElementById("chatWindow");
const assistantForm = document.getElementById("assistantForm");
const assistantInput = document.getElementById("assistantInput");
const heroPlannerForm = document.getElementById("heroPlannerForm");
const heroTripInput = document.getElementById("heroTripInput");
const tripBuilderForm = document.getElementById("tripBuilderForm");
const saveTripBtn = document.getElementById("saveTripBtn");
const clearTripsBtn = document.getElementById("clearTripsBtn");
const savedTripsGrid = document.getElementById("savedTripsGrid");
const waitlistForm = document.getElementById("waitlistForm");
const footerWaitlistForm = document.getElementById("footerWaitlistForm");
const memberCounter = document.getElementById("memberCounter");

let currentTrip = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function money(value) {
  return "$" + Math.round(value).toLocaleString();
}

function addChatMessage(type, message) {
  const row = document.createElement("div");
  row.className = chat-message ${type};

  if (type === "ai") {
    row.innerHTML = <span>TA</span><p>${message}</p>;
  } else {
    row.innerHTML = <p>${message}</p>;
  }

  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function buildAIResponse(prompt) {
  const cleanPrompt = prompt.trim();

  if (!cleanPrompt) {
    return "Tell me where you want to go and I’ll build a travel plan for you.";
  }

  return I can help with that. Based on "${cleanPrompt}", I would build flights, hotels, daily activities, transportation, budget estimates, and a full itinerary. Use the free trip planner below to generate the full version.;
}

function handleAssistantSubmit(event) {
  event.preventDefault();

  const message = assistantInput.value.trim();

  if (!message) return;

  addChatMessage("user", message);
  assistantInput.value = "";

  setTimeout(() => {
    addChatMessage("ai", buildAIResponse(message));
  }, 650);
}

function handleHeroSubmit(event) {
  event.preventDefault();

  const prompt = heroTripInput.value.trim();

  if (!prompt) {
    showToast("Type a trip idea first.");
    return;
  }

  addChatMessage("user", prompt);

  setTimeout(() => {
    addChatMessage("ai", buildAIResponse(prompt));
    document.getElementById("planner").scrollIntoView({ behavior: "smooth" });
  }, 500);
}

function getStyleMultiplier(style) {
  if (style === "budget") return 0.72;
  if (style === "standard") return 1;
  if (style === "luxury") return 1.75;
  if (style === "ultra") return 3.25;
  return 1;
}

function calculateTripCosts(destination, travelers, days, style, budget) {
  const multiplier = getStyleMultiplier(style);

  const flightBase = 520 * travelers * multiplier;
  const hotelBase = 180 * days * multiplier;
  const foodBase = 85 * days * travelers * multiplier;
  const activityBase = 120 * days * travelers * multiplier;
  const transportBase = 55 * days * multiplier;

  let total = flightBase + hotelBase + foodBase + activityBase + transportBase;

  if (budget && budget > 0) {
    const budgetWeight = Math.min(Math.max(budget / total, 0.72), 1.28);

    total = total * budgetWeight;

    return {
      flights: flightBase * budgetWeight,
      hotels: hotelBase * budgetWeight,
      food: foodBase * budgetWeight,
      activities: activityBase * budgetWeight,
      transport: transportBase * budgetWeight,
      total
    };
  }

  return {
    flights: flightBase,
    hotels: hotelBase,
    food: foodBase,
    activities: activityBase,
    transport: transportBase,
    total
  };
}

function generateItinerary(destination, days, tripType, style) {
  const themes = {
    romantic: ["Arrival and sunset dinner", "Old town walk and waterfront views", "Private beach or spa day", "Couples tasting experience", "Scenic day trip", "Luxury dinner and nightlife", "Relaxed checkout and final photos"],
    family: ["Arrival and easy local dinner", "Family landmark tour", "Beach or nature day", "Museum and kid-friendly activities", "Local food market", "Theme park or outdoor adventure", "Relaxed final morning"],
    business: ["Arrival and hotel check-in", "Meetings and local dinner", "Conference or client day", "Networking and premium dining", "Work block and city tour", "Final meetings", "Departure prep"],
    adventure: ["Arrival and gear check", "Guided outdoor experience", "Hiking or water adventure", "Local culture day", "Extreme activity", "Scenic route and recovery", "Departure"],
    luxury: ["VIP arrival and hotel check-in", "Private city tour", "Fine dining and shopping", "Yacht, beach club, or spa day", "Exclusive cultural experience", "Luxury day trip", "Private transfer and departure"]
  };

  const selected = themes[tripType] || themes.luxury;
  const list = [];

  for (let i = 1; i <= days; i++) {
    const theme = selected[(i - 1) % selected.length];

    list.push({
      day: i,
      title: Day ${i}: ${theme},
      details: TravelAir.ai recommends a ${style} day in ${destination} with smart timing, local experiences, food recommendations, and transportation planning.
    });
  }

return list;
}

function renderTripPlan(trip) {
  document.getElementById("resultTitle").textContent = ${trip.days}-day ${trip.destination} trip;

  document.getElementById("flightCost").textContent = money(trip.costs.flights);
  document.getElementById("hotelCost").textContent = money(trip.costs.hotels);
  document.getElementById("foodCost").textContent = money(trip.costs.food);
  document.getElementById("activityCost").textContent = money(trip.costs.activities);
  document.getElementById("transportCost").textContent = money(trip.costs.transport);
  document.getElementById("totalCost").textContent = money(trip.costs.total);

  const itineraryList = document.getElementById("itineraryList");
  itineraryList.innerHTML = "";

  trip.itinerary.forEach((item) => {
    const dayCard = document.createElement("div");
    dayCard.className = "itinerary-day";

    dayCard.innerHTML = `
      <span>Day ${item.day}</span>
      <h3>${item.title}</h3>
      <p>${item.details}</p>
    `;

    itineraryList.appendChild(dayCard);
  });
}

function handleTripBuilder(event) {
  event.preventDefault();

  const destination = document.getElementById("destinationInput").value.trim();
  const travelers = Number(document.getElementById("travelersInput").value);
  const days = Number(document.getElementById("daysInput").value);
  const style = document.getElementById("styleInput").value;
  const budget = Number(document.getElementById("budgetInput").value);
  const tripType = document.getElementById("tripTypeInput").value;

  if (!destination) {
    showToast("Enter a destination first.");
    return;
  }

  const costs = calculateTripCosts(destination, travelers, days, style, budget);
  const itinerary = generateItinerary(destination, days, tripType, style);

  currentTrip = {
    id: Date.now(),
    destination,
    travelers,
    days,
    style,
    budget,
    tripType,
    costs,
    itinerary
  };

  renderTripPlan(currentTrip);

  addChatMessage("ai", I created your ${days}-day ${destination} trip with a ${style} travel style. Estimated total: ${money(costs.total)}.);

  showToast("AI trip plan generated.");
}

function getSavedTrips() {
  const saved = localStorage.getItem("travelair_saved_trips");

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function setSavedTrips(trips) {
  localStorage.setItem("travelair_saved_trips", JSON.stringify(trips));
}

function renderSavedTrips() {
  const trips = getSavedTrips();

  if (!savedTripsGrid) return;

  if (!trips.length) {
    savedTripsGrid.innerHTML = `
      <div class="empty-state">
        No saved trips yet. Generate a trip and click Save Trip.
      </div>
    `;
    return;
  }

  savedTripsGrid.innerHTML = "";

  trips.forEach((trip) => {
    const card = document.createElement("div");
    card.className = "saved-trip-card";

    card.innerHTML = `
      <h3>${trip.destination}</h3>
      <p>${trip.days} days • ${trip.travelers} traveler${trip.travelers > 1 ? "s" : ""} • ${trip.style}</p>
      <p><strong>${money(trip.costs.total)}</strong> estimated total</p>
      <button class="dark-btn full" type="button" data-load-trip="${trip.id}">Load Trip</button>
    `;

    savedTripsGrid.appendChild(card);
  });
}

function saveCurrentTrip() {
  if (!currentTrip) {
    showToast("Generate a trip before saving.");
    return;
  }

  const trips = getSavedTrips();
  const existingIndex = trips.findIndex((trip) => trip.id === currentTrip.id);

  if (existingIndex >= 0) {
    trips[existingIndex] = currentTrip;
  } else {
    trips.unshift(currentTrip);
  }

  setSavedTrips(trips.slice(0, 9));
  renderSavedTrips();
  showToast("Trip saved.");
}

function clearSavedTrips() {
  localStorage.removeItem("travelair_saved_trips");
  renderSavedTrips();
  showToast("Saved trips cleared.");
}

function loadSavedTrip(id) {
  const trips = getSavedTrips();
  const trip = trips.find((item) => String(item.id) === String(id));

  if (!trip) return;

  currentTrip = trip;
  renderTripPlan(trip);
  document.getElementById("planner").scrollIntoView({ behavior: "smooth" });
  showToast(${trip.destination} trip loaded.);
}

function handleSavedTripsClick(event) {
  const button = event.target.closest("[data-load-trip]");

  if (!button) return;

  loadSavedTrip(button.dataset.loadTrip);
}

function handleQuickPrompts() {
  const promptButtons = document.querySelectorAll("[data-prompt]");

  promptButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.prompt;

      heroTripInput.value = prompt;
      addChatMessage("user", prompt);

      setTimeout(() => {
        addChatMessage("ai", buildAIResponse(prompt));
      }, 500);
    });
  });
}

function handleTravelCards() {
  const cards = document.querySelectorAll(".travel-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.remove("active"));
      card.classList.add("active");

      const category = card.dataset.category;
      addChatMessage("ai", You selected ${category}. TravelAir.ai can include ${category.toLowerCase()} inside your AI-generated travel plan.);
      showToast(${category} selected.);
    });
  });
}

function handleWaitlistSubmit(event) {
  const form = event.target;
  const emailInput = form.querySelector("input[type='email']");

  if (!emailInput || !emailInput.value.trim()) {
    event.preventDefault();
    showToast("Enter your email first.");
    return;
  }

  const currentCount = Number(localStorage.getItem("travelair_member_count") || "24842");
  const nextCount = currentCount + 1;

  localStorage.setItem("travelair_member_count", String(nextCount));
  updateMemberCounter();

  showToast("You joined the TravelAir.ai waitlist.");
}

function updateMemberCounter() {
  const count = Number(localStorage.getItem("travelair_member_count") || "24842");

  if (memberCounter) {
    memberCounter.textContent = ${count.toLocaleString()}+;
  }
}

function handlePreviewButtons() {
  const viewItineraryBtn = document.getElementById("viewItineraryBtn");
  const customizeTripBtn = document.getElementById("customizeTripBtn");

  if (viewItineraryBtn) {
    viewItineraryBtn.addEventListener("click", () => {
      document.querySelector(".results-card").scrollIntoView({ behavior: "smooth" });
      showToast("Open the planner to generate your full itinerary.");
    });
  }

  if (customizeTripBtn) {
    customizeTripBtn.addEventListener("click", () => {
      document.querySelector(".planner-card").scrollIntoView({ behavior: "smooth" });
      showToast("Customize your trip below.");
    });
  }
}

function bootTravelAir() {
  if (assistantForm) assistantForm.addEventListener("submit", handleAssistantSubmit);
  if (heroPlannerForm) heroPlannerForm.addEventListener("submit", handleHeroSubmit);
  if (tripBuilderForm) tripBuilderForm.addEventListener("submit", handleTripBuilder);
  if (saveTripBtn) saveTripBtn.addEventListener("click", saveCurrentTrip);
  if (clearTripsBtn) clearTripsBtn.addEventListener("click", clearSavedTrips);
  if (savedTripsGrid) savedTripsGrid.addEventListener("click", handleSavedTripsClick);
  if (waitlistForm) waitlistForm.addEventListener("submit", handleWaitlistSubmit);
  if (footerWaitlistForm) footerWaitlistForm.addEventListener("submit", handleWaitlistSubmit);

  handleQuickPrompts();
  handleTravelCards();
  handlePreviewButtons();
  updateMemberCounter();
  renderSavedTrips();
}

document.addEventListener("DOMContentLoaded", bootTravelAir);
