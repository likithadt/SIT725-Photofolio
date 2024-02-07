const socket = io();
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = ' <div  id="'+item._id+'_main'+'" class="col-lg-4 mb-3 d-flex align-items-stretch">'+
                '<div class="card folio-cards"> <img src="'+item.fileUrl+'" style="height:55%" class="card-img-top" alt="Card Image">'+
                '<div class="card-body d-flex flex-column"><h6 class="card-title">'+item.title+'</h6>'+
                '<p class="card-text mb-4" style = "max-height: 6vw; overflow: auto;">'+item.inspiration+'</p>'+
                '<div style="margin-left: 90%;">'+
                '<a style="width: max-content;" class="text-reset me-3"  onclick = "deletePost(event)" role="button" aria-expanded="false"><i id="'+item._id+'" class="fa-solid fa-trash"></i></a></div>'+
                '</div></div></div>'
        $("#card_holder_container").append(itemToAppend)
    });
} 

socket.on('booking_notification_sent_to_photographer', (data) => {
    console.log("Data here :",data);
    showToaster("New Booking Request!");
    let red_notification = document.getElementById("notification_red");
    console.log("red_notification",red_notification)
    red_notification.style.display = "block";
});

async function getPortfolios(){
    try{
        photographerId = localStorage.getItem("userId");
        const resp = await fetch('/photographers/portfolios', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({photographerId}),
        });
        const data = await resp.json();
        console.log(data)
        if(data.length == 0){
            empty_state = document.getElementById("empty_booking");
            empty_state.style.display = "block";
            button_new = document.getElementById("hide_button");
            button_new.style.display = "block";
            
        }
        else{
            portfolio_ele = document.getElementById("functions_portfolio");
            portfolio_ele.style.display = 'block';
            addCards(data);
        }
        
        showToaster("Portfolio Details fetched successfully") 
    }
    catch(e){
        console.log(" Error while fetching Data from server ::", e);
    }
}

async function deletePost(e) {
    try {
        id = e.target.id;
        const resp = await fetch(`/photographers/delete/${id}`, {method: 'DELETE'});
        const data = await resp.json();
        main_id = id+'_main';
        main_container = document.getElementById(main_id);
        main_container.remove();
        showToaster("Deleted portfolio photo successfully")
        console.log("Data from server ::", data);
    } catch(error) {
        console.log("Error getting Data", error);
    }
}

async function searchPortfolio() {
    try {
        let searchText = document.getElementById('search-input').value;
        if(searchText == "") {            
            location.reload();
            return;
        }
        const resp = await fetch('/photographers/searchPhotographer', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({searchText}),
        });
        const data = await resp.json();
        
        if(data.length > 0) {
            // for(let i=0; i< data.length; i++) {
            //     data[i].imageUrl = await fetchImageUrl(data[i]._id);
            // }
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
            showToaster("Portfolio Not Found");
        }
    } catch(error) {
        showToaster("Portfolio not found");
    }
}

function showToaster(message) {
 
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  function newPortfolio(){
    var a = document.createElement('a');
    a.href = '/dashboards/photographer/portfolio/newPortfolio.html';
    a.click();
  }

  function toggleRed(){
    let red_notification = document.getElementById("notification_red");
    red_notification.style.display = "none";
    location.href = '/dashboards/photographer/booking/photoBooking.html';
}

getPortfolios();