const socket = io();

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = ' <div style="cursor:pointer" id="'+item._id+'" onclick="getPhotographerDetails(event)" class="col-lg-4 mb-3 d-flex align-items-stretch">'+
                '<div style="height: 19vw; width:100%" class="card folio-cards"> <img style="max-height: 13vw;height: 13vw;" src="'+item.imageUrl+'" class="card-img-top" alt="Card Image">'+
                '<div class="card-body d-flex flex-column"><h6 style="font-size: 22px;text-align: center;font-family: math;font-weight: 700;" class="card-title">'+item.name+'</h6>'+
                '<h6 class="card-title" style="font-size: 20px;text-align: center;font-family: system-ui;font-weight: 700;  background-color: #000000c9; color: white; padding: 8px 12px;border-radius: 5px;">'+item.specialization+'</h6>'+
                '</div></div></div>'
        $("#card_holder_container").append(itemToAppend)
    });
}

socket.on('booking_notification_sent_to_client', (data) => {
    console.log("Data here :",data);
    showToaster("New update on your Booking request.");

    let red_notification = document.getElementById("notification_red");
    console.log("red_notification",red_notification);

    red_notification.style.display = "block";
});

async function fetchAllPhotographers() {
    try{
        const resp = await fetch('/clients/fetchPhotographers', {
            method: 'GET',
        });
        const data = await resp.json();
        
        if(data.length > 0) {
            for(let i=0; i< data.length; i++) {
                data[i].imageUrl = await fetchImageUrl(data[i]._id);
            }
            console.log("Mainn Data", data); // DATA HERE

            if(data.length == 0){
                let empty_display = document.getElementById("empty_display");
                empty_display.style.display = "block";
            }
            else{
                let search_display = document.getElementById("search_display");
                search_display.style.display = "block";
                addCards(data);
            }
            
        } else {
            showToaster("No Photographers Found");
        }
    }
    catch(e){
        console.log(" Error while fetching Data from server ::", e);
    }
}

async function fetchImageUrl(id) {
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
            return data[0].fileUrl;
        } else {
            return '';
        }
    } catch(error) {
        showToaster("Error fetching photographer images");
    }
}

async function searchPhotographer() {
    try {
        let searchText = document.getElementById('search-input').value;
        if(searchText == "") {            
            location.reload();
            return;
        }
        const resp = await fetch('/clients/searchPhotographer', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({searchText}),
        });
        const data = await resp.json();
        
        if(data.length > 0) {
            for(let i=0; i< data.length; i++) {
                data[i].imageUrl = await fetchImageUrl(data[i]._id);
            }
            console.log("Searched Data", data); // DATA HERE

            document.getElementById('card_holder_container').remove();
            let contain = document.createElement('div');
            contain.setAttribute('id', 'card_holder_container');
            document.getElementById("parent_container").append(contain);

            if(data.length == 0){
                let empty_display = document.getElementById("empty_display");
                empty_display.style.display = "block";
            }
            else{
                let search_display = document.getElementById("search_display");
                search_display.style.display = "block";
                addCards(data);
            }

        } else {
            showToaster("Photographer Not Found");
        }
    } catch(error) {
        showToaster("Photographer not found");
    }
}

async function fetchAllBlogs() {
    try {
        const resp = await fetch('/clients/fetchAllBlogs', {
            method: 'GET'
        });
        const response = await resp.json();
        
        console.log("List of blogs :: ",response);
        showToaster("Blogposts listed successfully");
    }
    catch(error){
        showToaster("Failed to load blogposts");
    }
}

function getPhotographerDetails(e){
    location.href=`/dashboards/clientd/pg/photographerInfo.html?id=${e.currentTarget.id}`;
}

function showToaster(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function toggleRed(){
    let red_notification = document.getElementById("notification_red");
    red_notification.style.display = "none";
    location.href = '/dashboards/clientd/bk/clientBooking.html';
}

