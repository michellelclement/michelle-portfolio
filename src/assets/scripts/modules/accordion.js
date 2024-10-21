import gsap from 'gsap';

const accordionContent = 'js-accordion-content';
const activeClass = 'accord-is-active';

// Accordion toggle logic
function hide(parentEl) {
  const content = parentEl.querySelector(`.${accordionContent}`);
  parentEl.classList.remove(activeClass);
  gsap.to(content, {
    height: 0,
    duration: 0.4,
    ease: 'power2.out',
  });
}

function show(parentEl) {
  const content = parentEl.querySelector(`.${accordionContent}`);
  parentEl.classList.add(activeClass);
  gsap.set(content, { height: 'auto' });
  gsap.from(content, {
    height: 0,
    duration: 0.4,
    ease: 'power2.out',
  });
}

function toggleAccordion(e) {
  const parentEl = e.currentTarget.parentElement;
  if (parentEl.classList.contains(activeClass)) {
    hide(parentEl);
  } else {
    show(parentEl);
  }
}

// This function applies the event listeners, ensuring they are attached only once
export default function initAccordion() {
  const accordionButtons = document.querySelectorAll('.js-accordion');
  
  // Check if accordionButtons exist in the DOM
  if (accordionButtons.length === 0) return;
  
  // Remove existing event listeners (optional, just to ensure no duplicates)
  accordionButtons.forEach(button => {
    button.removeEventListener('click', toggleAccordion);
    button.addEventListener('click', toggleAccordion);
  });
}
