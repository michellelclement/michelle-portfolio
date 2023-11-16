import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// gsap.from(".hero__header-1, .hero__header-2, .hero__sub-header", {duration: 2, x: 300});

gsap.from(".hero__text", {duration: 2, opacity: 0, stagger: 0.5});

let smoother = ScrollSmoother.create({
  smooth: 1.5,
  smoothTouch: 0.1
});