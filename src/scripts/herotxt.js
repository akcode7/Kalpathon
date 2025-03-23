//hero text effect
const textContainer = document.querySelector('.text-container');
        const textGradient = document.querySelector('.text-gradient');
        
        // Mouse move event for desktop
        textContainer.addEventListener('mousemove', (e) => {
            const rect = textContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = x / rect.width * 100;
            const centerY = y / rect.height * 100;
            
            textGradient.style.clipPath = `circle(50% at ${centerX}% ${centerY}%)`;
            textGradient.style.backgroundPosition = `${(centerX - 50) * 2}% ${(centerY - 50) * 2}%`;
        });
        
        textContainer.addEventListener('mouseleave', () => {
            textGradient.style.clipPath = 'circle(0% at 50% 50%)';
        });
        
        // Touch events for mobile
        textContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = textContainer.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                const centerX = x / rect.width * 100;
                const centerY = y / rect.height * 100;
                
                textGradient.classList.add('active');
                textGradient.style.clipPath = `circle(50% at ${centerX}% ${centerY}%)`;
                textGradient.style.backgroundPosition = `${(centerX - 50) * 2}% ${(centerY - 50) * 2}%`;
            }
        });
        
        textContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = textContainer.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                const centerX = x / rect.width * 100;
                const centerY = y / rect.height * 100;
                
                textGradient.style.clipPath = `circle(50% at ${centerX}% ${centerY}%)`;
                textGradient.style.backgroundPosition = `${(centerX - 50) * 2}% ${(centerY - 50) * 2}%`;
            }
        });
        
        textContainer.addEventListener('touchend', () => {
            textGradient.classList.remove('active');
            textGradient.style.clipPath = 'circle(0% at 50% 50%)';
        });