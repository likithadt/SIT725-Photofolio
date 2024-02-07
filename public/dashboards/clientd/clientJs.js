
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
            fetchAllPhotographers();
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
        } else {
            showToaster("Photographer Not Found");
        }
    } catch(error) {
        showToaster("Photographer not found");
    }
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = ' <div class="col-lg-4 mb-3 d-flex align-items-stretch">'+
                '<div class="card folio-cards"> <img src="'+item.fileUrl+'" class="card-img-top" alt="Card Image">'+
                '<div class="card-body d-flex flex-column"><h6 class="card-title">'+item.title+'</h6>'+
                '<p class="card-text mb-4">'+item.inspiration+'</p>'+
                '<div><a class="text-reset me-3" href="#" role="button" aria-expanded="false"><i class="fa-solid fa-edit"></i></a>'+
                '<a class="text-reset me-3" href="#" role="button" aria-expanded="false"><i class="fa-solid fa-trash"></i></a></div>'+
                '</div></div></div>'
        $("#card_holder_container").append(itemToAppend)
    });
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