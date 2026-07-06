/* =========================================================
   TravelAir.ai — Working MVP Script
   Replace your entire script.js with all parts in order.
   ========================================================= */

"use strict";

const TA = {
  currentTrip: null,
  selectedCategory: "Flights",
  storageKey: "travelair_saved_trips",
  memberKey: "travelair_member_count",
  baseMembers: 24842
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  toast: $("#toast"),
  chatWindow: $("#chatWindow"),
  assistantForm: $("#assistantForm"),
  assistantInput: $("#assistantInput"),
  heroPlannerForm: $("#heroPlannerForm"),
  heroTripInput: $("#heroTripInput"),
  tripBuilderForm: $("#tripBuilderForm"),
  saveTripBtn: $("#saveTripBtn"),
  clearTripsBtn: $("#clearTripsBtn"),
  savedTripsGrid: $("#savedTripsGrid"),
  waitlistForm: $("#waitlistForm"),
  footerWaitlistForm: $("#footerWaitlistForm"),
  memberCounter: $("#memberCounter"),
  resultTitle: $("#resultTitle"),
  itineraryList: $("#itineraryList"),
  flightCost: $("#flightCost"),
  hotelCost: $("#hotelCost"),
  foodCost: $("#foodCost"),
  activityCost: $("#activityCost"),
  transportCost: $("#transportCost"),
  totalCost: $("#totalCost"),
  destinationInput: $("#destinationInput"),
  travelersInput: $("#travelersInput"),
  daysInput: $("#daysInput"),
  styleInput: $("#styleInput"),
  budgetInput: $("#budgetInput"),
  tripTypeInput: $("#tripTypeInput")
};

function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value) {
  return "$" + Math.round(Number(value) || 0).toLocaleString();
}

function titleCase(value) {
  return String(value || "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function showToast(message) {
  if (!els.toast) return;

  els.toast.textContent = message;
  els.toast.classList.add("show");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2600);
}

function scrollToElement(selector) {
  const target = $(selector);
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function addChatMessage(type, message) {
  if (!els.chatWindow) return;

  const row = document.createElement("div");
  row.className = chat-message ${type};

  if (type === "ai") {
    row.innerHTML = <span>TA</span><p>${safeText(message)}</p>;
  } else {
    row.innerHTML = <p>${safeText(message)}</p>;
  }

  els.chatWindow.appendChild(row);
  els.chatWindow.scrollTop = els.chatWindow.scrollHeight;
}

function addTypingMessage() {
  if (!els.chatWindow) return null;

  const row = document.createElement("div");
  row.className = "chat-message ai typing-message";
  row.innerHTML = <span>TA</span><p>TravelAir AI is building your plan...</p>;

  els.chatWindow.appendChild(row);
  els.chatWindow.scrollTop = els.chatWindow.scrollHeight;

  return row;
}

function removeTypingMessage(row) {
  if (row && row.parentNode) {
    row.parentNode.removeChild(row);
  }
}

function getDestinationProfile(destination) {
  const key = String(destination || "").trim().toLowerCase();

  const profiles = {
    greece: {
      cities: "Athens • Santorini • Mykonos",
      hotel: "Luxury boutique hotel near the water",
      airport: "ATH",
      bestTime: "May to October",
      vibe: "island sunsets, ruins, beach clubs, seafood, and luxury views",
      activities: ["Private Acropolis tour", "Santorini sunset cruise", "Mykonos beach club", "Greek wine tasting"]
    },
    bali: {
      cities: "Ubud • Seminyak • Uluwatu",
      hotel: "Private villa with pool",
      airport: "DPS",
      bestTime: "April to October",
      vibe: "jungle villas, beaches, temples, wellness, and ocean clubs",
      activities: ["Ubud rice terraces", "Uluwatu sunset", "Private waterfall tour", "Beach club day"]
    },
    italy: {
      cities: "Rome • Florence • Amalfi Coast",
      hotel: "Historic city hotel with premium location",
      airport: "FCO",
      bestTime: "April to June or September to October",
      vibe: "food, culture, history, coastlines, wine, and architecture",
      activities: ["Colosseum tour", "Tuscan wine tasting", "Amalfi boat day", "Michelin-style dinner"]
    },
    dubai: {
      cities: "Downtown Dubai • Marina • Palm Jumeirah",
      hotel: "Five-star hotel with skyline views",
      airport: "DXB",
      bestTime: "November to March",
      vibe: "luxury shopping, desert experiences, rooftop dining, and world-class hotels",
      activities: ["Burj Khalifa", "Desert safari", "Dubai Marina yacht", "Luxury shopping"]
    },
    paris: {
      cities: "Paris",
      hotel: "Luxury hotel near the Seine",
      airport: "CDG",
      bestTime: "April to June or September to November",
      vibe: "romance, fashion, museums, cafes, fine dining, and architecture",
      activities: ["Eiffel Tower", "Louvre private tour", "Seine dinner cruise", "Montmartre walk"]
    },
    miami: {
      cities: "Miami Beach • Brickell • Wynwood",
      hotel: "Oceanfront hotel in Miami Beach",
      airport: "MIA",
      bestTime: "November to April",
      vibe: "beaches, nightlife, restaurants, yachts, art, and luxury hotels",
      activities: ["South Beach", "Private yacht charter", "Wynwood tour", "Brickell dinner"]
    },
    japan: {
      cities: "Tokyo • Kyoto • Osaka",
      hotel: "Modern luxury hotel near transit",
      airport: "HND",
      bestTime: "March to May or October to November",
      vibe: "culture, temples, food, technology, shopping, and scenic day trips",
      activities: ["Tokyo food tour", "Kyoto temples", "Mount Fuji day trip", "Osaka nightlife"]
    },
    switzerland: {
      cities: "Zurich • Lucerne • Zermatt",
      hotel: "Alpine luxury hotel with mountain views",
      airport: "ZRH",
      bestTime: "December to March for winter, June to September for summer",
      vibe: "mountains, trains, lakes, skiing, luxury hotels, and scenic views",
      activities: ["Zermatt mountain day", "Glacier train", "Lake Lucerne", "Swiss spa day"]
    }
  };

  for (const name in profiles) {
    if (key.includes(name)) return profiles[name];
  }

  return {
    cities: titleCase(destination),
    hotel: "Highly rated hotel matched to your budget",
    airport: "Best nearby airport",
    bestTime: "Based on season, budget, and travel style",
    vibe: "personalized hotels, food, activities, transportation, and local experiences",
    activities: ["City highlights", "Local food experience", "Scenic tour", "Flexible free time"]
  };
}
