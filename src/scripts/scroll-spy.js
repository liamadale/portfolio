const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.nav-link[data-section="${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        navLink?.classList.add("active");
      }
    });
  },
  {
    rootMargin: "0px 0px -60% 0px",
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});
