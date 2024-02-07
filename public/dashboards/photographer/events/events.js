// const { link } = require("fs");

const cardContainer = document.getElementById('pg-blogs');

function createCard(title, blog, img, date, url) {
    const card = document.createElement('div');
    card.classList.add('cardb');
    card.classList.add('row');
    card.classList.add('mx-auto');

    const cardImg = document.createElement('div');
    cardImg.classList.add('col-sm-3');
    const bImg = document.createElement('img'); 
    bImg.style = "width: 210px; height: 150px;";
    bImg.src = img.toString();
    cardImg.appendChild(bImg);

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('col-sm-5')

    const cardTitle = document.createElement('h5');
    cardTitle.textContent = title;

    const cardBlog = document.createElement('p');
    cardBlog.innerHTML = "Organised By: "+ blog;

    const cardDate = document.createElement('p');
    cardDate.innerHTML = date;

    const action = this.actions(url);

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(cardBlog);
    cardDetails.appendChild(cardDate);
   
    card.appendChild(cardImg);
    card.appendChild(cardDetails);
    card.appendChild(action);

    return card;
}

function actions(url){
    const action = document.createElement('div');
    action.classList.add('right');
    action.innerHTML = '<div class="col-sm-2"> ' +
        '<div class="text-center m right">' + 
        '<a id="btnEdit"  class="btn btn-outline-dark btn-md  " style="width: 171px !important;" target="_blank" href="'+url+'"> Visit Page </a> </div> </div>';

    return action;
}

async function getAllEvents(){
    try{
        const resp = await fetch('/photographers/events', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await resp.json();

        showToaster("Fetched Events successfully");

        for(let i=0; i<data.length; i++)
        {
            card = createCard(data[i].eventName, data[i].organisedBy , data[i].eventImg, data[i].date+' | '+data[i].Location, data[i].eventLink);
            cardContainer.appendChild(card);
        }
        console.log(data)  
    }
    catch(e){
        console.log(" Error while fetching Data from server ::", e);
        showToaster("Error occured while fetching events data");
    }
}

function showToaster(message) {
 
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

getAllEvents();