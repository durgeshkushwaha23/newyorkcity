gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



// Animate the letters using GSAP

// Animate "N" to the left corner
gsap.to(".loading h1", {
  x: "-40vw", // Move N to the left
  y: "-25vh", // Move N up
  duration: 1,
  onComplete: function() {
    gsap.to(".loading h1", { 
      opacity: 0, 
      duration: 0.5, 
      ease: "power1.inOut" 
    });
  }
  
});

// Animate "Y" to the middle
gsap.to(".loading h2", {
  x: "-5vw", // Centered horizontally
  y: "-11.9vw", // Centered vertically
  duration: 1,
  ease: "power2.out",
  onComplete: function() {
    gsap.to(".loading h2", { 
      opacity: 0, 
      duration: 0.5, 
      ease: "power1.inOut" 
    });
  }
});

// Animate "E" to the right corner
gsap.to(".loading h3", {
  x: "32vw", // Move E to the right
  y: "-25vh", // Move E up
  duration: 2,
  ease: "power2.out",
  opacity: 0,
  onComplete: function() {
    gsap.to(".loading h3", { 
      opacity: 0, 
      duration: 0.5, 
      ease: "power1.inOut" 
    });
  }

});
gsap.to(".tt",{
  y:"-100vw",
  delay:1,
  ease: "power2.out",

  duration: 2,
})

gsap.to(".boxes",{
  x:"-750%",
  scrollTrigger:{
    scroller:".main",
    trigger:".page5",
    // markers:true,
    start:"top 0%",
    end:"top -400%",
    scrub:5,
    pin:true,
    pinSpacing: false,
  }
})
 

gsap.to(".boxes:nth-child(even)",{
  x:"-1050%",
  scrollTrigger:{
    scroller:".main",
    trigger:".page5",
    // markers:true,
    start:"top 0%",
    end:"top -400%",
    scrub:5,
    // pin:true,
    pinSpacing: false,
  }
});


const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("overlay");
const closeBtn = document.createElement("button");

// Create Close Button Inside Menu
closeBtn.innerText = "✕";
closeBtn.classList.add("absolute", "top-5", "right-5", "text-2xl", "text-gray-700", "hover:text-red-500", "cursor-pointer");
sideMenu.appendChild(closeBtn);

menuBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("right-[-100%]");
    sideMenu.classList.toggle("right-0");
    overlay.classList.toggle("hidden");

    // Transform menu icon to 'X'
    menuBtn.children[0].classList.toggle("rotate-45", !sideMenu.classList.contains("right-[-100%]"));
    menuBtn.children[1].classList.toggle("-rotate-45", !sideMenu.classList.contains("right-[-100%]"));
    menuBtn.children[0].classList.toggle("translate-y-[10px]", !sideMenu.classList.contains("right-[-100%]"));
    menuBtn.children[1].classList.toggle("-translate-y-[10px]", !sideMenu.classList.contains("right-[-100%]"));
});

// Close Menu when clicking outside (overlay) or close button
const closeMenu = () => {
    sideMenu.classList.add("right-[-100%]");
    overlay.classList.add("hidden");

    // Reset menu icon
    menuBtn.children[0].classList.remove("rotate-45", "translate-y-[10px]");
    menuBtn.children[1].classList.remove("-rotate-45", "-translate-y-[10px]");
};

overlay.addEventListener("click", closeMenu);
closeBtn.addEventListener("click", closeMenu);
