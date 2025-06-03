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

// Fullscreen button functionality
const fullscreenBtn = document.getElementById('fullscreen-btn');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        if (slideshowContainer.requestFullscreen) {
            slideshowContainer.requestFullscreen();
        } else if (slideshowContainer.webkitRequestFullscreen) { // Safari
            slideshowContainer.webkitRequestFullscreen();
        } else if (slideshowContainer.msRequestFullscreen) { // IE11
            slideshowContainer.msRequestFullscreen();
        }
    });
}

function showSlides() {
    const slides = document.getElementsByClassName('slide');

    // Debugging: Log the slides to ensure they are being processed
    console.log('Slides:', slides);

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    // Show the current slide
    slides[slideIndex].style.display = 'flex';

    // Increment slide index for next time
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    // Set timeout for the next slide
    setTimeout(showSlides, 10000); // Change slide every 10 seconds
}