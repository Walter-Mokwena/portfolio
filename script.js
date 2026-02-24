function scrollToProjects() {
    document.getElementById("projects")
        .scrollIntoView({ behavior: "smooth" });
}

function moveSlide(index) {
    const wrapper = document.getElementById('carouselWrapper');
    const dots = document.querySelectorAll('.dot');
    
    // Move the wrapper by -100%, -200%, etc.
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    
    // Update Active Dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}