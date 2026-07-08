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



document.addEventListener("DOMContentLoaded", () => {


const destinationInput =
document.getElementById("destination");

const styleInput =
document.getElementById("travelStyle");

const lengthInput =
document.getElementById("tripLength");

const planButton =
document.getElementById("planTrip");

const resultBox =
document.getElementById("tripResult");



if(!planButton || !resultBox){
console.error("Planner elements missing from HTML");
return;
}




function findDestination(name){

return Object.keys(travelAirData)
.find(key =>
key.toLowerCase() === name.toLowerCase()
);

}



function calculateBudget(data, days){

return Math.round(
data.flight +
(data.hotelNight * days) +
(data.foodDay * days) +
(data.activityDay * days)
);

}




function createItinerary(place, days, style){

let list = [];


for(let i = 1; i <= days; i++){


if(i === 1){

list.push(
Day ${i}: Arrive in ${place}. Explore local highlights and begin your journey.
);

}

else if(i === days){

list.push(
Day ${i}: Final experiences, memories, and departure preparation.
);

}

else {

list.push(
Day ${i}: ${style} activities, dining, and personalized exploration.
);

}


}


return list;

}





planButton.addEventListener("click", ()=>{


const name =
destinationInput.value.trim();


const key =
findDestination(name);



if(!key){

resultBox.innerHTML = `

<h3>Choose a Destination</h3>

<p>
Try:
Greece, Japan, Italy, Dubai, Switzerland, or Bali
</p>

`;

return;

}



const data =
travelAirData[key];


const days =
parseInt(lengthInput.value) || 7;


const style =
styleInput.value || "Luxury";



const budget =
calculateBudget(data, days);



const itinerary =
createItinerary(
key,
days,
style
);



resultBox.innerHTML = `


<h3>
${key} AI Travel Preview
</h3>


<p>
<strong>Region:</strong>
${data.region}
</p>


<p>
<strong>Travel Style:</strong>
${style}
</p>


<p>
<strong>Estimated Trip Budget:</strong>
$${budget.toLocaleString()}
</p>


<h4>
Sample Itinerary
</h4>


<ul>

${itinerary.map(item =>
<li>${item}</li>
).join("")}

</ul>


<button id="saveTripBtn" class="primary-btn">
Save This Trip
</button>


`;




const saveButton =
document.getElementById("saveTripBtn");



saveButton.addEventListener("click", ()=>{


const savedTrips =
JSON.parse(
localStorage.getItem("travelAirTrips")
) || [];



savedTrips.unshift({

destination:key,
style:style,
days:days,
budget:budget,
date:new Date().toLocaleDateString()

});



localStorage.setItem(
"travelAirTrips",
JSON.stringify(
savedTrips.slice(0,6)
)
);



saveButton.innerHTML =
"Trip Saved ✓";


});



});






/* QUICK DESTINATION BUTTONS */


document.querySelectorAll(".destination-btn")
.forEach(button=>{


button.addEventListener("click",()=>{


const name =
button.textContent
.replace("Plan","")
.replace("Trip","")
.trim();



destinationInput.value =
name;



document
.getElementById("planner")
?.scrollIntoView({
behavior:"smooth"
});



});


});






/* HERO BUTTONS */


document.querySelectorAll(".primary-btn")
.forEach(button=>{


button.addEventListener("click",()=>{


document
.getElementById("planner")
?.scrollIntoView({
behavior:"smooth"
});


});


});



});
