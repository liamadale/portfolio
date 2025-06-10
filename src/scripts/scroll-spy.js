const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

// Build a map of section IDs to their corresponding navigation links
const navLinkMap = new Map();
navLinks.forEach((link) => {
  const sectionId = link.dataset.section;
  if (sectionId) {
    navLinkMap.set(sectionId, link);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const navLink = navLinkMap.get(id);

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
