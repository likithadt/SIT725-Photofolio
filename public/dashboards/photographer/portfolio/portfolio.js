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



async function getPortfolios(){
    try{
        const resp = await fetch('/photographers/portfolios', {
            method: 'GET'
        });
        const data = await resp.json();
        console.log(data)
        addCards(data);
        
    }
    catch(e){
        console.log(" Error while fetching Data from server ::", e);
    }
}

getPortfolios();