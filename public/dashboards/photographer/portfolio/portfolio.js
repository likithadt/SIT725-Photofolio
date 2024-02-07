const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = ' <div  id="'+item._id+'_main'+'" class="col-lg-4 mb-3 d-flex align-items-stretch">'+
                '<div class="card folio-cards"> <img src="'+item.fileUrl+'" class="card-img-top" alt="Card Image">'+
                '<div class="card-body d-flex flex-column"><h6 class="card-title">'+item.title+'</h6>'+
                '<p class="card-text mb-4" style = "max-height: 6vw; overflow: auto;">'+item.inspiration+'</p>'+
                '<div style="margin-left: 90%;">'+
                '<a class="text-reset me-3"  onclick = "deletePost(event)" role="button" aria-expanded="false"><i id="'+item._id+'" class="fa-solid fa-trash"></i></a></div>'+
                '</div></div></div>'
        $("#card_holder_container").append(itemToAppend)
    });
} 

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

getPortfolios();