// ===== TYPEWRITER EFFECT =====
const fullName = "Alex Johnson"; // <-- Change this to your name
let i = 0;
const nameEl = document.getElementById("typedName");

function typeWriter() {
  if (i <= fullName.length) {
    nameEl.textContent = fullName.slice(0, i);
    i++;
    setTimeout(typeWriter, 90);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWriter, 800);
});

// ===== DARK MODE TOGGLE =====
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const label = document.querySelector(".toggle-label");
  label.textContent = document.body.classList.contains("dark-mode") ? "LIGHT" : "DARK";
}

// ===== ACTIVE NAV LED =====
const sections = document.querySelectorAll("section[id]");
const navLEDs = document.querySelectorAll(".nav-links .led");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      const navIds = ["about", "projects", "skills", "contact"];
      navLEDs.forEach((led, idx) => {
        if (navIds[idx] === id) {
          led.style.background = "#22c55e";
          led.style.boxShadow = "0 0 8px #22c55e";
        } else {
          led.style.background = "#1a3a1a";
          led.style.boxShadow = "none";
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// ===== CONTACT FORM VALIDATION =====
function validateField(inputId, ledId) {
  const input = document.getElementById(inputId);
  const led = document.getElementById(ledId);
  const isEmpty = input.value.trim() === "";

  if (inputId === "inp-email") {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    led.classList.toggle("active", valid);
  } else {
    led.classList.toggle("active", !isEmpty);
  }
}

function submitForm() {
  const name  = document.getElementById("inp-name").value.trim();
  const email = document.getElementById("inp-email").value.trim();
  const msg   = document.getElementById("inp-msg").value.trim();
  const note  = document.getElementById("form-note");

  if (!name || !email || !msg) {
    note.style.color = "#ef4444";
    note.textContent = "> ERROR: All fields required.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.style.color = "#ef4444";
    note.textContent = "> ERROR: Invalid email address.";
    return;
  }
  note.style.color = "#22c55e";
  note.textContent = "> SIGNAL TRANSMITTED. Message queued successfully.";
  document.getElementById("inp-name").value = "";
  document.getElementById("inp-email").value = "";
  document.getElementById("inp-msg").value = "";
  ["led-name","led-email","led-msg"].forEach(id => {
    document.getElementById(id).classList.remove("active");
  });
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(".pcb-card, .contact-link, .bb-category");
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = e.target.style.transform.replace("translateY(20px)", "translateY(0)");
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = "0";
  el.style.transform += " translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  revealObs.observe(el);
});
