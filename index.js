document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];
  const revealElements = document.querySelectorAll(".section-reveal");
  const sectionLinks = document.querySelectorAll('a[href^="#"]');

  const setMenuState = (isOpen) => {
    if (!navToggle || !mobileNav) {
      return;
    }

    navToggle.setAttribute("aria-expanded", String(isOpen));
    mobileNav.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
  };

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });

    mobileNav.addEventListener("click", (event) => {
      if (event.target === mobileNav) {
        setMenuState(false);
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });

    const desktopBreakpoint = window.matchMedia("(min-width: 901px)");
    desktopBreakpoint.addEventListener("change", (event) => {
      if (event.matches) {
        setMenuState(false);
      }
    });
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px 0px",
      }
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains("active")) {
        revealObserver.observe(element);
      }
    });
  } else {
    revealElements.forEach((element) => element.classList.add("active"));
  }

  sectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#" || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });

      setMenuState(false);
    });
  });
});
