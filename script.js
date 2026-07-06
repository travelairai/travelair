const destinations = {
  Greece: {
    airport: "ATH",
    hotel: "Canaves Oia Suites",
    region: "Santorini • Mykonos • Athens",
    flightBase: 1140,
    hotelBase: 620,
    foodBase: 180,
    activityBase: 220,
    transportBase: 90,
    weather: "82°F",
    highlights: [
      "Santorini sunset dinner",
      "Private island cruise",
      "Athens Acropolis tour",
      "Mykonos beach club"
    ]
  },

  Italy: {
    airport: "FCO",
    hotel: "Hotel Eden Rome",
    region: "Rome • Florence • Amalfi Coast",
    flightBase: 980,
    hotelBase: 560,
    foodBase: 170,
    activityBase: 210,
    transportBase: 85,
    weather: "78°F",
    highlights: [
      "Colosseum private tour",
      "Tuscan wine experience",
      "Amalfi Coast drive",
      "Florence food walk"
    ]
  },

  Bali: {
    airport: "DPS",
    hotel: "Four Seasons Resort Bali",
    region: "Ubud • Seminyak • Nusa Dua",
    flightBase: 1280,
    hotelBase: 480,
    foodBase: 120,
    activityBase: 160,
    transportBase: 70,
    weather: "84°F",
    highlights: [
      "Ubud jungle villa",
      "Waterfall experience",
      "Temple tour",
      "Beach club day"
    ]
  },

  Paris: {
    airport: "CDG",
    hotel: "Four Seasons George V",
    region: "Paris • Versailles • Seine",
    flightBase: 1040,
    hotelBase: 680,
    foodBase: 190,
    activityBase: 230,
    transportBase: 85,
    weather: "74°F",
    highlights: [
      "Eiffel Tower dinner",
      "Louvre private tour",
      "Seine river cruise",
      "Luxury shopping day"
    ]
  },

  Dubai: {
    airport: "DXB",
    hotel: "Burj Al Arab",
    region: "Dubai Marina • Desert • Downtown",
    flightBase: 1390,
    hotelBase: 790,
    foodBase: 210,
    activityBase: 260,
    transportBase: 110,
    weather: "101°F",
    highlights: [
      "Burj Khalifa",
      "Desert safari",
      "Private yacht charter",
      "Luxury mall experience"
    ]
  },

  Japan: {
    airport: "HND",
    hotel: "Aman Tokyo",
    region: "Tokyo • Kyoto • Mt. Fuji",
    flightBase: 1260,
    hotelBase: 610,
    foodBase: 160,
    activityBase: 210,
    transportBase: 95,
    weather: "80°F",
    highlights: [
      "Tokyo food tour",
      "Kyoto temple walk",
      "Mount Fuji day trip",
      "Private sushi experience"
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  setupHeaderScroll();
  setupMobileMenu();
  setupHeroSearch();
  setupQuickPrompts();
  setupDestinationCards();
  setupPlanner();
  setupAIChat();
  setupWaitlist();
  animateCounters();
  revealOnScroll();
});

function setCurrentYear() {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function setupHeaderScroll() {
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
    document.body.classList.toggle("nav-open");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      document.body.classList.remove("nav-open");
    });
  });
}

function setupHeroSearch() {
  const form = document.getElementById("heroSearch");
  const input = document.getElementById("heroDestination");
  const destinationInput = document.getElementById("destinationInput");

  if (!form || !input || !destinationInput) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = input.value.trim() || "Greece";
    destinationInput.value = value;

    scrollToPlanner();
    generateTripPlan(value);
  });
}

function setupQuickPrompts() {
  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.prompt || "Greece";
      const destinationInput = document.getElementById("destinationInput");
      const chatInput = document.getElementById("aiChatInput");

      if (destinationInput) destinationInput.value = extractDestination(prompt);
      if (chatInput) chatInput.value = prompt;

      scrollToPlanner();
      generateTripPlan(extractDestination(prompt));
      addChatMessage("user", prompt);
      simulateAIResponse(prompt);
    });
  });
}

function setupDestinationCards() {
  document.querySelectorAll(".destination-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".destination-card").forEach((item) => {
        item.classList.remove("selected");
      });

      card.classList.add("selected");

      const destination = card.dataset.destination || "Greece";
      const destinationInput = document.getElementById("destinationInput");

      if (destinationInput) destinationInput.value = destination;

      scrollToPlanner();
      generateTripPlan(destination);
    });
  });
}

function setupPlanner() {
  const form = document.getElementById("tripPlannerForm");

  const inputs = [
    "destinationInput",
    "travelersInput",
    "daysInput",
    "styleInput",
    "budgetInput",
    "departureInput"
  ];

  inputs.forEach((id) => {
    const input = document.getElementById(id);

    if (input) {
      input.addEventListener("input", updateLivePreview);
      input.addEventListener("change", updateLivePreview);
    }
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const destination =
        document.getElementById("destinationInput")?.value.trim() || "Greece";

      generateTripPlan(destination);
    });
  }

  updateLivePreview();
}

function updateLivePreview() {
  const destination =
    document.getElementById("destinationInput")?.value.trim() || "Greece";

  const trip = getDestinationData(destination);
  const costs = calculateTripCosts(trip);

  updateSnapshot(destination, trip, costs);
  updateDashboard(costs);
}

function generateTripPlan(destinationName) {
  const output = document.getElementById("plannerOutput");

  if (!output) return;

  const trip = getDestinationData(destinationName);
  const costs = calculateTripCosts(trip);
  const details = getPlannerDetails();

  output.innerHTML = `
    <div class="ai-result-card">
      <div class="ai-result-top">
        <div>
          <span>TravelAir AI is thinking</span>
          <h3>${escapeHTML(trip.name)} ${escapeHTML(details.style)} Trip</h3>
          <p>
            ${escapeHTML(details.days)} days from ${escapeHTML(details.departure)}
            for ${escapeHTML(details.travelers)} traveler${details.travelers === 1 ? "" : "s"}.
            Estimated weather: ${escapeHTML(trip.weather)}.
          </p>
        </div>

        <div class="ai-thinking">
          <i></i><i></i><i></i>
        </div>
      </div>

      <div class="cost-grid">
        <div class="cost-box">
          <span>Flights</span>
          <strong>$${costs.flights.toLocaleString()}</strong>
        </div>

        <div class="cost-box">
          <span>Hotels</span>
          <strong>$${costs.hotels.toLocaleString()}</strong>
        </div>

        <div class="cost-box">
          <span>Dining</span>
          <strong>$${costs.food.toLocaleString()}</strong>
        </div>

        <div class="cost-box">
          <span>Activities</span>
          <strong>$${costs.activities.toLocaleString()}</strong>
        </div>

        <div class="cost-box">
          <span>Transport</span>
          <strong>$${costs.transport.toLocaleString()}</strong>
        </div>

        <div class="cost-box">
          <span>Total Estimate</span>
          <strong>$${costs.total.toLocaleString()}</strong>
        </div>
      </div>

      <div>
        <h4>Recommended Hotel</h4>
        <p>${escapeHTML(trip.hotel)} · Airport: ${escapeHTML(trip.airport)} · ${escapeHTML(trip.region)}</p>
      </div>

      <ul class="trip-days">
        ${buildItineraryDays(trip, details.days)}
      </ul>

      <button class="btn btn-gold" type="button" onclick="saveCurrentTrip()">
        Save This Trip
      </button>
    </div>
  `;

  updateSnapshot(destinationName, trip, costs);
  updateDashboard(costs);
}

function getPlannerDetails() {
  return {
    destination: document.getElementById("destinationInput")?.value.trim() || "Greece",
    travelers: Number(document.getElementById("travelersInput")?.value) || 2,
    days: Number(document.getElementById("daysInput")?.value) || 7,
    style: document.getElementById("styleInput")?.value || "Luxury",
    budget: document.getElementById("budgetInput")?.value || "premium",
    departure: document.getElementById("departureInput")?.value.trim() || "Miami"
  };
}

function getDestinationData(destinationName) {
  const clean = String(destinationName).toLowerCase();

  for (const key in destinations) {
    if (clean.includes(key.toLowerCase())) {
      return {
        name: key,
        ...destinations[key]
      };
    }
  }

  return {
    name: "Greece",
    ...destinations.Greece
  };
}

function calculateTripCosts(trip) {
  const details = getPlannerDetails();

  const multipliers = {
    value: 0.78,
    standard: 1,
    premium: 1.25,
    luxury: 1.55,
    executive: 1.9
  };

  const multiplier = multipliers[details.budget] || 1.25;

  const flights = Math.round(trip.flightBase * details.travelers);
  const hotels = Math.round(trip.hotelBase * details.days * multiplier);
  const food = Math.round(trip.foodBase * details.days * details.travelers * multiplier);
  const activities = Math.round(trip.activityBase * details.days * details.travelers * multiplier);
  const transport = Math.round(trip.transportBase * details.days * multiplier);

  const total = flights + hotels + food + activities + transport;

  return {
    flights,
    hotels,
    food,
    activities,
    transport,
    total
  };
}

function buildItineraryDays(trip, days) {
  let html = "";

  for (let day = 1; day <= days; day++) {
    const highlight = trip.highlights[(day - 1) % trip.highlights.length];

    if (day === 1) {
      html += `
        <li>
          <strong>Day ${day}</strong>
          <span>Arrive at ${escapeHTML(trip.airport)}, check into ${escapeHTML(trip.hotel)}, and enjoy a welcome dinner near ${escapeHTML(trip.region)}.</span>
        </li>
      `;
    } else if (day === days) {
      html += `
        <li>
          <strong>Day ${day}</strong>
          <span>Final breakfast, checkout, airport transfer, and one last AI-recommended experience before departure.</span>
        </li>
      `;
    } else {
      html += `
        <li>
          <strong>Day ${day}</strong>
          <span>${escapeHTML(highlight)} with curated dining, flexible downtime, transportation planning, and premium local recommendations.</span>
        </li>
      `;
    }
  }

  return html;
}

function updateSnapshot(destinationName, trip, costs) {
  const details = getPlannerDetails();

  const snapshotDestination = document.getElementById("snapshotDestination");
  const snapshotDetails = document.getElementById("snapshotDetails");
  const snapshotFlights = document.getElementById("snapshotFlights");
  const snapshotHotels = document.getElementById("snapshotHotels");
  const snapshotTotal = document.getElementById("snapshotTotal");

  if (snapshotDestination) {
    snapshotDestination.textContent = ${trip.name} ${details.style} Escape;
  }

  if (snapshotDetails) {
    snapshotDetails.textContent = ${details.days} days · ${details.travelers} traveler${details.travelers === 1 ? "" : "s"} · ${details.budget};
  }

  if (snapshotFlights) {
    snapshotFlights.textContent = $${costs.flights.toLocaleString()};
  }

  if (snapshotHotels) {
    snapshotHotels.textContent = $${costs.hotels.toLocaleString()};
  }

  if (snapshotTotal) {
    snapshotTotal.textContent = $${costs.total.toLocaleString()};
  }
}

function updateDashboard(costs) {
  const flightPrice = document.getElementById("dashboardFlightPrice");
  const hotelPrice = document.getElementById("dashboardHotelPrice");
  const activityPrice = document.getElementById("dashboardActivityPrice");
  const totalPrice = document.getElementById("dashboardTotal");

  if (flightPrice) {
    flightPrice.textContent = $${costs.flights.toLocaleString()};
  }

  if (hotelPrice) {
    hotelPrice.textContent = $${costs.hotels.toLocaleString()};
  }

  if (activityPrice) {
    activityPrice.textContent = $${costs.activities.toLocaleString()};
  }

  if (totalPrice) {
    totalPrice.textContent = $${costs.total.toLocaleString()};
  }
}

function setupAIChat() {
  const form = document.getElementById("aiChatForm");
  const input = document.getElementById("aiChatInput");

  if (!form || !input) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (!message) return;

    addChatMessage("user", message);

    input.value = "";

    simulateAIResponse(message);
  });
}

function addChatMessage(type, text) {
  const chatWindow = document.getElementById("aiChatWindow");

  if (!chatWindow) return;

  const message = document.createElement("div");

  message.className = chat-message ${type};

  message.innerHTML = `
    <strong>${type === "user" ? "You" : "TravelAir.ai"}</strong>
    <p>${escapeHTML(text)}</p>
  `;

  chatWindow.appendChild(message);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function simulateAIResponse(message) {
  const destination = extractDestination(message);
  const destinationInput = document.getElementById("destinationInput");

  if (destinationInput) {
    destinationInput.value = destination;
  }

  const trip = getDestinationData(destination);
  const costs = calculateTripCosts(trip);
  const details = getPlannerDetails();

  addThinkingMessage();

  setTimeout(() => {
    removeThinkingMessage();

    addChatMessage(
      "bot",
      I built a ${details.days}-day ${details.style} trip to ${trip.name}. Estimated total is $${costs.total.toLocaleString()} including flights, hotel, dining, activities, and transportation. I recommend staying at ${trip.hotel} and flying into ${trip.airport}.
    );

    generateTripPlan(destination);
  }, 900);
}

function addThinkingMessage() {
  const chatWindow = document.getElementById("aiChatWindow");

  if (!chatWindow) return;

  const thinking = document.createElement("div");
  thinking.className = "chat-message bot thinking-message";
  thinking.innerHTML = `
    <strong>TravelAir.ai</strong>
    <p>Thinking through flights, hotels, experiences, and budget...</p>
  `;

  chatWindow.appendChild(thinking);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeThinkingMessage() {
  const thinking = document.querySelector(".thinking-message");

  if (thinking) {
    thinking.remove();
  }
}

function extractDestination(text) {
  const clean = String(text).toLowerCase();

  if (clean.includes("greece") || clean.includes("santorini") || clean.includes("mykonos") || clean.includes("athens")) return "Greece";
  if (clean.includes("italy") || clean.includes("rome") || clean.includes("florence") || clean.includes("amalfi")) return "Italy";
  if (clean.includes("bali") || clean.includes("indonesia") || clean.includes("ubud")) return "Bali";
  if (clean.includes("paris") || clean.includes("france")) return "Paris";
  if (clean.includes("dubai")) return "Dubai";
  if (clean.includes("japan") || clean.includes("tokyo") || clean.includes("kyoto")) return "Japan";

  return "Greece";
}

function saveCurrentTrip() {
  const details = getPlannerDetails();
  const trip = getDestinationData(details.destination);
  const costs = calculateTripCosts(trip);

  const savedTrips = JSON.parse(localStorage.getItem("travelairSavedTrips") || "[]");

  savedTrips.unshift({
    id: Date.now(),
    destination: trip.name,
    days: details.days,
    travelers: details.travelers,
    style: details.style,
    total: costs.total,
    hotel: trip.hotel
  });

  localStorage.setItem("travelairSavedTrips", JSON.stringify(savedTrips.slice(0, 6)));

  renderSavedTrips();
}
[9:36 PM, 7/5/2026] ..: function simulateAIResponse(message) {
  const destination = extractDestination(message);
  const destinationInput = document.getElementById("destinationInput");

  if (destinationInput) {
    destinationInput.value = destination;
  }

  const trip = getDestinationData(destination);
  const costs = calculateTripCosts(trip);
  const details = getPlannerDetails();

  addThinkingMessage();

  setTimeout(() => {
    removeThinkingMessage();

    addChatMessage(
      "bot",
      I built a ${details.days}-day ${details.style} trip to ${trip.name}. Estimated total is $${costs.total.toLocaleString()} including flights, hotel, dining, activities, and transportation. I recommend staying at ${trip.hotel} and flying into ${trip.airport}.
    );

    generateTripPlan(d…
[9:37 PM, 7/5/2026] ..: function renderSavedTrips() {
  const container = document.getElementById("savedTrips");

  if (!container) return;

  const savedTrips = JSON.parse(localStorage.getItem("travelairSavedTrips") || "[]");

  if (!savedTrips.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌎</div>
        <h3>No Saved Trips Yet</h3>
        <p>Create your first AI itinerary and save it here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = savedTrips
    .map((trip) => {
      return `
        <div class="saved-trip-card">
          <strong>${escapeHTML(trip.destination)}</strong>
          <span>${escapeHTML(trip.days)} days · ${escapeHTML(trip.travelers)} traveler${trip.travelers === 1 ? "" : "s"} · ${escapeHTML(trip.style)}</span>
          <b>$${Number(trip.total).toLocaleString()}</b>
          <p>${escapeHTML(trip.hotel)}</p>
        </div>
      `;
    })
    .join("");
}

function setupWaitlist() {
  const form = document.getElementById("waitlistForm");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const button = form.querySelector("button");

    if (button) {
      button.textContent = "You're In";
      button.classList.add("saved");
    }

    form.reset();
  });
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.count) || 0;
      let current = 0;
      const increment = Math.ceil(target / 80);

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          counter.textContent = target.toLocaleString() + "+";
          clearInterval(timer);
        } else {
          counter.textContent = current.toLocaleString() + "+";
        }
      }, 18);

      observer.unobserve(counter);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

function revealOnScroll() {
  const items = document.querySelectorAll(
    "section, .destination-card, .feature-card, .step-card, .dashboard-card, .saved-trip-card"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });

  renderSavedTrips();
}

function scrollToPlanner() {
  const planner = document.getElementById("planner");

  if (planner) {
    planner.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
