/* TravelAir.ai™ AI Travel Engine */

const travelAirData = {

  Greece: {
    region: "Athens • Santorini • Mykonos",
    flight: 900,
    hotel: 450,
    food: 100,
    activity: 150
  },

  Japan: {
    region: "Tokyo • Kyoto • Osaka",
    flight: 1200,
    hotel: 350,
    food: 90,
    activity: 120
  },

  Italy: {
    region: "Rome • Florence • Amalfi Coast",
    flight: 1000,
    hotel: 400,
    food: 100,
    activity: 130
  },

  Dubai: {
    region: "Dubai City • Desert • Luxury",
    flight: 1100,
    hotel: 500,
    food: 120,
    activity: 180
  },

  Switzerland: {
    region: "Zurich • Alps • Scenic Routes",
    flight: 1300,
    hotel: 550,
    food: 130,
    activity: 200
  },

  Bali: {
    region: "Ubud • Seminyak • Beaches",
    flight: 1200,
    hotel: 250,
    food: 70,
    activity: 100
  }

};


document.addEventListener("DOMContentLoaded", function(){


const destinationInput = document.getElementById("destination");
const styleInput = document.getElementById("travelStyle");
const lengthInput = document.getElementById("tripLength");
const budgetInput = document.getElementById("budget");
const planButton = document.getElementById("planTrip");
const resultBox = document.getElementById("tripResult");



function findDestination(name){

return Object.keys(travelAirData).find(
item => item.toLowerCase() === name.toLowerCase()
);

}



function calculateCost(data, days, budget){

let total =
data.flight +
(data.hotel * days) +
(data.food * days) +
(data.activity * days);


if(budget === "Luxury"){
total *= 1.5;
}

if(budget === "Premium"){
total *= 1.25;
}

if(budget === "Budget Friendly"){
total *= .75;
}


return Math.round(total);

}





function buildItinerary(place, days, style){

let html = "";


for(let i = 1; i <= days; i++){

html += `
<li>
Day ${i}: ${style} experience in ${place} with personalized activities.
</li>
`;

}


return html;

}





function generateTrip(){


const name = destinationInput.value.trim();

const destination = findDestination(name);



if(!destination){

resultBox.innerHTML = `

<h3>Destination Not Found</h3>

<p>
Try Greece, Japan, Italy, Dubai, Switzerland, or Bali.
</p>

`;

return;

}



const data = travelAirData[destination];

const days = Number(lengthInput.value) || 7;

const style = styleInput.value;

const budget = budgetInput.value;


const cost = calculateCost(
data,
days,
budget
);



resultBox.innerHTML = `

<h3>${destination} AI Travel Plan</h3>

<p><strong>Region:</strong> ${data.region}</p>

<p><strong>Travel Style:</strong> ${style}</p>

<p><strong>Budget:</strong> ${budget}</p>

<p>
<strong>Estimated Cost:</strong>
$${cost.toLocaleString()}
</p>


<h4>Your AI Itinerary</h4>

<ul>
${buildItinerary(destination, days, style)}
</ul>


<button id="saveTrip" class="primary-btn">
Save Journey
</button>

`;



document.getElementById("saveTrip").onclick = function(){

localStorage.setItem(
"travelAirLatestTrip",
JSON.stringify({

destination,
days,
style,
budget,
cost

})
);


this.innerText = "Saved ✓";

};


}





if(planButton){

planButton.addEventListener(
"click",
generateTrip
);

}






/* Destination Cards */

document
.querySelectorAll(".destination-btn")
.forEach(button=>{


button.addEventListener("click",function(){


destinationInput.value =
this.innerText.replace("Plan","").trim();


document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});


});


});







/* Scroll Controls */


window.scrollToPlanner = function(){

document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});

};


window.scrollToWaitlist = function(){

document
.getElementById("waitlist")
.scrollIntoView({
behavior:"smooth"
});

};







/* AI CHAT */


const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatBox = document.getElementById("aiChat");



function sendChat(){


if(!chatInput || !chatBox){
return;
}


const question =
chatInput.value.trim();


if(!question){
return;
}



chatBox.innerHTML += `

<div class="user-message">
${question}
</div>

`;



let response =
"I can help you plan destinations, budgets, and travel experiences.";



const lower =
question.toLowerCase();



if(lower.includes("greece")){

response =
"Greece is ideal for luxury island travel with Athens, Santorini, and Mykonos.";

}


else if(lower.includes("japan")){

response =
"Japan offers Tokyo, Kyoto, Osaka, culture, food, and technology experiences.";

}


else if(lower.includes("italy")){

response =
"Italy offers Rome, Florence, Amalfi Coast, history, and incredible cuisine.";

}




chatBox.innerHTML += `

<div class="ai-message">
${response}
</div>

`;



chatInput.value = "";


}




if(chatSend){

chatSend.addEventListener(
"click",
sendChat
);

}



if(chatInput){

chatInput.addEventListener(
"keypress",
function(e){

if(e.key === "Enter"){

sendChat();

}

});

}



console.log("TravelAir.ai script loaded successfully");


});
