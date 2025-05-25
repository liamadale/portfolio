document.addEventListener("mousemove", (e) => {
  const spotlight = document.getElementById("spotlight");
  const { clientX: x, clientY: y } = e;

  spotlight.style.background = `
    radial-gradient(
      600px at ${x}px ${y}px,
      rgba(29, 78, 216, 0.1),
      transparent 80%
    )
  `;
});
