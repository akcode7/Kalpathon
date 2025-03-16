document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const fullPageMenu = document.getElementById('fullPageMenu');
    
    // Create audio elements with error handling
    let clickSound, hoverSound;
    
    try {
        // Try to load the audio files with correct paths
        clickSound = new Audio('./assets/mouse.mp3'); 
        hoverSound = new Audio('./assets/hover.mp3');
        linkhover = new Audio('./assets/scroll.mp3');
        
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

    // Enhanced scroll-triggered video functionality
    gsap.registerPlugin(ScrollTrigger);
    
    function setupScrollVideo() {
        const video = document.querySelector('.hero-video');
        
        if (!video) {
            console.warn('Video element not found');
            return;
        }
        
        // First, correct the video path if needed
        const videoSource = video.querySelector('source');
        if (videoSource && videoSource.src.includes('../../public/')) {
            videoSource.src = videoSource.src.replace('../../public/', './');
            video.load(); // Reload video with corrected path
        }
        
        console.log('Setting up scroll video');
        
        // Load metadata to get video duration
        video.addEventListener('loadedmetadata', () => {
            const videoDuration = video.duration;
            console.log(`Video duration: ${videoDuration} seconds`);
            
            // Keep track of the current frame/time
            let currentFrame = 0;
            
            // Pause video initially and make sure it's ready
            video.pause();
            video.currentTime = 0;
            
            // Create a ScrollTrigger instance
            const scrollTrigger = ScrollTrigger.create({
                trigger: '#hero',
                start: 'top top',
                end: '+=300%', // Adjust this value to control how long the scroll effect lasts
                pin: true,     // Pin the section while the effect is active
                scrub: 0.5,    // Smooth scrolling effect with slight delay for better user experience
                markers: false, // Set to true for debugging
                onUpdate: self => {
                    // Map scroll progress (0 to 1) to video time
                    const targetTime = self.progress * videoDuration;
                    
                    // Only update if there's a significant change to improve performance
                    if (Math.abs(video.currentTime - targetTime) > 0.01) {
                        video.currentTime = targetTime;
                        currentFrame = targetTime;
                    }
                },
                onEnter: () => {
                    console.log('Entered video section');
                },
                onLeave: () => {
                    console.log('Left video section');
                }
            });
            
            // Add title animation
            const title = document.querySelector('#hero h1');
            const subtitle = document.querySelector('#hero p');
            
            if (title && subtitle) {
                // Reset position first
                gsap.set([title, subtitle], { y: 50, opacity: 0 });
                
                // Create animation timeline
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#hero',
                        start: 'top center',
                        toggleActions: 'play none none reverse',
                    }
                });
                
                tl.to(title, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                })
                .to(subtitle, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.5');
            }
            
            // Add a scroll hint that disappears after scrolling starts
            const scrollHint = document.querySelector('#hero .animate-bounce');
            if (scrollHint) {
                ScrollTrigger.create({
                    trigger: '#hero',
                    start: 'top top',
                    end: 'top+=100 top',
                    onEnter: () => {
                        gsap.to(scrollHint, {
                            opacity: 0,
                            y: 20,
                            duration: 0.5
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(scrollHint, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5
                        });
                    }
                });
            }
            
            // Handle resize to maintain proper scrolling
            window.addEventListener('resize', () => {
                ScrollTrigger.refresh();
            });
            
            
        });
        
        // Error handling for video
        video.addEventListener('error', (e) => {
            console.error('Video error:', e);
            
            // Add fallback background if video fails
            const heroSection = document.querySelector('#hero');
            if (heroSection) {
                heroSection.style.backgroundImage = 'linear-gradient(135deg, #000428 0%, #004e92 100%)';
                heroSection.classList.add('video-error');
            }
        });
        
        // Start loading the video
        video.load();
    }
    
    // Small delay to ensure DOM is fully loaded
    setTimeout(() => {
        setupScrollVideo();
    }, 100);

  
 
});


