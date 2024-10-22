import { gsap } from 'gsap';

// Original code by Dilip Parasu via Codepen https://codepen.io/SuperSecureHuman/pen/NWoVXxp

export default function gradient() {
  const blobContainer = document.getElementById("blob-container");

  // Function to clean up listeners
  let removeEventListeners;

  // Check screen size and decide whether to initialize the blob
  function checkScreenSize() {
    // Mobile screen size threshold, adjust if needed
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // If mobile, remove event listeners and hide the blob if necessary
    if (isMobile) {
      // Hide the blob using CSS
      if (blobContainer) {
        blobContainer.style.display = 'none';
      }

      // Remove event listeners if they've been added
      if (removeEventListeners) {
        removeEventListeners();
      }

    } else {
      // Show the blob on larger screens
      if (blobContainer) {
        blobContainer.style.display = 'block';
      }

      // Initialize or reinitialize the blob animations and event listeners
      initializeBlob();
    }
  }

  // Function to initialize the blob and its animations
  function initializeBlob() {
    let xPercent = 50;
    let yPercent = 50;

    if (!blobContainer) return;

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

    // Store cleanup function to remove listeners
    removeEventListeners = () => {
      document.removeEventListener("mousemove", moveGradient);
      blobContainer.removeEventListener("mouseleave", () => {
        tl.restart();
      });
    };
  }

  // Initial check when the script runs
  checkScreenSize();

  // Check screen size on window resize
  window.addEventListener('resize', checkScreenSize);

  // Clean up listeners on page leave to avoid multiple bindings
  return () => {
    if (removeEventListeners) {
      removeEventListeners();
    }
    window.removeEventListener('resize', checkScreenSize);
  };
}
