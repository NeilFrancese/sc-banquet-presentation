// Select the slideshow container from the DOM
const slideshowContainer = document.querySelector('.slideshow-container');

// Debugging: Log the slideshow container and added images
console.log('Slideshow Container:', slideshowContainer);

// Fetch and display images dynamically from the JSON file
fetch('resources/images/collages.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load image list JSON');
        }
        return response.json();
    })
    .then(collageImages => {
        // Clear existing slides
        slideshowContainer.innerHTML = '';

        // Populate slideshow with sorted images and metadata
        collageImages.forEach((imageData, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide fade';

            const imgElement = document.createElement('img');
            imgElement.src = `resources/images/${imageData.filename}`; // Updated path
            imgElement.alt = `Collage Photo ${index + 1}`;
            slideDiv.appendChild(imgElement);

            /* Not adding watermarks for now, but can be uncommented if needed
            const watermark = document.createElement('img');
            watermark.className = 'watermark';
            if (imageData.category === 'Varsity') {
                watermark.src = 'resources/images/watermarks/varsity.png';
            } else if (imageData.category === 'Mod') {
                watermark.src = 'resources/images/watermarks/mod.png';
            }
            watermark.alt = `${imageData.category} Watermark`;
            slideDiv.appendChild(watermark);
            */

            slideshowContainer.appendChild(slideDiv);
        });

        // Start the slideshow
        showSlides();
    })
    .catch(error => {
        console.error('Error loading images:', error);
    });

// Slideshow functionality
let slideIndex = 0;
let slideTimeout = null;

// Fullscreen button functionality
const fullscreenBtn = document.getElementById('fullscreen-btn');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        const elem = document.documentElement;
        // Try to use the best available fullscreen API for mobile browsers
        if (slideshowContainer.requestFullscreen) {
            slideshowContainer.requestFullscreen();
        } else if (slideshowContainer.webkitRequestFullscreen) { // Safari
            slideshowContainer.webkitRequestFullscreen();
        } else if (slideshowContainer.msRequestFullscreen) { // IE11
            slideshowContainer.msRequestFullscreen();
        } else if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    });
}

function showSlides(index = slideIndex) {
    const slides = document.getElementsByClassName('slide');

    // Debugging: Log the slides to ensure they are being processed
    console.log('Slides:', slides);

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    // Show the current slide
    slides[index].style.display = 'flex';
    slideIndex = index;

    // Clear previous timeout if any
    if (slideTimeout) clearTimeout(slideTimeout);
    slideTimeout = setTimeout(() => {
        showSlides((slideIndex + 1) % slides.length);
    }, 10000); // Change slide every 10 seconds
}

// Keyboard navigation for arrow keys
window.addEventListener('keydown', (e) => {
    const slides = document.getElementsByClassName('slide');
    if (!slides.length) return;
    if (e.key === 'ArrowRight') {
        showSlides((slideIndex + 1) % slides.length);
    } else if (e.key === 'ArrowLeft') {
        showSlides((slideIndex - 1 + slides.length) % slides.length);
    }
});

// Touch swipe support for mobile navigation
let touchStartX = null;
slideshowContainer.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
    }
});
slideshowContainer.addEventListener('touchend', function(e) {
    if (touchStartX === null) return;
    let touchEndX = e.changedTouches[0].clientX;
    let diffX = touchEndX - touchStartX;
    const slides = document.getElementsByClassName('slide');
    if (Math.abs(diffX) > 50 && slides.length) { // threshold for swipe
        if (diffX < 0) {
            // Swipe left: next slide
            showSlides((slideIndex + 1) % slides.length);
        } else {
            // Swipe right: previous slide
            showSlides((slideIndex - 1 + slides.length) % slides.length);
        }
    }
    touchStartX = null;
});