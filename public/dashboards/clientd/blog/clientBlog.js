
const addCards = (items) => {
    items.forEach(item => {
        console.log("item",item);
        let itemToAppend = 
        
        '<div class="col-md-6 col-lg-4 mt-5 wow fadeInUp" data-wow-delay=".2s" style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;">'+
                        '<div class="blog-grid">'+
                            '<div class="blog-grid-img position-relative"><img alt="img" src="'+item.fileUrl+'"></div>'+
                            '<div class="blog-grid-text p-4">'+
                                '<h4 class="h5 mb-3">'+ item.title +' </h4>'+
                               ' <p class="display-30">'+item.description+'</p>'+
                                '<div class="meta meta-style2">'+
                                ' </div>  </div>   </div>   </div>'
                    
                    $("#cards_container").append(itemToAppend)
    });
}




async function fetchAllBlogs() {
    try {
        const resp = await fetch('/clients/fetchAllBlogs', {
            method: 'GET'
        });
        const response = await resp.json();
        
        console.log("List of blogs :: ",response);
       addCards(response);
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