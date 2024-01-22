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
    ScrollTrigger.refresh();
    ScrollTrigger.batch(items, {
      start: 'top 80%',
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

function plusAnimation() {
  const plus = document.getElementById('plus');
    gsap.to(plus, {
    duration: 2,
    rotation: 360,
    repeat: -1,
    ease: "none"
  });
}

function starAnimation() {
  const star = document.getElementById('star');
  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      pin: true,
      trigger: '#star',
      start: "center center",
      end: () => "+=" + document.body.clientHeight,
    },
  });

  tl.to(star, {
    rotateZ: 500,
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1000);
        window.scrollTo(0, 0);
        done();
      },

      async enter(data) {
        await delay(500);
        heroAnimation();
        plusAnimation();
        starAnimation();
      },

      async once(data) {
        await delay(700);
        heroAnimation();
        plusAnimation();
        starAnimation();
        animateTextInSections();
      },

      async after(data) {
        animateTextInSections();
      },
    }
  ]
});

// Smooth Scroller
let smoother = ScrollSmoother.create({
  smooth: 1.5,
  smoothTouch: 0.1
});