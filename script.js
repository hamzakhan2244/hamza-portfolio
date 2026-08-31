/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    const open = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

  });


  document.querySelectorAll("#navMenu a").forEach((link) => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progress =
  document.getElementById("scrollProgress");

if (progress) {

  window.addEventListener(
    "scroll",
    () => {

      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage = max
        ? (window.scrollY / max) * 100
        : 0;

      progress.style.width =
        `${percentage}%`;

    },
    { passive: true }
  );

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    observer.observe(element);

  });


/* =========================================================
   CURSOR GLOW
========================================================= */

const glow =
  document.getElementById("cursorGlow");

if (glow) {

  window.addEventListener(
    "pointermove",
    (e) => {

      glow.style.left =
        `${e.clientX}px`;

      glow.style.top =
        `${e.clientY}px`;

    },
    { passive: true }
  );

}


/* =========================================================
   HERO CODE CARD — 3D TILT
========================================================= */

const tiltArea =
  document.getElementById("tiltCard");

if (
  tiltArea &&
  window.matchMedia("(pointer:fine)").matches
) {

  const codeCard =
    tiltArea.querySelector(".code-card");

  if (codeCard) {

    tiltArea.addEventListener(
      "pointermove",
      (e) => {

        const rect =
          tiltArea.getBoundingClientRect();

        const x =
          (e.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (e.clientY - rect.top) /
          rect.height -
          0.5;

        const rotateY =
          x * 7;

        const rotateX =
          y * -7;

        codeCard.style.transform = `
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
        `;

      }
    );


    tiltArea.addEventListener(
      "pointerleave",
      () => {

        codeCard.style.transform =
          "rotateY(0deg) rotateX(0deg)";

      }
    );

  }

}


/* =========================================================
   3D SKILL CARD MOVEMENT
========================================================= */

const skillCards =
  document.querySelectorAll(".tilt-skill");


skillCards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (e) => {

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -7;

      const rotateY =
        ((x - centerX) / centerX) * 7;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.02)
      `;

    }
  );


  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)
      `;

    }
  );

});


/* =========================================================
   HERO CODE CARD — TYPING EFFECT
========================================================= */

const heroCode =
  document.querySelector(".code-card pre code");


if (heroCode) {

  /*
    Get all text nodes inside the code.
    This keeps your original colors intact.
  */

  const textNodes = [];


  function findTextNodes(node) {

    node.childNodes.forEach((child) => {

      if (child.nodeType === Node.TEXT_NODE) {

        textNodes.push(child);

      } else {

        findTextNodes(child);

      }

    });

  }


  findTextNodes(heroCode);


  /*
    Turn every character into a span.
  */

  const characters = [];


  textNodes.forEach((textNode) => {

    const text =
      textNode.textContent;

    const fragment =
      document.createDocumentFragment();


    for (let i = 0; i < text.length; i++) {

      const character =
        document.createElement("span");

      character.className =
        "hero-typing-character";

      character.textContent =
        text[i];

      fragment.appendChild(character);

      characters.push(character);

    }


    textNode.parentNode.replaceChild(
      fragment,
      textNode
    );

  });


  /*
    Start typing when page loads.
  */

  window.addEventListener(
    "load",
    () => {

      setTimeout(() => {

        let index = 0;

        const typingSpeed = 22;


        function typeNextCharacter() {

          if (index >= characters.length) {

            return;

          }


          characters[index]
            .classList.add("typed");


          index++;


          setTimeout(
            typeNextCharacter,
            typingSpeed
          );

        }


        typeNextCharacter();

      }, 600);

    }
  );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
