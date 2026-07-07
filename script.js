// TravelAir.ai Demo Planner

const form = document.getElementById("tripForm");
const result = document.getElementById("tripResult");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const itineraries = {
  Greece: {
    hotel: "Canaves Oia Suites",
    airport: "Athens (ATH)",
    highlight: "Santorini Sunset Cruise",
    food: "Traditional Greek Taverns"
  },
  Japan: {
    hotel: "Park Hyatt Tokyo",
    airport: "Tokyo (HND)",
    highlight: "Mount Fuji Day Tour",
    food: "Sushi & Ramen Experience"
  },
  Dubai: {
    hotel: "Atlantis The Royal",
    airport: "Dubai (DXB)",
    highlight: "Burj Khalifa & Desert Safari",
    food: "Luxury Dining"
  },
  Italy: {
    hotel: "Hotel Eden Rome",
    airport: "Rome (FCO)",
    highlight: "Colosseum & Amalfi Coast",
    food: "Authentic Italian Cuisine"
  },
  Brazil: {
    hotel: "Copacabana Palace",
    airport: "Rio (GIG)",
    highlight: "Christ the Redeemer",
    food: "Brazilian Churrasco"
  },
  Maldives: {
    hotel: "Soneva Jani",
    airport: "Malé (MLE)",
    highlight: "Overwater Villa",
    food: "Private Beach Dinner"
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const destination = document.getElementById("destination").value.trim();
  const budget = document.getElementById("budget").value;
  const days = document.getElementById("days").value;
  const style = document.getElementById("style").value;

  const trip = itineraries[destination] || {
    hotel: "Luxury Hotel",
    airport: "International Airport",
    highlight: "Top Local Attractions",
    food: "Local Restaurants"
  };

  result.innerHTML = `
    <h3>${destination} ${days}-Day AI Vacation Plan</h3>

    <p><strong>Estimated Budget:</strong> $${budget}</p>

    <p><strong>Travel Style:</strong> ${style}</p>

    <hr>

    <p>✈️ Flight Arrival: ${trip.airport}</p>

    <p>🏨 Hotel: ${trip.hotel}</p>

    <p>📍 Must Do: ${trip.highlight}</p>

    <p>🍽️ Food: ${trip.food}</p>

    <hr>

    <h4>Sample Itinerary</h4>

    <p><strong>Day 1:</strong> Arrival • Hotel Check-in • Welcome Dinner</p>

    <p><strong>Day 2:</strong> Explore top attractions • Local food • Nightlife</p>

    <p><strong>Day 3:</strong> Excursions • Shopping • Relaxation</p>

    <p><strong>Day 4:</strong> Hidden gems • Beach or Adventure</p>

    <p><strong>Day 5:</strong> Breakfast • Souvenir Shopping • Flight Home</p>

    <hr>

    <p style="color:#d8b04d;">
      ✔️ Flights Estimated<br>
      ✔️ Hotel Suggested<br>
      ✔️ Activities Planned<br>
      ✔️ Budget Organized
    </p>
  `;
});

document.querySelectorAll(".destination-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("destination").value =
      button.dataset.place;

    document
      .getElementById("planner")
      .scrollIntoView({
        behavior: "smooth"
      });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
