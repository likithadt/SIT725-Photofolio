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