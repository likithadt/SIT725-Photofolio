const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = ' <div class="col-lg-4 mb-3 d-flex align-items-stretch">'+
                '<div class="card folio-cards">'+
                '<img src="'+item.fileUrl+'"  class="card-img-top" alt="Card Image">'+
                '  <h6 class="card-title" style=" margin-bottom: 0.75rem; margin-top: 1rem;"> '+item.title+'</h6> <div class="card-body d-flex flex-column">  <p class="card-text mb-4">'+item.inspiration+'</p>'+
                '</div></div></div>'
        $("#portfolio_cards").append(itemToAppend)
    });
} 

{/* <div class="col-lg-4 mb-3 d-flex align-items-stretch">
                        <div class="card folio-cards">
                            <img src="https://i.postimg.cc/4xVY64PV/porto-timoni-double-beach-corfu-greece-700.jpg"
                                class="card-img-top" alt="Card Image">
                            <div class="card-body d-flex flex-column">
                                <h6 class="card-title"> Dōtonbori Canal</h6>
                                <p class="card-text mb-4">Is a manmade waterway dug in the early 1600's and now displays
                                    many landmark commercial locals and vivid neon signs. </p>
                            </div>
                        </div>
                    </div> */}


async function sendBookingEnquiry() {
    try {
        let body = {
            title: document.getElementById('title').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            status: -1,
            photographerId: location.search.split('=')[1],
            message: document.getElementById('enquiry').value
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
            let name_element = document.getElementById("photographer_name");
            name_element.innerHTML = data[0].name;

            let bio_element = document.getElementById("bio_content");
            bio_element.innerHTML = "Welcome to the captivating portfolio of "+ data[0].name +". Here, amidst the digital canvas, lies a testament to creativity and passion, meticulously crafted to captivate and inspire. Each brushstroke of code, every pixel delicately placed, tells a story of innovation and dedication.";
           
            let interest_element = document.getElementById("interest_content");
            interest_element.innerHTML = data[0].specialization;
           
            

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
            // addCards(data);
            // }
        } else {
            showToaster("No Photographers Found");
        }
    } catch(error) {
        showToaster("Failed to get photographers data");
    }
}

async function fetchLastImageUrl(id) {
    try {
        const resp = await fetch('/clients/fetchPhotographerImage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({id}),
        });
        const data = await resp.json();

        if(data.length > 0) {
            return data[data.length - 1].fileUrl;
        } else {
            return '';
        }
    } catch(error) {
        showToaster("Error fetching photographer images");
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
                addCards(data);
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

fetchPhotographersData()