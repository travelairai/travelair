// ======================================
// TravelAir.ai V11
// ======================================

// Footer Year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Planner Elements
const tripForm = document.getElementById("tripForm");
const tripResult = document.getElementById("tripResult");

const fromAirport = document.getElementById("fromAirport");
const destination = document.getElementById("destination");
const budget = document.getElementById("budget");
const travelers = document.getElementById("travelers");
const days = document.getElementById("days");
const style = document.getElementById("style");

// Sample Destination Data
const trips = {

  Greece:{
    hotel:"Canaves Oia Suites",
    airport:"ATH",
    highlights:[
      "Athens Walking Tour",
      "Acropolis",
      "Santorini Sunset",
      "Beach Day",
      "Island Dinner"
    ]
  },

  Japan:{
    hotel:"Aman Tokyo",
    airport:"HND",
    highlights:[
      "Shibuya Crossing",
      "Sushi Experience",
      "Kyoto Temples",
      "Mount Fuji",
      "Osaka Food Tour"
    ]
  },

  Italy:{
    hotel:"Hotel Hassler",
    airport:"FCO",
    highlights:[
      "Colosseum",
      "Vatican",
      "Florence",
      "Venice",
      "Wine Tour"
    ]
  },

  Dubai:{
    hotel:"Atlantis The Royal",
    airport:"DXB",
    highlights:[
      "Burj Khalifa",
      "Desert Safari",
      "Luxury Shopping",
      "Beach Club",
      "Dubai Marina"
    ]
  },

  Brazil:{
    hotel:"Copacabana Palace",
    airport:"GIG",
    highlights:[
      "Christ the Redeemer",
      "Sugarloaf Mountain",
      "Copacabana",
      "Ipanema",
      "Brazilian Steakhouse"
    ]
  },

  Maldives:{
    hotel:"Soneva Jani",
    airport:"MLE",
    highlights:[
      "Overwater Villa",
      "Snorkeling",
      "Private Beach",
      "Spa",
      "Sunset Cruise"
    ]
  }

};

// Planner
tripForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const place = destination.value.trim();

    const data = trips[place] || trips.Greece;

    const budgetValue = Number(budget.value || 4000);

    const hotel = Math.round(budgetValue*.40);

    const flights = Math.round(budgetValue*.30);

    const food = Math.round(budgetValue*.15);

    const activities = Math.round(budgetValue*.15);

    tripResult.innerHTML=`

<h3>${place} Vacation Plan</h3>

<p>
Leaving from <strong>${fromAirport.value || "Your Airport"}</strong><br>
${travelers.value} Traveler(s)<br>
${days.value}<br>
${style.value}
</p>

<hr>

<h4>Recommended Hotel</h4>

<p>${data.hotel}</p>

<h4>Airport</h4>

<p>${data.airport}</p>

<h4>Sample Itinerary</h4>

<ul>

${data.highlights.map(item=><li>${item}</li>).join("")}

</ul>

<hr>

<h4>Estimated Budget</h4>

<p>

Flights: $${flights.toLocaleString()}<br>

Hotel: $${hotel.toLocaleString()}<br>

Food: $${food.toLocaleString()}<br>

Activities: $${activities.toLocaleString()}

</p>

`;

});

// Destination Cards

document.querySelectorAll(".destination-card").forEach(card=>{

    card.addEventListener("click",()=>{

        destination.value=card.dataset.place;

        document.getElementById("planner").scrollIntoView({

            behavior:"smooth"

        });

    });

});

// Floating Animation

document.querySelectorAll(".floating-card").forEach((card,index)=>{

    card.animate([

        {transform:"translateY(0px)"},

        {transform:"translateY(-10px)"},

        {transform:"translateY(0px)"}

    ],{

        duration:3500+(index*800),

        iterations:Infinity

    });

});
