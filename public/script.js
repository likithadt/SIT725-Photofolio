// Function to add animation class after a delay
function animateWords() {
    const words = document.querySelector('.animate');
    words.classList.add('animate-onload');
    words.style.visibility = 'visible';
}

// Trigger the animation after the page loads
window.addEventListener('load', function () {
    setTimeout(animateWords, 1000); // Delay of 1 second (1000 milliseconds)
});