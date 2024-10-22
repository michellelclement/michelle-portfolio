import { gsap } from 'gsap';

export default function gradient() {
  const blobContainer = document.getElementById("blob-container");

  // Ensure blobContainer exists before proceeding
  if (!blobContainer) return;

  let xPercent = 50;
  let yPercent = 50;

  // Default animation for the gradient blob using GSAP
  const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
  tl.to(blobContainer, {
    duration: 2,
    ease: "power1.inOut",
    background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, #5167F0 0%, #F08C69 30%)`
  });

  // Function to update the gradient position on mouse move
  function moveGradient(event) {
    xPercent = (event.clientX / window.innerWidth) * 100;
    yPercent = (event.clientY / window.innerHeight) * 100;
    updateGradient(xPercent, yPercent);
    tl.pause();
  }

  // Function to update the gradient background
  function updateGradient(x, y) {
    gsap.to(blobContainer, {
      background: `radial-gradient(circle at ${x}% ${y}%, #5167F0 0%, #F08C69 30%)`,
      duration: 0.5,
      ease: "none"
    });
  }

  // Add mouse move event listener
  document.addEventListener("mousemove", moveGradient);

  // Restart the default animation when mouse leaves the container
  blobContainer.addEventListener("mouseleave", () => {
    tl.restart();
  });

  // Restart the default animation after a period of inactivity
  let inactivityTimeout;
  document.addEventListener("mousemove", () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      tl.restart();
    }, 200000);
  });

  // Clean up listeners on page leave to avoid multiple bindings
  return () => {
    document.removeEventListener("mousemove", moveGradient);
    blobContainer.removeEventListener("mouseleave", () => {
      tl.restart();
    });
  };
}
