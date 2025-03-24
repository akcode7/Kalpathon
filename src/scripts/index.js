document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const fullPageMenu = document.getElementById('fullPageMenu');
    
    // Create audio elements with error handling
    let clickSound, hoverSound;
    
    try {
        // Try to load the audio files with correct paths
        clickSound = new Audio('./public/assets/mouse.mp3'); 
        hoverSound = new Audio('./public/assets/hover.mp3');
        linkhover = new Audio('./public/assets/scroll.mp3');
        
        // Preload the audio files to check if they exist
        clickSound.load();
        hoverSound.load();
        linkhover.load();
    } catch (error) {
        console.warn('Audio loading failed:', error);
    }
    
    // Function to safely play sound
    const playSound = (sound) => {
        // Only play sound if it exists and is properly loaded
        if (sound && sound.readyState > 0) {
            sound.currentTime = 0; // Reset sound to start
            sound.play().catch(error => console.log('Error playing sound:', error));
        }
    };
    
    if (menuBtn && closeMenuBtn && fullPageMenu) {
        // Add initial styles for animation with slower transition (1 second)
        fullPageMenu.style.transition = 'transform 0.8s ease-out';
        fullPageMenu.style.transform = 'translateY(100%)';
        
        // Open menu when menu button is clicked
        menuBtn.addEventListener('click', () => {
            if (clickSound) playSound(clickSound);
            if (hoverSound) playSound(hoverSound);
            console.log('Menu button clicked');
            
            fullPageMenu.classList.remove('hidden');
            fullPageMenu.classList.add('flex');
            
            // Trigger animation after a small delay to ensure display change has taken effect
            setTimeout(() => {
                fullPageMenu.style.transform = 'translateY(0)';
            }, 10);
            
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        // Close menu when close button is clicked
        closeMenuBtn.addEventListener('click', () => {
            if (clickSound) playSound(clickSound);
            if (hoverSound) playSound(hoverSound);
            
            fullPageMenu.style.transform = 'translateY(100%)';
            // Wait for animation to complete before hiding
            setTimeout(() => {
                fullPageMenu.classList.remove('flex');
                fullPageMenu.classList.add('hidden');
            }, 800); // Match this to your transition duration
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close menu when clicking on menu links
        const menuLinks = fullPageMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            // Click sound for links
            link.addEventListener('click', () => {
                if (clickSound) playSound(clickSound);
                if (hoverSound) playSound(hoverSound);
                
                fullPageMenu.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    fullPageMenu.classList.remove('flex');
                    fullPageMenu.classList.add('hidden');
                }, 800);
                document.body.style.overflow = '';
            });
        });

        //add hover sound for links
        menuLinks.forEach(link => {
            link.addEventListener('mouseover', () => {
                if (linkhover) playSound(linkhover);
            });
        });
    }

   

    
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all accordion items
    const accordionButtons = document.querySelectorAll('[data-accordion-target]');
    
    // Add click event listener to each accordion button
    accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get target content ID from data attribute
        const targetId = this.getAttribute('data-accordion-target');
        const targetContent = document.querySelector(targetId);
        
        // Toggle aria-expanded attribute
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle content visibility
        targetContent.classList.toggle('hidden');
        
        // Rotate the arrow icon
        const icon = this.querySelector('[data-accordion-icon]');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }
      });
    });
    
    // Open the first accordion item by default
    if (accordionButtons.length > 0) {
      const firstButton = accordionButtons[0];
      const firstTargetId = firstButton.getAttribute('data-accordion-target');
      const firstContent = document.querySelector(firstTargetId);
      
      firstButton.setAttribute('aria-expanded', 'true');
      firstContent.classList.remove('hidden');
    }
  });


function menuToggle() {
    const header = document.getElementById('header');
    const stickyMenu = document.getElementById('stickymenu');
    
    if (header && stickyMenu) {
        // Add initial transition styles
        header.style.transition = 'opacity 2s ease';
        stickyMenu.style.transition = 'opacity 2s ease';
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                header.classList.add('hidden');
                header.style.opacity = '0';
                stickyMenu.classList.remove('hidden');
                stickyMenu.style.opacity = '1';
            } else {
                header.classList.remove('hidden');
                header.style.opacity = '1';
                stickyMenu.classList.add('hidden');
                stickyMenu.style.opacity = '0';
            }
        });
    }
}
  menuToggle();



//adds hidden class to this id id="preloader" after 4 seconds and also slide up transition
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        setTimeout(() => {
            preloader.style.transition = 'transform 1s ease, opacity 1s ease';
            preloader.style.transform = 'translateY(-100%)';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1000); // Match this to your transition duration
        }, 4000);
    }
});

const stmenuBtn = document.getElementById('stmenuBtn');
const stfullPageMenu = document.getElementById('stfullPageMenu');
const stcloseMenuBtn = document.getElementById('stcloseMenuBtn');

    // Open menu when menu button is clicked
    stmenuBtn.addEventListener('click', () => {
       
        console.log('Menu button clicked');
        
        stfullPageMenu.classList.remove('hidden');
        stfullPageMenu.classList.add('flex');
        
        // Trigger animation after a small delay to ensure display change has taken effect
        setTimeout(() => {
            stfullPageMenu.style.transform = 'translateY(0)';
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    stcloseMenuBtn.addEventListener('click', () => {
       
        
        stfullPageMenu.style.transform = 'translateY(100%)';
        // Wait for animation to complete before hiding
        setTimeout(() => {
            stfullPageMenu.classList.remove('flex');
            stfullPageMenu.classList.add('hidden');
        }, 800); // Match this to your transition duration
        document.body.style.overflow = ''; // Re-enable scrolling
    });

      // Close menu when close button is clicked
      stcloseMenuBtn.addEventListener('click', () => {
       
        
        stfullPageMenu.style.transform = 'translateY(100%)';
        // Wait for animation to complete before hiding
        setTimeout(() => {
            stfullPageMenu.classList.remove('flex');
            stfullPageMenu.classList.add('hidden');
        }, 800); // Match this to your transition duration
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close menu when clicking on menu links
    const menuLinks = stfullPageMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        // Click sound for links
        link.addEventListener('click', () => {
           
            stfullPageMenu.style.transform = 'translateY(100%)';
            setTimeout(() => {
                stfullPageMenu.classList.remove('flex');
                stfullPageMenu.classList.add('hidden');
            }, 800);
            document.body.style.overflow = '';
        });
    });

    //add hover sound for links
    menuLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            if (linkhover) playSound(linkhover);
        });
    });


    
    

