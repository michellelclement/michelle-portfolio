import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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