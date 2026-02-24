/* --- 1. Navigation & UI Functions --- */
function scrollToProjects() {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Carousel Dots logic (if you are still using the dot navigation)
function moveSlide(index) {
    const wrapper = document.getElementById('carouselWrapper');
    const dots = document.querySelectorAll('.dot');
    if (wrapper) {
        wrapper.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }
}

/* --- 2. Smooth Project Slider Logic --- */
const slider = document.querySelector('.slider-container');
let isDown = false;
let startX;
let scrollLeft;
const driftSpeed = 0.8; // Adjust for faster/slower drift

function drift() {
    if (slider && !isDown) {
        slider.scrollLeft += driftSpeed;
        
        // Reset to start for infinite loop
        // We use -2 to ensure it resets before hitting the literal edge
        if (slider.scrollLeft >= (slider.scrollWidth - slider.offsetWidth - 2)) {
            slider.scrollLeft = 0;
        }
    }
    // This syncs movement with your monitor's refresh rate (smooth 60fps)
    requestAnimationFrame(drift);
}

if (slider) {
    // --- Mouse Events ---
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('is-dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag sensitivity
        slider.scrollLeft = scrollLeft - walk;
    });

    // --- Mobile Touch Events ---
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('is-dragging');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Start the animation loop
    requestAnimationFrame(drift);
}