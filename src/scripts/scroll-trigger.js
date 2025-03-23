function initHorizontalScroll() {
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
     // Handle window resize for responsive behavior
     window.addEventListener("resize", () => {
        // Refresh all ScrollTrigger instances when window is resized
        ScrollTrigger.refresh();
    });
});

//timeline horizontal scroll
function timeHorizontalScroll() {
    //horizontal scroll gsap
    gsap.registerPlugin(ScrollTrigger);

    let sectionstm = gsap.utils.toArray(".tmslide");
    
 

    gsap.to(sectionstm, {
        xPercent: -80 * (sectionstm.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".tmstart-scroll",
            pin: true,
            markers: true,
            scrub: 1,
          
            snap: 1 / (sectionstm.length - 1),
            end: () => "+=" + document.querySelector(".tmstart-scroll").offsetWidth
        }
    });

  
}

// Call the function to initialize the horizontal scroll


document.addEventListener("DOMContentLoaded", function() {
    const sliderWrappertm = document.getElementById("pinnedtm");

    if (sliderWrappertm) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeHorizontalScroll();
                    observer.unobserve(sliderWrappertm); // Stop observing after initialization
                }
            });
        });

        observer.observe(sliderWrappertm);
    }
   
});