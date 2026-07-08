const travelAirData = {

Greece: {
region: "Athens • Santorini • Mykonos",
hotel: "Luxury Island Experience",
flight: 900,
hotelNight: 450,
foodDay: 100,
activityDay: 150
},

Japan: {
region: "Tokyo • Kyoto • Osaka",
hotel: "Premium City Experience",
flight: 1200,
hotelNight: 350,
foodDay: 90,
activityDay: 120
},

Italy: {
region: "Rome • Florence • Amalfi Coast",
hotel: "Italian Escape",
flight: 1000,
hotelNight: 400,
foodDay: 100,
activityDay: 130
},

Dubai: {
region: "Dubai City • Desert • Luxury",
hotel: "Modern Luxury Experience",
flight: 1100,
hotelNight: 500,
foodDay: 120,
activityDay: 180
},

Switzerland: {
region: "Zurich • Alps • Scenic Routes",
hotel: "Swiss Mountain Experience",
flight: 1300,
hotelNight: 550,
foodDay: 130,
activityDay: 200
},

Bali: {
region: "Ubud • Seminyak • Beaches",
hotel: "Island Relaxation",
flight: 1200,
hotelNight: 250,
foodDay: 70,
activityDay: 100
}

};



const destinationInput = document.getElementById("destination");
const styleInput = document.getElementById("travelStyle");
const lengthInput = document.getElementById("tripLength");
const budgetInput = document.getElementById("budget");
const planButton = document.getElementById("planTrip");
const resultBox = document.getElementById("tripResult");



function findDestination(name){

const key = Object.keys(travelAirData)
.find(
item => item.toLowerCase() === name.toLowerCase()
);

return travelAirData[key];

}



function calculateBudget(destination, days){

const data = destination;

let total =
data.flight +
(data.hotelNight * days) +
(data.foodDay * days) +
(data.activityDay * days);


return Math.round(total);

}



function createItinerary(place, days, style){


let itinerary = [];

for(let i = 1; i <= days; i++){


if(i === 1){

itinerary.push(
Day ${i}: Arrival in ${place}. Explore local highlights and settle in.
);

}

else if(i === days){

itinerary.push(
Day ${i}: Final experiences and departure preparation.
);

}

else {

itinerary.push(
Day ${i}: ${style} activities, dining, and personalized exploration.
);

}


}


return itinerary;

}

planButton.addEventListener("click", () => {


const destinationName = destinationInput.value.trim();

const destination = findDestination(destinationName);



if(!destination){

resultBox.innerHTML = `

<h3>Let's build your trip plan</h3>

<p>
Please enter a destination from our supported examples:
Greece, Japan, Italy, Dubai, Switzerland, or Bali.
</p>

`;

return;

}



const selectedLength = parseInt(
lengthInput.value
);


const days = selectedLength || 7;


const style = styleInput.value;


const estimatedCost = calculateBudget(
destination,
days
);



const itinerary = createItinerary(
destinationName,
days,
style
);



resultBox.innerHTML = `

<h3>
${destinationName} AI Travel Preview
</h3>


<p>
<strong>Experience:</strong>
${destination.region}
</p>


<p>
<strong>Travel Style:</strong>
${style}
</p>


<p>
<strong>Estimated Planning Budget:</strong>
$${estimatedCost.toLocaleString()}
</p>


<h4>
Sample Itinerary
</h4>


<ul>

${itinerary.map(day => 
<li>${day}</li>
).join("")}

</ul>


`;



});




/* DESTINATION BUTTONS */


const destinationButtons = document.querySelectorAll(
".destination-btn"
);


destinationButtons.forEach(button => {


button.addEventListener("click", () => {


const destination = button.textContent
.replace("Plan ", "")
.replace(" Trip", "");



destinationInput.value = destination;



document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});


});


});



/* HERO BUTTON SCROLL */


document.querySelectorAll(
".primary-btn"
).forEach(button => {


button.addEventListener("click", () => {


document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});


});


});

// SAVE TRIPS FEATURE


function saveTrip(tripData){

let savedTrips =
JSON.parse(localStorage.getItem("travelAirTrips"))
|| [];


savedTrips.unshift(tripData);


if(savedTrips.length > 6){

savedTrips.pop();

}


localStorage.setItem(
"travelAirTrips",
JSON.stringify(savedTrips)
);


}



function getSavedTrips(){

return JSON.parse(
localStorage.getItem("travelAirTrips")
)
|| [];

}




// CREATE TRIP SAVE BUTTON


const resultContainer =
document.getElementById("tripResult");


const saveButton =
document.createElement("button");


saveButton.className =
"primary-btn";


saveButton.textContent =
"Save This Trip";


saveButton.style.marginTop =
"20px";


resultContainer.appendChild(
saveButton
);



saveButton.addEventListener(
"click",
()=>{


const currentTrip = {

destination:
destinationInput.value,


style:
styleInput.value,


length:
lengthInput.value,


created:
new Date().toLocaleDateString()

};



saveTrip(currentTrip);



saveButton.textContent =
"Trip Saved ✓";


});





// AI STYLE CHAT RESPONSES


const aiPrompts = {

"Luxury":
"Designing a premium experience with upgraded hotels, dining, and exclusive activities.",

"Adventure":
"Creating an adventure-focused journey with exploration and outdoor experiences.",

"Family":
"Building a family-friendly itinerary with comfort and memorable activities.",

"Business":
"Planning an efficient business trip with productivity and convenience.",

"Relaxation":
"Creating a peaceful escape focused on wellness and downtime."

};



function getAIResponse(style){


return aiPrompts[style]
||
"Creating your personalized travel experience.";

}

