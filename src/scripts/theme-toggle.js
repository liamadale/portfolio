// theme-toggle.js

let halflifeAudio;

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

document.addEventListener("DOMContentLoaded", () => {
  const theme = getInitialTheme();
  setTheme(theme);
});

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateFavicon(theme); 
}

const themes = ["dark", "light", "future"];

function toggleTheme() {
  const current = localStorage.getItem("theme") || "dark";
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  const next = themes[nextIndex];
  setTheme(next);
}

function updateFavicon(theme) {
  const favicon = document.getElementById("favicon");
  favicon.href = `/favicon/${theme}/favicon.ico`;
}

function activateHalfLifeTheme() {
  // Only create and play the audio if it's not already playing
  if (!halflifeAudio || halflifeAudio.ended || halflifeAudio.paused) {
    halflifeAudio = new Audio('/src/assets/audio/valve-theme.mp3');
    halflifeAudio.volume = 0.2; // Reduce volume (0.0 to 1.0)
    halflifeAudio.play();
  }

  setTheme('halflife');
}

window.activateHalfLifeTheme = activateHalfLifeTheme;

// Optional: apply saved theme on load
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "dark";
  setTheme(saved);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }
});
