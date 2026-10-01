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
   HERO CODE CARD — 3D TILT + CURSOR GLOW
========================================================= */

const tiltArea = document.getElementById("tiltCard");

if (
  tiltArea &&
  window.matchMedia("(pointer:fine)").matches
) {
  const codeCard = tiltArea.querySelector(".code-card");

  if (codeCard) {

    tiltArea.addEventListener("pointermove", (e) => {

      const rect = codeCard.getBoundingClientRect();

      /* 3D tilt */

      const x =
        (e.clientX - rect.left) / rect.width - 0.5;

      const y =
        (e.clientY - rect.top) / rect.height - 0.5;

      codeCard.style.transform = `
        rotateY(${x * 7}deg)
        rotateX(${y * -7}deg)
      `;


      /* Cursor position */

      codeCard.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );

      codeCard.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );

    });


    tiltArea.addEventListener("pointerleave", () => {

      codeCard.style.transform =
        "rotateY(0deg) rotateX(0deg)";

      codeCard.style.setProperty(
        "--mouse-x",
        "-300px"
      );

      codeCard.style.setProperty(
        "--mouse-y",
        "-300px"
      );

    });

  }
}


/* =========================================================
   TOOLKIT CARDS — CURSOR FOLLOWING GLOW
========================================================= */

const toolkitCards =
  document.querySelectorAll(".toolkit-card");

if (
  toolkitCards.length &&
  window.matchMedia("(pointer:fine)").matches
) {

  toolkitCards.forEach((card) => {

    card.addEventListener("pointermove", (e) => {

      const rect = card.getBoundingClientRect();

      /* Cursor position */

      card.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );

    });


    card.addEventListener("pointerleave", () => {

      card.style.setProperty(
        "--mouse-x",
        "-300px"
      );

      card.style.setProperty(
        "--mouse-y",
        "-300px"
      );

    });

  });

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

/* =========================================================
   ANIMATED NETWORK BACKGROUND
========================================================= */

const networkCanvas =
  document.getElementById("network-bg");

if (networkCanvas) {

  const ctx =
    networkCanvas.getContext("2d");

  let width;
  let height;

  let particles = [];

  const mouse = {
    x: null,
    y: null,
    radius: 140
  };


  /* -----------------------------------------
     RESIZE CANVAS
  ----------------------------------------- */

  function resizeNetworkCanvas() {

    width = networkCanvas.width =
      window.innerWidth * window.devicePixelRatio;

    height = networkCanvas.height =
      window.innerHeight * window.devicePixelRatio;

    networkCanvas.style.width =
      `${window.innerWidth}px`;

    networkCanvas.style.height =
      `${window.innerHeight}px`;

    ctx.setTransform(
      window.devicePixelRatio,
      0,
      0,
      window.devicePixelRatio,
      0,
      0
    );

    createParticles();
  }


  /* -----------------------------------------
     CREATE PARTICLES
  ----------------------------------------- */

  function createParticles() {

    particles = [];

    const isMobile =
      window.innerWidth < 768;

    const count =
      isMobile ? 38 : 75;

    for (let i = 0; i < count; i++) {

      particles.push({

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        size:
          Math.random() * 1.5 + 0.5,

        speedX:
          (Math.random() - 0.5) * 0.25,

        speedY:
          (Math.random() - 0.5) * 0.25,

        opacity:
          Math.random() * 0.55 + 0.2,

        color:
          Math.random() > 0.5
            ? "139,124,255"
            : "82,217,255"
      });
    }
  }


  /* -----------------------------------------
     MOUSE POSITION
  ----------------------------------------- */

  window.addEventListener(
    "pointermove",
    (e) => {

      mouse.x = e.clientX;
      mouse.y = e.clientY;

    },
    { passive: true }
  );


  window.addEventListener(
    "pointerleave",
    () => {

      mouse.x = null;
      mouse.y = null;

    }
  );


  /* -----------------------------------------
     DRAW PARTICLES
  ----------------------------------------- */

  function drawParticles() {

    particles.forEach((particle) => {

      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(${particle.color}, ${particle.opacity})`;

      ctx.fill();


      /* Small glow around some particles */

      if (particle.size > 1.2) {

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size * 4,
          0,
          Math.PI * 2
        );

        const glow =
          ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 4
          );

        glow.addColorStop(
          0,
          `rgba(${particle.color}, 0.16)`
        );

        glow.addColorStop(
          1,
          `rgba(${particle.color}, 0)`
        );

        ctx.fillStyle = glow;

        ctx.fill();
      }

    });
  }


  /* -----------------------------------------
     CONNECT PARTICLES
  ----------------------------------------- */

  function connectParticles() {

    const maxDistance = 135;

    for (let i = 0; i < particles.length; i++) {

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {

        const p1 = particles[i];
        const p2 = particles[j];

        const dx =
          p1.x - p2.x;

        const dy =
          p1.y - p2.y;

        const distance =
          Math.sqrt(dx * dx + dy * dy);


        if (distance < maxDistance) {

          const opacity =
            (1 - distance / maxDistance) * 0.22;


          ctx.beginPath();

          ctx.moveTo(
            p1.x,
            p1.y
          );

          ctx.lineTo(
            p2.x,
            p2.y
          );

          ctx.strokeStyle =
            `rgba(139, 124, 255, ${opacity})`;

          ctx.lineWidth = 0.6;

          ctx.stroke();

        }

      }
    }
  }


  /* -----------------------------------------
     MOUSE CONNECTIONS
  ----------------------------------------- */

  function connectMouse() {

    if (
      mouse.x === null ||
      mouse.y === null
    ) {
      return;
    }


    particles.forEach((particle) => {

      const dx =
        particle.x - mouse.x;

      const dy =
        particle.y - mouse.y;

      const distance =
        Math.sqrt(dx * dx + dy * dy);


      if (distance < mouse.radius) {

        const opacity =
          (1 - distance / mouse.radius) * 0.28;


        ctx.beginPath();

        ctx.moveTo(
          particle.x,
          particle.y
        );

        ctx.lineTo(
          mouse.x,
          mouse.y
        );

        ctx.strokeStyle =
          `rgba(82, 217, 255, ${opacity})`;

        ctx.lineWidth = 0.7;

        ctx.stroke();

      }

    });
  }


  /* -----------------------------------------
     UPDATE PARTICLES
  ----------------------------------------- */

  function updateParticles() {

    particles.forEach((particle) => {

      particle.x += particle.speedX;
      particle.y += particle.speedY;


      /* Bounce from screen edges */

      if (
        particle.x < 0 ||
        particle.x > window.innerWidth
      ) {
        particle.speedX *= -1;
      }


      if (
        particle.y < 0 ||
        particle.y > window.innerHeight
      ) {
        particle.speedY *= -1;
      }

    });
  }


  /* -----------------------------------------
     ANIMATION LOOP
  ----------------------------------------- */

  function animateNetwork() {

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    /* Very subtle purple atmospheric glow */

    const glow1 =
      ctx.createRadialGradient(
        window.innerWidth * 0.2,
        window.innerHeight * 0.25,
        0,
        window.innerWidth * 0.2,
        window.innerHeight * 0.25,
        350
      );

    glow1.addColorStop(
      0,
      "rgba(139,124,255,0.045)"
    );

    glow1.addColorStop(
      1,
      "rgba(139,124,255,0)"
    );

    ctx.fillStyle = glow1;

    ctx.fillRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    /* Cyan atmospheric glow */

    const glow2 =
      ctx.createRadialGradient(
        window.innerWidth * 0.8,
        window.innerHeight * 0.65,
        0,
        window.innerWidth * 0.8,
        window.innerHeight * 0.65,
        400
      );

    glow2.addColorStop(
      0,
      "rgba(82,217,255,0.035)"
    );

    glow2.addColorStop(
      1,
      "rgba(82,217,255,0)"
    );

    ctx.fillStyle = glow2;

    ctx.fillRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    updateParticles();

    connectParticles();

    connectMouse();

    drawParticles();

    requestAnimationFrame(
      animateNetwork
    );
  }


  /* -----------------------------------------
     START
  ----------------------------------------- */

  resizeNetworkCanvas();

  animateNetwork();


  window.addEventListener(
    "resize",
    resizeNetworkCanvas
  );

}

/* =========================================================
   ACTIVE NAV LINK ON SCROLL
========================================================= */

const sections = document.querySelectorAll(
  "main section[id]"
);

const navLinks = document.querySelectorAll(
  "#navMenu a[href^='#']"
);

function updateActiveNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop - 150 &&
      window.scrollY < sectionTop + sectionHeight - 150
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${currentSection}`
    ) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav, {
  passive: true
});

window.addEventListener("load", updateActiveNav);
