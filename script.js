const reveals = document.querySelectorAll(".reveal");
const progress = document.querySelector(".scroll-progress");
const timelineLine = document.querySelector(".timeline-line");
const magneticButtons = document.querySelectorAll(".magnetic");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

reveals.forEach((item) => revealObserver.observe(item));

const lineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timelineLine.classList.add("active");
      }
    });
  },
  {
    threshold: 0.25,
  }
);

if (timelineLine) {
  lineObserver.observe(timelineLine);
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progressWidth = (scrollTop / docHeight) * 100;
  progress.style.width = `${progressWidth}%`;

  document.querySelectorAll(".hero-bg-orb").forEach((orb, index) => {
    const speed = index === 0 ? 0.12 : -0.08;
    orb.style.transform = `translateY(${scrollTop * speed}px)`;
  });
});

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(181, 140, 255, 0.16), #101326 38%)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#101326";
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}