(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Hero search -> scrolls to waitlist, prefilling interest ---------- */
  var heroSearch = document.getElementById('heroSearch');
  var destinationInput = document.getElementById('destination');
  var tripInterest = document.getElementById('trip-interest');
  var waitlistSection = document.getElementById('waitlist');

  function sendToWaitlist(text) {
    if (text && tripInterest) {
      tripInterest.value = text;
    }
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    var nameField = document.getElementById('name');
    if (nameField) {
      window.setTimeout(function () { nameField.focus(); }, 500);
    }
  }

  if (heroSearch) {
    heroSearch.addEventListener('submit', function (e) {
      e.preventDefault();
      sendToWaitlist(destinationInput ? destinationInput.value.trim() : '');
    });
  }

  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var fill = chip.getAttribute('data-fill') || chip.textContent;
      if (destinationInput) destinationInput.value = fill;
      sendToWaitlist(fill);
    });
  });

  /* ---------- Waitlist form submission (Formspree, AJAX) ---------- */
  var waitlistForm = document.getElementById('waitlistForm');
  var waitlistSubmit = document.getElementById('waitlistSubmit');
  var formNote = document.getElementById('formNote');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();

      formNote.textContent = '';
      formNote.className = 'form-note';
      waitlistSubmit.disabled = true;
      waitlistSubmit.textContent = 'Joining…';

      var formData = new FormData(waitlistForm);

      fetch(waitlistForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            waitlistForm.reset();
            formNote.textContent = "You're on the list. We'll be in touch soon.";
            formNote.className = 'form-note success';
            waitlistSubmit.textContent = 'Joined';
          } else {
            return response.json().then(function (data) {
              throw new Error(
                data && data.errors
                  ? data.errors.map(function (err) { return err.message; }).join(', ')
                  : 'Something went wrong. Please try again.'
              );
            });
          }
        })
        .catch(function (err) {
          formNote.textContent = err.message || 'Something went wrong. Please try again.';
          formNote.className = 'form-note error';
          waitlistSubmit.disabled = false;
          waitlistSubmit.textContent = 'Join the Waitlist';
        });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    '.coverage-card, .how-step, .waitlist-copy, .waitlist-form, .section-title, .kicker'
  );

  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
