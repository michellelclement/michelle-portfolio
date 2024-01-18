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
    delay: 0.3
  });
  tl.set('.loading-screen', { left: '-100%' });
}

function heroAnimation() {
  var tl = gsap.timeline();
  tl.from(".js-hero-animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(1000);
        done();
      },

      async enter(data) {
        heroAnimation();
      },

      async once(data) {
          heroAnimation();
      },
    }
  ]
});

// Smooth Scroller
let smoother = ScrollSmoother.create({
  smooth: 1.5,
  smoothTouch: 0.1
});

// Animate in text
// const items = Array.from(document.querySelectorAll('.js-animate-in, .js-animate-in-children > *'));
// if (items.length) {
//   ScrollTrigger.refresh();
//   ScrollTrigger.batch(items, {
//     start: 'top 80%', // Adjust this value to change when the animation starts
//     end: 'bottom 20%',
//     onEnter: (els) => {
//       gsap.to(els, {
//         y: 0,
//         opacity: 1,
//         duration: 0.3,
//         stagger: 0.1,
//         ease: 'back.out(1.1)'
//       });
//     },
//     once: true,
//   });
// }
