// const socket = io();
async function sendBookingEnquiry() {
    try {
        let body = {
            title: document.getElementById('title').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            status: -1,
            photographerId: location.search.split('=')[1],
            message: document.getElementById('enquiry').value,
            clientId: localStorage.getItem("userId"),
        };
        const resp = await fetch('/clients/sendBookingNotification', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        });
        const data = await resp.json();

        if(data.acknowledged) {
            document.getElementById("modal-closure").click();
            socket.emit('send_notification_to_photographer', body);
        }

    } catch(error) {
        showToaster("Failed to send booking");
    }
}

async function fetchPhotographersData() {
    try {
        let pId = location.search.split('=')[1];
        const resp = await fetch('/clients/getSelectedPhotographer', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({pId}),
        });
        const data = await resp.json();
        
        if(data.length > 0) {
            for(let i=0; i< data.length; i++) {
                data[i].imageUrl = await fetchLastImageUrl(data[i]._id);
            }
            console.log("Photographers Data", data); // DATA HERE

            // fetch photographers portfolio
            fetchPhotographersPortfolio(pId);

            // if(data.length == 0){
            //     let empty_display = document.getElementById("empty_display");
            //     empty_display.style.display = "block";
            // }
            // else{
            //     let search_display = document.getElementById("search_display");
            //     search_display.style.display = "block";
            //     addCards(data);
            // }
        } else {
            showToaster("No Photographers Found");
        }
    } catch(error) {
        showToaster("Failed to get photographers data");
    }
}


async function fetchPhotographersPortfolio(id) {
    try {
        const resp = await fetch('/clients/getSelectedPortfolios', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({id}),
        });
        const data = await resp.json();
        
        if(data.length > 0) {

            console.log("Portfolios Data :: ", data); // DATA HERE

            // if(data.length == 0){
            //     let empty_display = document.getElementById("empty_display");
            //     empty_display.style.display = "block";
            // }
            // else{
            //     let search_display = document.getElementById("search_display");
            //     search_display.style.display = "block";
            //     addCards(data);
            // }
        } else {
            showToaster("No Photographers Found");
        }
    } catch(error) {
        showToaster("Failed to get photographers data");
    }
}


function showPhotographers(img) {
    const grid = document.getElementsByClassName('image-grid');
   
    const folio = document.createElement('img');
    folio.src = "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    folio.addEventListener("click", photoDetails, false);
    
    document.getElementById('img-grid').appendChild(folio);
    
    /** (sample) Some loop logic to get the data from DB and show the content */
    // var x = 1;
    // while(x < 5)
    // {
    //     const folio = document.createElement('img');
    //     folio.src = "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     x++;
    //     document.getElementById('img-grid').appendChild(folio);
    // // }
}

function photoDetails(pgDetails){
    location.href="/dashboards/clientd/pg/photographerInfo.html";
}

function showToaster(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function getPhotographerDetails(e){
location.href=`/dashboards/clientd/pg/photographerInfo.html?id=${e.currentTarget.id}`;
}