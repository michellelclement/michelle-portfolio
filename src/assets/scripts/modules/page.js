import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

//Page Transition
function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline();
  tl.to('.loading-screen', {
    duration: 1.2,
    width: '100%',
    left: '0%',
    ease: 'Expo.easeInOut'
  });

  tl.to('.loading-screen', {
    duration: 1,
    width: '100%',
    left: '100%',
    ease: 'Expo.easeInOut',
    delay: 0.2
  });
  tl.set('.loading-screen', { left: '-100%' });
}

function heroAnimation() {
  var tl = gsap.timeline();
  tl.from(".js-hero-animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
}

function animateTextInSections() {
  const items = Array.from(document.querySelectorAll('.js-animate-in, .js-animate-in-children > *'));
  if (items.length) {
    ScrollTrigger.batch(items, {
      start: 'top 70%',
      end: 'bottom 20%',
      onEnter: (els) => {
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: 'back.out(1.1)'
        });
      },
      once: true,
    });
  }
}

// Function to close the mobile menu
function closeMobileMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  if (burgerMenu) {
    burgerMenu.classList.toggle('closed'); // Ensure it uses classList.toggle
  }
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        try {
          pageTransition();
          await delay(1000);
          window.scrollTo(0, 0);
        } catch (error) {
          console.error("Error during leave transition:", error);
        }
        done();
      },

      async enter(data) {
        // Clear previous ScrollTriggers before initializing new ones
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Re-initialize animations for new content
        heroAnimation();
        closeMobileMenu();
        // animateTextInSections(); // Animate text when entering a new page
      },

      async once(data) {
        // Initialize animations on the first load
        heroAnimation();
        animateTextInSections(); // Animate text on first load
      },

      async after(data) {
        // Ensure text animations work after every transition
        animateTextInSections();
      },
    }
  ]
});

// Smooth Scroller
window.addEventListener('load', () => {
  let smoother = ScrollSmoother.create({
    smooth: 1.5,
    smoothTouch: 0.1
  });
});