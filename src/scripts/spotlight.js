const spotlight = document.getElementById("spotlight");

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let currentAccent = "20, 184, 166"; // Fallback dark
let currentTheme = "";

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255].join(", ");
}

function updateAccentFromTheme() {
  const themeRoot = document.querySelector("[data-theme]") || document.documentElement;
  const theme = themeRoot.getAttribute("data-theme") || "default";

  if (theme !== currentTheme) {
    const accentHex = getComputedStyle(themeRoot).getPropertyValue("--color-accent").trim();
    const accentRgb = hexToRgb(accentHex);
    currentAccent = accentRgb;
    currentTheme = theme;

    console.log(`[theme-switch] Theme: ${theme}`);
    console.log(`[theme-switch] --color-accent: ${accentHex}`);
    console.log(`[theme-switch] Computed RGB: ${accentRgb}`);
  }
}

function animateSpotlight() {
  const speed = 0.1;
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;

  updateAccentFromTheme();

  spotlight.style.background = `
    radial-gradient(
      750px at ${currentX}px ${currentY}px,
      rgba(${currentAccent}, 0.25),
      transparent 80%
    )
  `;

  // Optional debug:
  // console.log(`[animation] Applied with ${currentAccent}`);

  requestAnimationFrame(animateSpotlight);
}

animateSpotlight();
