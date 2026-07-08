/* TRAVELAIR.AI™ AI ENGINE */


const travelAirData = {


Greece:{

region:"Athens • Santorini • Mykonos",

flight:900,

hotel:450,

food:100,

activity:150

},



Japan:{

region:"Tokyo • Kyoto • Osaka",

flight:1200,

hotel:350,

food:90,

activity:120

},



Italy:{

region:"Rome • Florence • Amalfi Coast",

flight:1000,

hotel:400,

food:100,

activity:130

},



Dubai:{

region:"Dubai City • Desert • Luxury",

flight:1100,

hotel:500,

food:120,

activity:180

},



Switzerland:{

region:"Zurich • Alps • Scenic Routes",

flight:1300,

hotel:550,

food:130,

activity:200

},



Bali:{

region:"Ubud • Seminyak • Beaches",

flight:1200,

hotel:250,

food:70,

activity:100

}



};






document.addEventListener(
"DOMContentLoaded",
()=>{





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






function findDestination(name){


return Object.keys(travelAirData)
.find(
place =>
place.toLowerCase()
===
name.toLowerCase()
);


}






function budgetMultiplier(level){


switch(level){


case "Budget Friendly":
return .75;


case "Premium":
return 1.25;


case "Luxury":
return 1.5;


default:
return 1;


}



}






function calculateCost(data,days,budget){


let total =

data.flight +

(data.hotel * days) +

(data.food * days) +

(data.activity * days);



return Math.round(
total *
budgetMultiplier(budget)
);


}






function createItinerary(place,days,style){


let plan=[];



for(
let day=1;
day<=days;
day++
){



if(day===1){


plan.push(

Day ${day}: Arrive in ${place}. Check in and begin exploring.

);


}


else if(day===days){


plan.push(

Day ${day}: Final experiences and prepare for departure.

);


}


else{


plan.push(

Day ${day}: ${style} activities, dining, and personalized exploration.

);


}



}



return plan;


}

/* AI TRIP GENERATOR */


if(planButton){


planButton.addEventListener(
"click",
()=>{



const destinationName =
destinationInput.value.trim();



const destination =
findDestination(destinationName);



if(!destination){


resultBox.innerHTML = `

<h3>
Destination Not Found
</h3>

<p>
Try:
Greece, Japan, Italy, Dubai, Switzerland, or Bali.
</p>

`;

return;

}




const data =
travelAirData[destination];



const days =
parseInt(lengthInput.value)
|| 7;



const style =
styleInput.value;



const budget =
budgetInput.value;



const cost =
calculateCost(
data,
days,
budget
);



const itinerary =
createItinerary(
destination,
days,
style
);





resultBox.innerHTML = `


<h3>
${destination} AI Travel Plan
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

<strong>Budget:</strong>

${budget}

</p>



<p>

<strong>Estimated Trip Cost:</strong>

$${cost.toLocaleString()}

</p>




<h4>
Your Personalized Itinerary
</h4>



<ul>

${itinerary.map(day=>`

<li>
${day}
</li>

`).join("")}

</ul>



<button
class="primary-btn"
id="saveTrip"
>

Save This Journey

</button>



`;






document
.getElementById("saveTrip")
.addEventListener(
"click",
()=>{


let savedTrips =

JSON.parse(
localStorage.getItem(
"travelAirTrips"
)
)
||
[];



savedTrips.unshift({

destination,

days,

style,

budget,

cost,

date:
new Date()
.toLocaleDateString()

});



localStorage.setItem(

"travelAirTrips",

JSON.stringify(
savedTrips.slice(0,6)
)

);



document
.getElementById("saveTrip")
.innerText =
"Journey Saved ✓";



}

);



}

);


}








/* DESTINATION QUICK BUTTONS */


document
.querySelectorAll(".destination-btn")
.forEach(
button=>{


button.addEventListener(
"click",
()=>{


const destination =

button.innerText
.replace("Plan","")
.trim();



destinationInput.value =
destination;



document
.getElementById("planner")
.scrollIntoView({

behavior:"smooth"

});



}

);


}

);








/* PAGE SCROLL BUTTONS */


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







/* AI CHAT ASSISTANT */


const chatInput =
document.getElementById("chatInput");


const chatSend =
document.getElementById("chatSend");


const chatWindow =
document.getElementById("aiChat");





function addChatMessage(
message,
type
){


const div =
document.createElement("div");



div.className =
type;



div.innerHTML =
message;



chatWindow.appendChild(div);



chatWindow.scrollTop =
chatWindow.scrollHeight;


}





if(chatSend){



chatSend.addEventListener(
"click",
()=>{


const question =
chatInput.value.trim();



if(!question)
return;



addChatMessage(

question,

"user-message"

);



chatInput.value="";



setTimeout(
()=>{


let answer =

""




if(
question.toLowerCase()
.includes("greece")
){

answer =
"Greece is perfect for luxury island travel with Santorini, Mykonos, and Athens experiences.";

}



else if(

question.toLowerCase()
.includes("japan")

){


answer =
"Japan offers Tokyo, Kyoto, Osaka, culture, technology, and incredible food.";

}



else{


answer =
"I can help plan destinations, budgets, travel styles, and itinerary ideas.";

}




addChatMessage(

answer,

"ai-message"

);



},

700

);



}


);


}

/* CHAT ENTER KEY SUPPORT */


if(chatInput){


chatInput.addEventListener(
"keypress",
(event)=>{


if(event.key==="Enter"){


chatSend.click();


}


}

);


}







/* FINAL PAGE PROTECTION */


window.addEventListener(
"error",
(event)=>{


console.warn(
"TravelAir protected error:",
event.message
);


}

);







/* LOAD SAVED TRIPS */


function loadSavedTrips(){


const trips =

JSON.parse(

localStorage.getItem(
"travelAirTrips"

)

)
||
[];



return trips;


}





window.travelAir = {


data:
travelAirData,


savedTrips:
loadSavedTrips()


};







/* AI WELCOME EFFECT */


setTimeout(
()=>{


const chat =
document.getElementById("aiChat");



if(chat){


const welcome =
document.createElement("div");



welcome.className =
"ai-message";



welcome.innerHTML =
"Ready when you are. Tell me your destination and I'll help design your journey.";



chat.appendChild(
welcome
);


}



},
1200
);






});
