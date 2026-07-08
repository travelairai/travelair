/* TravelAir.ai™ AI ENGINE */


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





function findDestination(name){

return Object.keys(travelAirData)
.find(place =>
place.toLowerCase() === name.toLowerCase()
);

}




function calculateCost(data,days,budget){


let multiplier = 1;


if(budget==="Budget Friendly"){
multiplier=.75;
}

if(budget==="Premium"){
multiplier=1.25;
}

if(budget==="Luxury"){
multiplier=1.5;
}


return Math.round(

(
data.flight +
(data.hotel*days)+
(data.food*days)+
(data.activity*days)

)
*
multiplier

);

}




function createPlan(place,days,style){


let list="";


for(let i=1;i<=days;i++){


if(i===1){

list += <li>Day ${i}: Arrive in ${place}. Check in and explore.</li>;

}

else if(i===days){

list += <li>Day ${i}: Final experiences and departure preparation.</li>;

}

else{

list += <li>Day ${i}: ${style} activities, dining, and personalized exploration.</li>;

}


}


return list;

}





if(planButton){


planButton.addEventListener("click",()=>{


const name =
destinationInput.value.trim();


const destination =
findDestination(name);



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
Number(lengthInput.value);


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




resultBox.innerHTML=`

<h3>${destination} AI Travel Plan</h3>


<p>
<strong>Region:</strong>
${data.region}
</p>


<p>
<strong>Style:</strong>
${style}
</p>


<p>
<strong>Budget:</strong>
${budget}
</p>


<p>
<strong>Estimated Cost:</strong>
$${cost.toLocaleString()}
</p>



<h4>Personalized Itinerary</h4>


<ul>

${createPlan(destination,days,style)}

</ul>


<button 
class="primary-btn"
id="saveTrip">

Save Journey

</button>


`;





document
.getElementById("saveTrip")
.onclick=()=>{


localStorage.setItem(

"lastTravelAirTrip",

JSON.stringify({

destination,
days,
style,
budget,
cost

})

);



document.getElementById("saveTrip").innerText =
"Saved ✓";


};


});


}






/* DESTINATION BUTTONS */


document
.querySelectorAll(".destination-btn")
.forEach(button=>{


button.addEventListener("click",()=>{


const place =
button.parentElement.querySelector("h3").innerText;


destinationInput.value=place;


scrollToPlanner();


});


});







/* SCROLL FUNCTIONS */


window.scrollToPlanner=function(){

document
.getElementById("planner")
.scrollIntoView({
behavior:"smooth"
});

};



window.scrollToWaitlist=function(){

document
.getElementById("waitlist")
.scrollIntoView({
behavior:"smooth"
});

};







/* AI CHAT */


const chatInput =
document.getElementById("chatInput");


const chatSend =
document.getElementById("chatSend");


const chatWindow =
document.getElementById("aiChat");




function addMessage(text,type){


const div =
document.createElement("div");


div.className=type;


div.innerHTML=text;


chatWindow.appendChild(div);


chatWindow.scrollTop =
chatWindow.scrollHeight;


}





if(chatSend){


chatSend.addEventListener("click",()=>{


const question =
chatInput.value.trim();


if(!question) return;



addMessage(
question,
"user-message"
);



chatInput.value="";



setTimeout(()=>{


let response =
"I can help plan destinations, budgets, hotels, and itineraries.";


if(question.toLowerCase().includes("greece")){

response =
"Greece is perfect for Santorini, Mykonos, Athens, beaches, history, and luxury travel.";

}


if(question.toLowerCase().includes("japan")){

response =
"Japan offers Tokyo, Kyoto, Osaka, culture, technology, and incredible food.";

}



addMessage(
response,
"ai-message"
);



},700);



});


}





if(chatInput){


chatInput.addEventListener("keypress",(e)=>{


if(e.key==="Enter"){

chatSend.click();

}


});


}



console.log("TravelAir.ai™ loaded successfully");


});
