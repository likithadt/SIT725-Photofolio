// Function to add animation class after a delay
function animateWords() {
    const words = document.querySelector('.animate');
    words.classList.add('animate-onload');
    words.style.visibility = 'visible';
}

// Trigger the animation after the page loads
window.addEventListener('load', function () {
    setTimeout(animateWords, 300); // Delay of 1 second (1000 milliseconds)
});

async function postLandingData() {
    const newUser = {
        name: "Likitha",
        role: "Photog",
        age: "25",
    }
    try {
        const resp = await fetch('/landing/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        const data = await resp.json();

        console.log("Data from server ::", data);
    } catch(error) {
        console.log("Error creating User", error);
    }
}

async function fetchLandingData() {
    try {
        const resp = await fetch('/landing/get', { method: 'GET'});
        const data = await resp.json();

        console.log("Data from server ::", data);
    } catch(error) {
        console.log("Error getting Data", error);
    }
}

postLandingData();
fetchLandingData();