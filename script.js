const travelAirData = {

Greece:{
region:"Athens • Santorini • Mykonos",
flight:900,
hotelNight:450,
foodDay:100,
activityDay:150
},

Japan:{
region:"Tokyo • Kyoto • Osaka",
flight:1200,
hotelNight:350,
foodDay:90,
activityDay:120
},

Italy:{
region:"Rome • Florence • Amalfi Coast",
flight:1000,
hotelNight:400,
foodDay:100,
activityDay:130
},

Dubai:{
region:"Dubai City • Desert • Luxury",
flight:1100,
hotelNight:500,
foodDay:120,
activityDay:180
},

Switzerland:{
region:"Zurich • Alps • Scenic Routes",
flight:1300,
hotelNight:550,
foodDay:130,
activityDay:200
},

Bali:{
region:"Ubud • Seminyak • Beaches",
flight:1200,
hotelNight:250,
foodDay:70,
activityDay:100
}

};



document.addEventListener("DOMContentLoaded",()=>{


const destinationInput =
document.getElementById("destination");

const styleInput =
document.getElementById("travelStyle");

const lengthInput =
document.getElementById("tripLength");

const budgetInput =
document.getElementById("budget");

const planButton =
document.getElementById("planTrip");

const resultBox =
document.getElementById("tripResult");



function getDestination(name){

return Object.keys(travelAirData)
.find(item =>
item.toLowerCase() === name.toLowerCase()
);

}



function getBudgetMultiplier(type){

if(type==="Budget Friendly"){
return .75;
}

if(type==="Moderate"){
return 1;
}

if(type==="Premium"){
return 1.25;
}

if(type==="Luxury"){
return 1.5;
}

return 1;

}




function calculateTripCost(data,days,budget){

let total =
data.flight +
(data.hotelNight * days)+
(data.foodDay * days)+
(data.activityDay * days);


return Math.round(
total * getBudgetMultiplier(budget)
);

}





function buildItinerary(place,days,style){

let daysList=[];


for(let i=1;i<=days;i++){


if(i===1){

daysList.push(
Day ${i}: Arrival in ${place}. Check in and explore local highlights.
);

}

else if(i===days){

daysList.push(
Day ${i}: Final experiences and departure preparation.
);

}

else{

daysList.push(
Day ${i}: ${style} activities, dining, and personalized exploration.
);

}


}


return daysList;

}





function saveTrip(data){

let saved =
JSON.parse(
localStorage.getItem("travelAirTrips")
) || [];


saved.unshift(data);


localStorage.setItem(
"travelAirTrips",
JSON.stringify(saved.slice(0,6))
);


}





if(planButton){


planButton.addEventListener("click",()=>{


const name =
destinationInput.value.trim();


const destination =
getDestination(name);



if(!destination){


resultBox.innerHTML=`

<h3>Destination Not Found</h3>

<p>
Try Greece, Japan, Italy, Dubai, Switzerland, or Bali.
</p>

`;

return;

}



const data =
travelAirData[destination];


const days =
parseInt(lengthInput.value) || 7;


const style =
styleInput.value;


const budget =
budgetInput.value;


const cost =
calculateTripCost(
data,
days,
budget
);



const itinerary =
buildItinerary(
destination,
days,
style
);



resultBox.innerHTML=`

<h3>${destination} AI Travel Preview</h3>

<p>
<strong>Region:</strong>
${data.region}
</p>

<p>
<strong>Travel Style:</strong>
${style}
</p>

<p>
<strong>Budget Type:</strong>
${budget}
</p>

<p>
<strong>Estimated Trip Budget:</strong>
$${cost.toLocaleString()}
</p>


<h4>Your AI Itinerary</h4>

<ul>

${itinerary.map(day =>
<li>${day}</li>
).join("")}

</ul>


<button id="saveTripButton" class="primary-btn">
Save This Trip
</button>


`;



document
.getElementById("saveTripButton")
.addEventListener("click",()=>{


saveTrip({

destination,
days,
style,
budget,
cost,
date:
new Date().toLocaleDateString()

});


document
.getElementById("saveTripButton")
.textContent="Trip Saved ✓";


});


});


}






/* DESTINATION CARD BUTTONS */


document
.querySelectorAll(".destination-btn")
.forEach(button=>{


button.addEventListener("click",()=>{


let destination =
button.textContent
.replace("Plan","")
.replace("Trip","")
.trim();



destinationInput.value =
destination;



document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});


});


});







/* HERO PLANNING BUTTON */


document
.querySelectorAll(".hero-buttons .primary-btn")
.forEach(button=>{


button.addEventListener("click",()=>{


document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});


});


});







/* HERO AI PANEL BUTTON */


const heroGenerate =
document.getElementById("heroPlanButton");


if(heroGenerate){


heroGenerate.addEventListener("click",()=>{


document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});


});


}



});
