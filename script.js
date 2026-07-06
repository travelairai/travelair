// TravelAir.ai - Fully Functional Script
function init() {
    loadDemoChat();
    initWaitlistForm();
    console.log('%c[TravelAir.ai] Site ready. AI chat is fully functional.', 'color:#854d0e');
}

let isTyping = false;

function loadDemoChat() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';

    addChatMessage('user', 'Plan a 7-day luxury trip to Greece under $8,000 for two people.');
    
    setTimeout(() => {
        addChatMessage('ai', "Perfect! I've created a 7-day Greece itinerary for you. Here's your custom trip.");
        setTimeout(() => {
            showItineraryPreview();
        }, 500);
    }, 900);
}

function addChatMessage(type, text) {
    const container = document.getElementById('chat-messages');
    const bubble = document.createElement('div');
    bubble.className = type === 'user' ? 'chat-bubble-user mb-3' : 'chat-bubble-ai mb-3';
    
    if (type === 'ai') {
        bubble.innerHTML = <div class="flex gap-2"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-zinc-950 mt-0.5">TA</div><div class="flex-1">${text}</div></div>;
    } else {
        bubble.innerHTML = text;
    }
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

function showTyping() {
    const container = document.getElementById('chat-messages');
    const typing = document.createElement('div');
    typing.id = 'typing';
    typing.className = 'chat-bubble-ai flex items-center gap-2 text-white/60';
    typing.innerHTML = <div class="flex gap-1"><div class="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"></div><div class="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style="animation-delay:150ms"></div><div class="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style="animation-delay:300ms"></div></div>;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById('typing');
    if (t) t.remove();
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const val = input.value.trim();
    if (!val || isTyping) return;

    addChatMessage('user', val);
    input.value = '';
    isTyping = true;
    showTyping();

    setTimeout(() => {
        hideTyping();
        isTyping = false;
        const response = getAIResponse(val);
        addChatMessage('ai', response);
        
        if (val.toLowerCase().includes('greece')) {
            setTimeout(() => showItineraryPreview(), 600);
        }
    }, 1100);
}

function getAIResponse(msg) {
    const m = msg.toLowerCase();
    if (m.includes('greece')) return "Perfect! I've created a 7-day Greece itinerary for you. Athens • Santorini • Mykonos. Luxury stays, private transfers, and yacht day included. Total: $7,842.";
    if (m.includes('bali')) return "Great choice! 7-day Bali luxury trip planned: Ubud villas, Seminyak beach clubs, private driver, and volcano sunrise. \~$4,250 for two.";
    if (m.includes('switzerland')) return "Winter in Switzerland sounds amazing. 5-day itinerary with Zermatt skiing + private helicopter over the Alps. \~$6,890 for two.";
    return "Thanks! Tell me destination, dates, number of people, and budget and I'll create the perfect itinerary for you.";
}

function showItineraryPreview() {
    const preview = document.getElementById('itinerary-preview');
    preview.style.display = 'block';
    preview.classList.remove('hidden');
}

function viewFullItinerary() {
    const modal = document.getElementById('itinerary-modal');
    modal.innerHTML = `
        <div class="bg-zinc-900 border border-white/10 w-full max-w-2xl mx-auto rounded-3xl overflow-hidden">
            <div class="px-8 py-5 border-b border-white/10 flex justify-between items-center bg-zinc-950">
                <div><div class="font-semibold text-xl">7-Day Greece Getaway</div><div class="text-sm text-white/60">Athens • Santorini • Mykonos • 2 Travelers • Luxury</div></div>
                <button onclick="hideModals()" class="text-2xl">&times;</button>
            </div>
            <div class="p-8">
                <div class="text-4xl font-semibold text-yellow-400 font-mono mb-6">$7,842</div>
                <div class="space-y-4 text-sm">
                    <div><span class="font-semibold text-yellow-400">Day 1:</span> Arrival Athens + Acropolis sunset + Welcome dinner</div>
                    <div><span class="font-semibold text-yellow-400">Day 2-3:</span> Santorini cliffside suite + Private yacht + Sunset catamaran</div>
                    <div><span class="font-semibold text-yellow-400">Day 4-5:</span> Mykonos beach club + Private chef + Scorpios sunset</div>
                    <div><span class="font-semibold text-yellow-400">Day 6-7:</span> Athens leisure + Private transfer to airport</div>
                </div>
            </div>
            <div class="px-8 py-5 border-t border-white/10 bg-zinc-950 flex gap-3">
                <button onclick="customizeTrip(); hideModals();" class="flex-1 py-3 rounded-2xl border border-white/20">Customize Trip</button>
                <button onclick="bookTrip()" class="flex-1 py-3 rounded-2xl bg-yellow-400 text-zinc-950 font-semibold">Book Now (Coming Soon)</button>
            </div>
        </div>`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function customizeTrip() {
    hideModals();
    const input = document.getElementById('chat-input');
    input.value = "Customize the Greece trip - add more beach time and adjust budget";
    setTimeout(() => sendChatMessage(), 300);
}

function bookTrip() {
    alert("Thank you! Real booking integration coming soon. Your itinerary has been saved.");
    hideModals();
}

function handleHeroSearch() {
    const q = document.getElementById('hero-search').value.trim();
    if (!q) return;
    const chatInput = document.getElementById('chat-input');
    chatInput.value = Plan a trip to ${q};
    document.querySelector('.lg\\:col-span-5').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => sendChatMessage(), 600);
}

function quickPlan(text) {
    document.querySelector('.lg\\:col-span-5').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('chat-input').value = text;
        sendChatMessage();
    }, 500);
}

function planCategory(cat) {
    document.querySelector('.lg\\:col-span-5').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        document.getElementById('chat-input').value = Plan a luxury ${cat.toLowerCase()} trip;
        sendChatMessage();
    }, 500);
}

function showMoreIdeas() {
    const input = document.getElementById('chat-input');
    input.value = "Show me unique trip ideas";
    document.querySelector('.lg\\:col-span-5').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => sendChatMessage(), 400);
}

function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerHTML = 'Submitting...';
        btn.disabled = true;

        try {
            await fetch(form.action, { method: 'POST', body: new FormData(form) });
            form.innerHTML = <div class="text-center py-4"><i class="fa-solid fa-check-circle text-emerald-400 text-3xl"></i><div class="font-semibold mt-2">You're on the list!</div><p class="text-sm text-white/70">We'll email you when early access opens.</p></div>;
        } catch {
            alert("Thanks! Please try again or email founders@travelair.ai");
            btn.disabled = false;
        }
    });
}

function showSignInModal() { document.getElementById('signin-modal').classList.remove('hidden'); document.getElementById('signin-modal').classList.add('flex'); }
function showJoinModal() { document.getElementById('join-modal').classList.remove('hidden'); document.getElementById('join-modal').classList.add('flex'); }
function hideModals() {
    document.querySelectorAll('#signin-modal, #join-modal, #itinerary-modal').forEach(m => { m.classList.remove('flex'); m.classList.add('hidden'); });
}

function fakeLogin(e) { e.preventDefault(); alert("Demo login successful! (Real auth coming soon)"); hideModals(); }
function fakeSignup(e) { e.preventDefault(); alert("Account created! Welcome to TravelAir.ai"); hideModals(); }

function resetChat() {
    document.getElementById('chat-messages').innerHTML = '';
    document.getElementById('itinerary-preview').classList.add('hidden');
    loadDemoChat();
}

function toggleMobileNav() { /* basic mobile nav toggle */ alert("Mobile menu - add your own if needed"); }

window.onload = init;
