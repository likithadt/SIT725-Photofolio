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
        id: 2,
        name: "Likitha",
        role: "Photog",
        age: 25,
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

async function updateData() {
    const updateData = {
        role: "Client",
    }
    try {
        const resp = await fetch('/landing/update/1', { 
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });
        const data = await resp.json();

        console.log("Data from server ::", data);
    } catch(error) {
        console.log("Error getting Data", error);
    }
}

async function deleteData() {
    try {
        const resp = await fetch('/landing/delete/2', {method: 'DELETE'});
        const data = await resp.json();

        console.log("Data from server ::", data);
    } catch(error) {
        console.log("Error getting Data", error);
    }
}

async function sendQuery(event){
    try{
        console.log("insode send query")
        const data = {
            userEmail : document.getElementById('enquirerEmail').value,
            userName : document.getElementById('enquirerName').value,
            userQuery : document.getElementById('enquiry').value,
        };

        const resp = await fetch('/landing/query', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const response = await resp.json();

        console.log("Data from server ::", response);

        var frm = document.getElementById('contact-form');
        frm.reset();  // Reset all form data

    }
    catch(error){
        console.log("Error encountered in user query - contact form", error);
    }
} 

async function getUserTestimonials(){
try{
    const resp = await fetch('/landing/testimonials', {
        method: 'GET'
    });
    console.log(resp);
    // const data = await resp.json();

    // console.log("Data from server ::", data);
}
catch(e){
    console.log(" Error while fetching Data from server ::", e);
}
}

getUserTestimonials();
// updateData();
// deleteData();
// postLandingData();
fetchLandingData();

async function uploadImage() {
    const form = document.getElementById('form-submit');
    const formData = new FormData(form);
    try {
        const resp = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await resp.json();

        console.log("Data from server ::", data);
        retrieveImage(data.fileId);
    } catch(error) {
        console.log("Error uploading image", error);
    }
}

async function retrieveImage(fileId) {
    try {
        const resp = await fetch(`/file/${fileId}`, {
            method: 'GET',
        });
        const data = await resp;

        console.log("Data from server ::", data);

        imgEle = document.createElement('img');
        imgEle.src = data.url;
        imgEle.alt = 'image';
        document.getElementById('imagesHere').appendChild(imgEle);


    } catch(error) {
        console.log("Error uploading image", error);
    }
}

