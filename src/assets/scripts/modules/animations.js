import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// PLUS
const plus = document.getElementById('plus');
gsap.to(plus, {
  duration: 2,
  rotation: 360,
  repeat: 20,
  ease: "none"
});

// STAR
const star = document.getElementById('star');

// Initial slow rotation animation upon page load
gsap.to(star, {
  duration: 8,
  rotation: 360,
  repeat: -1,
  ease: "none",
});

// Timeline for scroll-triggered rotation speed variation
const tl = gsap.timeline({
  scrollTrigger: {
    scrub: 1,
    pin: true,
    trigger: '#star',
    start: "center center",
    end: () => "+=" + document.body.clientHeight,
  },
});

// tl.to(star, {
//   rotateZ: 500,
// });



