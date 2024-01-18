import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let images = gsap.utils.toArray(".js-images__image");
gsap.to(images, {
  xPercent: -100 * (images.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: '.images',
    scrub: 1,
    end: "+=3500",
  }
});