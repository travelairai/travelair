const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const tripForm = document.getElementById("tripForm");
const tripResult = document.getElementById("tripResult");
const destinationInput = document.getElementById("destination");

const destinationData = {
  Greece: ["Athens arrival", "Acropolis tour", "Santorini sunset", "Beach day", "Island dinner"],
  Japan: ["Tokyo arrival", "Shibuya and sushi", "Kyoto temples", "Osaka food tour", "Mount Fuji views"],
  Italy: ["Rome arrival", "Colosseum tour", "Florence day trip", "Venice canals", "Wine and dinner"],
  Dubai: ["Luxury hotel check-in", "Burj Khalifa", "Desert safari", "Beach club", "Marina dinner"],
  Maldives: ["Resort arrival", "Snorkeling", "Spa day", "Island hopping", "Sunset dinner"],
  Brazil: ["Rio arrival", "Christ the Redeemer", "Copacabana beach", "Sugarloaf Mountain", "Brazilian dinner"],
  Paris: ["Paris arrival", "Eiffel Tower", "Louvre Museum", "Seine dinner cruise", "Montmartre walk"],
  Thailand: ["Bangkok arrival", "Temple tour", "Island transfer", "Beach day", "Night market"]
};

function generateTrip(place, from, budget, travelers, days, style) {
  const ideas = destinationData[place] || [
    ${place} arrival,
    "Explore top attractions",
    "Local food and culture",
    "Relaxation and flexible time",
    "Final day highlights"
  ];

  const flight = Math.round(budget * 0.32);
  const hotel = Math.round(budget * 0.38);
  const food = Math.round(budget * 0.15);
  const activities = Math.round(budget * 0.15);

  let dailyPlan = "";
  for (let i = 0; i < days; i++) {
    dailyPlan += <li><strong>Day ${i + 1}:</strong> ${ideas[i % ideas.length]}</li>;
  }

  tripResult.innerHTML = `
    <h3>${style} ${days}-day trip to ${place}</h3>
    <p>
      Sample plan for <strong>${travelers}</strong> traveler${travelers > 1 ? "s" : ""}
      ${from ? leaving from <strong>${from}</strong> : ""}.
      Estimated budget: <strong>$${budget.toLocaleString()}</strong>.
    </p>

    <ul>${dailyPlan}</ul>

    <div class="budget-row"><span>Flights</span><strong>$${flight.toLocaleString()}</strong></div>
    <div class="budget-row"><span>Hotels</span><strong>$${hotel.toLocaleString()}</strong></div>
    <div class="budget-row"><span>Food</span><strong>$${food.toLocaleString()}</strong></div>
    <div class="budget-row"><span>Activities</span><strong>$${activities.toLocaleString()}</strong></div>
  `;
}

if (tripForm) {
  tripForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const from = document.getElementById("fromAirport").value.trim();
    const place = destinationInput.value.trim() || "Greece";
    const budget = Number(document.getElementById("budget").value) || 4000;
    const travelers = Number(document.getElementById("travelers").value) || 2;
    const days = Number(document.getElementById("days").value) || 5;
    const style = document.getElementById("style").value || "Luxury";

    generateTrip(place, from, budget, travelers, days, style);
  });
}

document.querySelectorAll(".destination-card").forEach((card) => {
  card.addEventListener("click", () => {
    const place = card.dataset.place;

    destinationInput.value = place;
    document.getElementById("fromAirport").value = "Miami";
    document.getElementById("budget").value = 4000;
    document.getElementById("travelers").value = 2;
    document.getElementById("days").value = 5;
    document.getElementById("style").value = "Luxury";

    generateTrip(place, "Miami", 4000, 2, 5, "Luxury");
    document.getElementById("planner").scrollIntoView({ behavior: "smooth" });
  });
});
