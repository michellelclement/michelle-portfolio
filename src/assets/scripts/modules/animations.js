import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Plus Spin
const plus = document.getElementById('plus');
gsap.to(plus, {
  duration: 2,
  rotation: 360,
  repeat: 20,
  ease: "none"
});

// Start scroll and spin
const tl = gsap.timeline({
  scrollTrigger: {
    scrub: 1,
    pin: true,
    trigger: '#star',
    start: "center center",
    markers: true,
  },
});

tl.to("#star", {
  rotateZ: 500,
});
