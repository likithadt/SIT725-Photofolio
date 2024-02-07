
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

function photoDetails(pgDetails){
    location.href="/dashboards/clientd/pg/photographerInfo.html";
}

function showToaster(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}