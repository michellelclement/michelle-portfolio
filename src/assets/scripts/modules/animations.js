import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// gsap.from(".hero__text", {duration: 2, opacity: 0, stagger: 0.5});

let smoother = ScrollSmoother.create({
  smooth: 1.5,
  smoothTouch: 0.1
});

const items = Array.from(document.querySelectorAll('.js-animate-in, .js-animate-in-children > *'));
if (items.length) {
  ScrollTrigger.refresh();
  ScrollTrigger.batch(items, {
    start: 'top 80%', // Adjust this value to change when the animation starts
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