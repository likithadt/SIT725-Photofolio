// const addCards = (items) => {
//     items.forEach(item => {
//         let itemToAppend = '<div class="col s4 center-align">'+
//                 '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
//                 '</div><div class="card-content">'+
//                 '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
//                 '<div class="card-reveal" style="color:black">'+
//                 '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
//                 '<p class="card-text">'+item.description+'</p>'+
//                 '</div></div></div>';
//         $("#card-section").append(itemToAppend)
//     });
// }

// <div class="card folio-cards">
// <img src="https://i.postimg.cc/4xVY64PV/porto-timoni-double-beach-corfu-greece-700.jpg" class="card-img-top" alt="Card Image"/>
// <div class="card-body d-flex flex-column">
//     <h6 class="card-title"> Dōtonbori Canal</h6>
//     <p class="card-text mb-4">Is a manmade waterway dug in the early 1600's and now displays
//         many landmark commercial locals and vivid neon signs. </p>
//     <div>
//         <a class="text-reset me-3" href="#" role="button" aria-expanded="false">
//             <i class="fa-solid fa-edit"></i>
//         </a>
//         <a class="text-reset me-3" href="#" role="button" aria-expanded="false">
//             <i class="fa-solid fa-trash"></i>
//         </a>
//     </div>
// </div>
// </div>


// function getAllCats() {
//     $.get('/api/cat',(result)=>{
//         if (result.statusCode === 200) {
//             addCards(result.data);
//         }
//     });
// }

async function getPortfolios(){
    try{
        const resp = await fetch('/photographers/portfolios', {
            method: 'GET'
        });
        const data = await resp;
        console.log(data)
        
    }
    catch(e){
        console.log(" Error while fetching Data from server ::", e);
    }
}

getPortfolios();