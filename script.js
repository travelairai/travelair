const tripSearchInput = document.querySelector(".hero-search input");
const tripSearchButton = document.querySelector(".hero-search button");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatWindow = document.querySelector(".chat-window");
const categoryButtons = document.querySelectorAll(".travel-categories button");

const sampleTrips = {
  santorini: {
    title: "Santorini Luxury Escape",
    message: "I found a 5 day Santorini plan with luxury hotel options, yacht sunset cruise, private transfers, dining, and estimated budget.",
  },
  maldives: {
    title: "Maldives Private Island Trip",
    message: "I found overwater villas, seaplane transfers, private dining, snorkeling, spa packages, and premium resort options.",
  },
  dubai: {
    title: "Dubai Luxury Experience",
    message: "I found business class flight ideas, five star hotels, desert safari, yacht charter, fine dining, and luxury shopping options.",
  },
  tokyo: {
    title: "Tokyo AI Travel Plan",
    message: "I found boutique hotels, food tours, cultural experiences, nightlife, shopping districts, and daily itinerary ideas.",
  },
};

function addChatMessage(text, type = "ai") {
  const message = document.createElement("div");
  message.className = chat-message ${type};
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function generateTrip(destination) {
  const cleanDestination = destination.trim();

  if (!cleanDestination) {
    addChatMessage("Tell me where you want to travel and I will build a trip plan.", "ai");
    return;
  }

  addChatMessage(Plan a trip to ${cleanDestination}., "user");

  const key = cleanDestination.toLowerCase();
  const match = Object.keys(sampleTrips).find((city) => key.includes(city));

  setTimeout(() => {
    if (match) {
      addChatMessage(sampleTrips[match].message, "ai");
    } else {
      addChatMessage(
        I created a premium AI trip concept for ${cleanDestination}: flights, hotels, restaurants, experiences, estimated budget, and a day-by-day itinerary.,
        "ai"
      );
    }
  }, 500);
}

tripSearchButton.addEventListener("click", () => {
  generateTrip(tripSearchInput.value);
});

tripSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateTrip(tripSearchInput.value);
  }
});

chatSend.addEventListener("click", () => {
  generateTrip(chatInput.value);
  chatInput.value = "";
});

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateTrip(chatInput.value);
    chatInput.value = "";
  }
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addChatMessage(
      Show me ${button.textContent} options for my next trip.,
      "user"
    );

    setTimeout(() => {
      addChatMessage(
        TravelAir AI is preparing ${button.textContent.toLowerCase()} recommendations with premium options, estimated pricing, and smart timing.,
        "ai"
      );
    }, 400);
  });
});

const waitlistButtons = document.querySelectorAll(".waitlist-btn, .primary-action");

waitlistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const waitlistSection = document.getElementById("waitlist");

    if (waitlistSection) {
      waitlistSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });
});

const waitlistForm = document.querySelector(".waitlist-form");

if (waitlistForm) {
  waitlistForm.addEventListener("submit", () => {
    const submitButton = waitlistForm.querySelector("button");

    submitButton.textContent = "Submitting...";
  });
}

const cards = document.querySelectorAll(
  ".feature-card, .destination-card, .dash-card, .featured-trip, .ai-panel"
);

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-card");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

cards.forEach((card) => {
  card.classList.add("hide-card");
  cardObserver.observe(card);
});

document.addEventListener("mousemove", (event) => {
  const glow = document.querySelector(".background-glow");

  if (!glow) return;

  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  glow.style.transform = translate(${x * 18}px, ${y * 18}px);
});
