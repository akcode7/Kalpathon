 //horizontal scroll gsap
 gsap.registerPlugin(ScrollTrigger);

 let sections = gsap.utils.toArray(".slide");
 
 gsap.to(sections, {
   xPercent: -100 * (sections.length - 1),
   ease: "none",
   scrollTrigger: {
     trigger: ".start-scroll",
     pin: true,
     markers: true,
     scrub: 1,
     snap: 1 / (sections.length - 1),
     end: () => "+=" + document.querySelector(".start-scroll").offsetWidth
   }
 });