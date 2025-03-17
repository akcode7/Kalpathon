function initHorizontalScroll() {
    //horizontal scroll gsap
    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".slide");
    const pinContainer = document.querySelector(".pin-container");

 

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
}

// Call the function to initialize the horizontal scroll


document.addEventListener("DOMContentLoaded", function() {
    const sliderWrapper = document.getElementById("pinnedcn");

    if (sliderWrapper) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initHorizontalScroll();
                    observer.unobserve(sliderWrapper); // Stop observing after initialization
                }
            });
        });

        observer.observe(sliderWrapper);
    }
});