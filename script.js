document.addEventListener('DOMContentLoaded', () => {
  // Tailwind script configuration
  initializeTailwind();
  
  // Navbar scroll effect
  initializeNavbar();
  
  // Interactive Chat
  initializeChat();
  
  // Search bar functionality
  initializeSearch();
  
  // Category cards click handlers
  initializeCategoryCards();
  
  // Waitlist Formspree form handling
  initializeWaitlistForm();
  
  // Stats counter animation
  initializeStatsCounters();
  
  // Smooth scroll for anchor links
  initializeSmoothScroll();
  
  // Keyboard shortcuts hint
  console.log('%c[TravelAir] Premium landing initialized. Try typing in the AI chat!', 'color:#f0c14b');
});

// Tailwind dynamic config (colors + fonts)
function initializeTailwind() {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Playfair+Display:wght@700&amp;display=swap');
    
    .font-display {
      font-family: 'Playfair Display', Georgia, serif;
    }
  `;
  document.head.appendChild(style);
}

// Navbar: hide on scroll down, show on up + active states
function initializeNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Hide/show on scroll (premium feel)
    if (window.scrollY > lastScrollY && window.scrollY > 120) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = mobileBtn.querySelector('svg');
      if (icon) {
        icon.classList.toggle('rotate-90');
      }
    });
  }
}

// === PREMIUM AI CHAT SYSTEM ===
let chatHistory = [];

function initializeChat() {
  const chatContainer = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const itineraryCard = document.getElementById('itinerary-preview');

  if (!chatContainer || !chatInput || !sendBtn) return;

  // Initial welcome message already in HTML
  // Add some starter interactivity

  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate AI thinking + response
    setTimeout(() => {
      removeTypingIndicator();
      const response = generateAIResponse(message);
      addMessage(response.text, 'ai');

      // Update itinerary if relevant
      if (response.updateItinerary && itineraryCard) {
        updateItineraryCard(response.destination || 'Greece');
      }

      // Occasionally show a follow-up suggestion
      if (Math.random() > 0.7) {
        setTimeout(() => {
          addMessage("Would you like me to adjust the budget, add more experiences, or change the dates?", 'ai');
        }, 1200);
      }
    }, 850 + Math.random() * 600);
  }

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Quick suggestion chips (if added in HTML)
  document.querySelectorAll('.chat-suggestion').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.textContent.trim();
      chatInput.value = text;
      sendMessage();
      chip.style.display = 'none'; // one-time use
    });
  });

  // Make chat input focused when clicking anywhere in panel (premium UX)
  const chatPanel = document.querySelector('.chat-panel');
  if (chatPanel) {
    chatPanel.addEventListener('click', () => {
      if (document.activeElement !== chatInput) {
        chatInput.focus();
      }
    });
  }

  // Easter egg: type "wow" or "billion" for fun response
  chatInput.addEventListener('input', () => {
    const val = chatInput.value.toLowerCase();
    if (val.includes('billion') || val.includes('wow')) {
      setTimeout(() => {
        if (chatInput.value.toLowerCase().includes('billion') || chatInput.value.toLowerCase().includes('wow')) {
          addMessage("We're building exactly that — the future standard for intelligent travel. Ready to join the founding members?", 'ai');
        }
      }, 1800);
    }
  });
}

function addMessage(text, type) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `message flex mb-3 ${type === 'user' ? 'justify-end' : 'justify-start'}`;

  if (type === 'user') {
    msgDiv.innerHTML = `
      <div class="user-message px-4 py-3 rounded-2xl max-w-[82%] shadow-sm">
        <p class="text-sm leading-relaxed">${text}</p>
      </div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="ai-message px-4 py-3 rounded-2xl max-w-[82%] border border-slate-700">
        <div class="flex items-center gap-x-2 mb-1">
          <div class="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
            <span class="text-[10px] font-bold text-[#111317]">TA</span>
          </div>
          <span class="text-xs font-medium text-amber-400">TravelAir AI</span>
        </div>
        <p class="text-sm leading-relaxed text-slate-200">${text}</p>
      </div>
    `;
  }

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;

  // Save to history
  chatHistory.push({ type, text, timestamp: Date.now() });
}

function showTypingIndicator() {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const typing = document.createElement('div');
  typing.id = 'typing-indicator';
  typing.className = 'flex items-center gap-x-2 px-4 py-2 mb-2';
  typing.innerHTML = `
    <div class="ai-message px-4 py-2.5 rounded-2xl flex items-center gap-x-1.5 border border-slate-700">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span class="text-xs text-slate-400 ml-1">TravelAir is thinking...</span>
    </div>
  `;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

function generateAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  let responseText = "Absolutely. I've created a personalized itinerary based on your preferences. How does this look?";
  let updateItinerary = false;
  let destination = null;

  if (msg.includes('greece') || msg.includes('santorini') || msg.includes('mykonos') || msg.includes('athens')) {
    responseText = "Perfect choice! I've updated your 7-day Greece luxury itinerary. Athens → Santorini → Mykonos with private yacht transfer, 5-star stays, and sunset experiences. Total est. $7,842 for two.";
    updateItinerary = true;
    destination = 'Greece';
  } 
  else if (msg.includes('bali') || msg.includes('indonesia')) {
    responseText = "Bali luxury escape locked in. Private villa with infinity pool, daily spa, Ubud cultural tour + Seminyak beach club. 6 nights. Est. $6,450 for two people.";
    updateItinerary = true;
    destination = 'Bali';
  } 
  else if (msg.includes('switzerland') || msg.includes('alps') || msg.includes('zurich')) {
    responseText = "Winter in the Alps sounds incredible. I've prepared a premium 5-day Swiss itinerary: Zurich → Zermatt → Lucerne with private helicopter transfer and ski experiences.";
    updateItinerary = true;
    destination = 'Switzerland';
  } 
  else if (msg.includes('budget') || msg.includes('cheaper') || msg.includes('cost')) {
    responseText = "Understood. I can optimize for a lower budget while keeping the luxury feel. Would you like options under $5,000 or a more mid-range experience?";
  } 
  else if (msg.includes('private jet') || msg.includes('jet')) {
    responseText = "Private jet added. I've upgraded your itinerary with a direct Gulfstream G650 from your departure city. Adds ~$18k but worth every second saved.";
    updateItinerary = true;
  } 
  else if (msg.includes('hotel') || msg.includes('stay')) {
    responseText = "Noted. I've selected the top 5-star properties with the best views and service. Want me to show alternatives or lock in specific properties?";
  } 
  else if (msg.includes('thank') || msg.includes('thanks')) {
    responseText = "You're very welcome! I'm here 24/7 to refine anything. Ready to join the founding members and get early access?";
  } 
  else {
    // Default smart response
    const defaults = [
      "I've refined the itinerary with your new preferences. The updated version is now in your preview.",
      "Great input. I've adjusted dates, added two exclusive experiences, and recalculated everything.",
      "Done. Your custom trip now includes the exact experiences you described. Anything else to tweak?",
      "Perfect. I've locked in the best available dates and upgraded a couple of experiences to VIP."
    ];
    responseText = defaults[Math.floor(Math.random() * defaults.length)];
    if (Math.random() > 0.6) updateItinerary = true;
  }

  return {
    text: responseText,
    updateItinerary,
    destination
  };
}

function updateItineraryCard(destination = 'Greece') {
  const card = document.getElementById('itinerary-preview');
  if (!card) return;

  const destinations = {
    'Greece': {
      title: 'Athens • Santorini • Mykonos',
      days: '7 DAYS',
      travelers: '2 Travelers',
      type: 'Luxury',
      price: '$7,842',
      imageStyle: "background-image: url('https://picsum.photos/id/1016/600/400')", // Santorini vibe
      details: 'Private yacht • Sunset dinners • 5★ stays'
    },
    'Bali': {
      title: 'Ubud • Seminyak • Nusa Penida',
      days: '6 DAYS',
      travelers: '2 Travelers',
      type: 'Luxury',
      price: '$6,450',
      imageStyle: "background-image: url('https://picsum.photos/id/1005/600/400')",
      details: 'Private villa • Daily spa • Cultural tours'
    },
    'Switzerland': {
      title: 'Zurich • Zermatt • Lucerne',
      days: '5 DAYS',
      travelers: '2 Travelers',
      type: 'Premium',
      price: '$9,120',
      imageStyle: "background-image: url('https://picsum.photos/id/1036/600/400')",
      details: 'Helicopter transfers • Ski • Luxury chalets'
    }
  };

  const data = destinations[destination] || destinations['Greece'];

  card.innerHTML = `
    <div class="itinerary-card rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
      <div class="itinerary-img relative" style="${data.imageStyle}">
        <div class="absolute top-3 right-3 bg-black/70 text-[10px] font-mono px-2.5 py-0.5 rounded-full text-amber-400 tracking-[1px]">
          ${data.days}
        </div>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start mb-1">
          <div>
            <div class="font-semibold text-white tracking-tight">${data.title}</div>
            <div class="text-xs text-slate-400 mt-0.5">${data.travelers} • ${data.type}</div>
          </div>
          <div class="text-right">
            <div class="text-lg font-semibold text-amber-400 tabular-nums">Est. ${data.price}</div>
          </div>
        </div>
        <div class="text-[11px] text-slate-400 mt-2">${data.details}</div>
        
        <div class="flex gap-x-2 mt-4">
          <button onclick="viewFullItinerary()" 
                  class="flex-1 gold-btn text-xs py-2 rounded-xl font-semibold active:scale-[0.985]">
            View Full Itinerary
          </button>
          <button onclick="customizeTrip()" 
                  class="flex-1 text-xs py-2 rounded-xl border border-slate-600 hover:bg-slate-800 font-medium active:scale-[0.985]">
            Customize
          </button>
        </div>
      </div>
    </div>
  `;
}

// Make these global for onclick in dynamic HTML
window.viewFullItinerary = function() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-[999] p-4';
  modal.innerHTML = `
    <div class="bg-[#111317] rounded-3xl max-w-2xl w-full overflow-hidden border border-slate-700">
      <div class="p-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <div class="text-2xl font-semibold">Your Custom Greece Itinerary</div>
            <div class="text-sm text-amber-400">7 Days • Luxury • 2 Travelers</div>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="text-3xl leading-none text-slate-400 hover:text-white">&times;</button>
        </div>
        
        <div class="space-y-5 text-sm">
          <div class="flex gap-4"><span class="font-mono text-amber-400 w-6">01</span> <span>Arrival in Athens + Private Acropolis sunset tour</span></div>
          <div class="flex gap-4"><span class="font-mono text-amber-400 w-6">02</span> <span>Private yacht transfer to Santorini • Oia stay</span></div>
          <div class="flex gap-4"><span class="font-mono text-amber-400 w-6">03</span> <span>Caldera hike + private chef dinner</span></div>
          <div class="flex gap-4"><span class="font-mono text-amber-400 w-6">04</span> <span>Santorini to Mykonos • Beach club day</span></div>
          <div class="flex gap-4"><span class="font-mono text-amber-400 w-6">05</span> <span>Private boat to hidden beaches + wine tasting</span></div>
          <div class="flex gap-4"><span class="font-mono text-amber-400 w-6">06</span> <span>Shopping + farewell dinner in Mykonos Town</span></div>
          <div class="flex gap-4"><span class="font-mono text-amber-400 w-6">07</span> <span>Departure with VIP airport assistance</span></div>
        </div>
      </div>
      <div class="bg-[#0a0c10] px-8 py-5 flex items-center justify-between border-t border-slate-700">
        <div>
          <span class="text-xs text-slate-400">TOTAL ESTIMATED</span><br>
          <span class="text-3xl font-semibold text-amber-400">$7,842</span>
        </div>
        <button onclick="alert('Thank you! In the real app this would book the trip instantly.'); this.closest('.fixed').remove()" 
                class="gold-btn px-8 py-3 rounded-2xl text-sm font-semibold">
          Book This Trip Now
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

window.customizeTrip = function() {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.focus();
    chatInput.placeholder = "Tell me what to change (e.g. more budget, different dates, add kids)...";
  }
  // Close any open modals
  document.querySelectorAll('.fixed.inset-0').forEach(m => m.remove());
};

// === SEARCH BAR ===
function initializeSearch() {
  const searchInput = document.getElementById('hero-search');
  if (!searchInput) return;

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query.length > 2) {
        // Scroll to chat and prefill
        const chatPanel = document.querySelector('.chat-panel');
        if (chatPanel) {
          chatPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        setTimeout(() => {
          const chatInput = document.getElementById('chat-input');
          if (chatInput) {
            chatInput.value = `Plan a trip to ${query}`;
            // Trigger send
            const sendBtn = document.getElementById('chat-send');
            if (sendBtn) sendBtn.click();
          }
        }, 650);
      }
    }
  });

  // Quick idea buttons
  document.querySelectorAll('.quick-idea').forEach(btn => {
    btn.addEventListener('click', () => {
      const destination = btn.textContent.trim();
      searchInput.value = destination;
      
      const chatPanel = document.querySelector('.chat-panel');
      if (chatPanel) chatPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      setTimeout(() => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.value = `Plan a luxury trip to ${destination}`;
          document.getElementById('chat-send').click();
        }
      }, 700);
    });
  });
}

// Category cards - open chat with suggestion
function initializeCategoryCards() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const label = card.querySelector('.font-medium')?.textContent || 'Travel';
      
      const chatPanel = document.querySelector('.chat-panel');
      if (chatPanel) {
        chatPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      setTimeout(() => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.value = `I want to explore ${label.toLowerCase()}`;
          document.getElementById('chat-send').click();
        }
      }, 800);
    });
  });
}

// === FORMSPREE WAITLIST ===
function initializeWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <span class="flex items-center justify-center gap-x-2">
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        Joining...
      </span>
    `;
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success state
        form.innerHTML = `
          <div class="text-center py-4">
            <div class="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <div class="text-xl font-semibold text-white mb-1">Welcome to the founding members!</div>
            <p class="text-sm text-slate-400">You're in. We'll send your early access link and exclusive perks within 24 hours.</p>
            <button onclick="location.reload()" class="mt-5 text-xs px-5 py-2 rounded-full border border-emerald-600 text-emerald-400 hover:bg-emerald-950 transition-colors">
              Close
            </button>
          </div>
        `;
        
        // Confetti effect (premium touch)
        launchConfetti();
      } else {
        throw new Error('Formspree error');
      }
    } catch (error) {
      console.error(error);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email us directly at founders@travelair.ai');
    }
  });
}

// Simple confetti for successful waitlist join
function launchConfetti() {
  const colors = ['#f0c14b', '#c9a227', '#f4d37a'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = '-10px';
      particle.style.width = '7px';
      particle.style.height = '7px';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      particle.style.zIndex = '99999';
      particle.style.pointerEvents = 'none';
      document.body.appendChild(particle);

      const duration = 2200 + Math.random() * 1800;
      const angle = Math.random() * 80 - 20;
      
      particle.animate([
        { 
          transform: `translateY(0) rotate(0deg)`,
          opacity: 1 
        },
        { 
          transform: `translateY(${window.innerHeight + 100}px) rotate(${angle * 4}deg)`,
          opacity: 0 
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      }).onfinish = () => particle.remove();
    }, i * 1.5);
  }
}

// Animated stats counters
function initializeStatsCounters() {
  const stats = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(stat => {
          const target = parseInt(stat.dataset.target || stat.textContent.replace(/[^0-9]/g, ''));
          if (!target) return;
          
          const duration = 1600;
          const start = 0;
          const increment = target / (duration / 16);
          let current = start;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(timer);
              if (stat.textContent.includes('+')) {
                stat.textContent = target.toLocaleString() + '+';
              } else {
                stat.textContent = target.toLocaleString();
              }
            } else {
              stat.textContent = Math.floor(current).toLocaleString();
            }
          }, 16);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.6 });

  if (stats.length) {
    const statsSection = stats[0].closest('section') || stats[0].parentElement;
    observer.observe(statsSection);
  }
}

// Smooth scroll
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Bonus: Keyboard shortcut (press "/" to focus chat)
document.addEventListener('keydown', function(e) {
  if (e.key === '/' && document.activeElement.tagName === 'BODY') {
    e.preventDefault();
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      const chatPanel = document.querySelector('.chat-panel');
      if (chatPanel) chatPanel.scrollIntoView({ block: 'center' });
      setTimeout(() => chatInput.focus(), 300);
    }
  }
});

// Expose a couple helpers to console for devs
window.TravelAir = {
  resetChat: () => {
    const container = document.getElementById('chat-messages');
    if (container) container.innerHTML = '';
    console.log('%c[TravelAir] Chat reset.', 'color:#64748b');
  },
  joinWaitlist: () => {
    const form = document.getElementById('waitlist-form');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  }
};
