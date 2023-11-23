import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

var tl = gsap.timeline(),
mySplitText = new SplitText("#js-opening-copy", { type: "words,chars"}),
chars = mySplitText.chars;

gsap.set("#js-opening-copy", {perspective: 400 });

tl.from(chars, {
  duration: 0.5,
  opacity: 0,
  scale: 0,
  y: 20,
  transformOrigin: "0% 50% -50",
  ease: "back",
  stagger: 0.01
})