const cardContainer = document.getElementById('c-booking-requests');
let BookingsData;
function createCard(pgName, msg, status) {
    const card = document.createElement('div');
    card.classList.add('cardb');
    card.classList.add('row');

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('col-sm-10')

    const cardTitle = document.createElement('h4');
    cardTitle.textContent = pgName;

    const cardMsg = document.createElement('p');
    cardMsg.textContent = msg;

     const action = this.status(status);

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(cardMsg);
   
    card.appendChild(cardDetails);
    card.appendChild(action);

    return card;
}

function status(status){
    const action = document.createElement('div');
    let color = "#000000";
    let status_code;
    if (status == -1 ) {
        color = "#FFD43B";
        status_code = 'pending';
    } else if (status == 0) {
        color = "#DD2330";
        status_code = 'Rejected';
    } else if (status == 1) {
        color = "#065535"
        status_code = 'Accepted';
    } else {
        color = "000000";
    }
    action.innerHTML = '<div class="col-sm-2"> <a class="text-reset" href="#" style="text-decoration: none;"> <i class="fa-solid fa-circle fa-xs" style="color: ' + color +';"></i> <span> '+ status_code +' </span> </a></div>';
    

    return action;
}

// Example usage


async function fetchBookings() {
    try {
        clientId = localStorage.getItem("userId");

        const resp = await fetch('/clients/getBookingRequests', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({clientId}),
        });
        let data = [];
        data = await resp.json();

        console.log("book_resp ::",data);
        // fetchPhotographersData();
        // BookingsData = data;
       
        showToaster("Booking Requests fetched successfully!");
        if(data.length == 0){
            hidden_empty = document.getElementById("empty_booking");
            hidden_empty.style.display = 'block';
        }
        else{
       
            for(let i=0; i < data.length; i++){
                let name = await fetchPhotographersData(data[i].photographerId);
                const card1 = createCard(name, data[i].message, data[i].status);
                cardContainer.appendChild(card1);
        }
    }
    } catch(error) {
        showToaster("Failed to fetch booking requests");
    }
}

function showToaster(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

async function fetchPhotographersData(pId) {
    try {
        // let pId = location.search.split('=')[1];
        const resp = await fetch('/clients/getSelectedPhotographer', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({pId}),
        });
        const data = await resp.json();
        console.log(data, "data");
        return data[0].name;
    } catch(error) {
        showToaster("Failed to get photographers data");
    }
}
