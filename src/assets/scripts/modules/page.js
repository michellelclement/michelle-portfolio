import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import initAccordion from './accordion'; // Import accordion module
import gradient from './gradient';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let gradientCleanup = null; // Variable to store the cleanup function

//Page Transition
function delay(n) {
  return new Promise((done) => {
    setTimeout(done, n || 2000);
  });
}

function pageTransition() {
  const tl = gsap.timeline();
  tl.to('.loading-screen', {
    duration: 1.2,
    width: '100%',
    left: '0%',
    ease: 'Expo.easeInOut',
  }).to('.loading-screen', {
    duration: 1,
    width: '100%',
    left: '100%',
    ease: 'Expo.easeInOut',
    delay: 0.2,
  }).set('.loading-screen', { left: '-100%' });
}

function heroAnimation() {
  gsap.timeline().from('.js-hero-animate-this', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });
}

function animateTextInSections() {
  const items = Array.from(document.querySelectorAll('.js-animate-in, .js-animate-in-children > *'));
  if (items.length) {
    ScrollTrigger.batch(items, {
      start: 'top 70%',
      end: 'bottom 20%',
      onEnter: (els) => gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: 'back.out(1.1)',
      }),
      once: true,
    });
  }
}

// Barba.js transitions
barba.init({
  sync: true,
  transitions: [
    {
      async leave() {
        const done = this.async();
        pageTransition();
        await delay(1000);

        // Clean up gradient event listeners on leave
        if (gradientCleanup) {
          gradientCleanup();
        }
        done();
      },
      async enter() {
        // Re-initialize animations for new content
        heroAnimation();
        gradientCleanup = gradient(); // Reattach gradient with cleanup
        initAccordion(); // Initialize accordion after new page load
      },
      async once() {
        // Initialize animations on the first load
        heroAnimation();
        animateTextInSections();
        gradientCleanup = gradient(); // Reattach gradient with cleanup
        initAccordion(); // Initialize accordion on first page load
      },
      async after() {
        // Ensure any content animations work after the page transition
        animateTextInSections();
        gradientCleanup = gradient(); // Reattach gradient with cleanup
      },
    },
  ],
});

// Smooth Scroller
window.addEventListener('load', () => {
  let smoother = ScrollSmoother.create({
    smooth: 1.5,
    smoothTouch: 0.1,
  });
});
