import gsap from 'gsap';
const accordionContent = 'js-accordion-content';
const accordionButtons = Array.from(document.querySelectorAll('.js-accordion'));
const activeClass = 'accord-is-active';

function hide(parentEl) {
  const el = parentEl;
  el.classList.remove(activeClass);
  const content = el.querySelector(`.${accordionContent}`);
  
  gsap.to(content, {
    height: 0,
    duration: 0.4,
    ease: 'power2.out',
    immediateRender: false
  });
}

function show(parentEl) {
  const el = parentEl;
  el.classList.add(activeClass);
  const content = el.querySelector(`.${accordionContent}`);
  const tl = gsap.timeline();

  tl.set(content, {height: 'auto'})
  .from(content, {
    height: 0,
    duration: 0.4,
    ease: 'power2.out',
    immediateRender: false
  });
}

function toggle(e) {
  const clicked = e.currentTarget;
  const parentEl = clicked.parentElement;
 
 if (parentEl.classList.contains(activeClass)) {
  hide(parentEl);
 } else {
  show(parentEl);
 }
}


export default function() {
  accordionButtons.forEach(button => {
    button.addEventListener('click', toggle);  
  })
}