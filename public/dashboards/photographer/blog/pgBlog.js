const cardContainer = document.getElementById('pg-blogs');

function createCard(title, blog, status, img) {
    const card = document.createElement('div');
    card.classList.add('cardb');
    card.classList.add('row');
    card.classList.add('mx-auto');

    const cardImg = document.createElement('div');
    cardImg.classList.add('col-sm-3');
    const bImg = document.createElement('img'); 
    bImg.style = "width: 150px; height: 150px;";
    bImg.src = img.toString();
    cardImg.appendChild(bImg);

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('col-sm-5')

    const cardTitle = document.createElement('h5');
    cardTitle.textContent = title;

    const cardBlog = document.createElement('p');
    cardBlog.innerHTML = blog;

    const currDate = document.createElement('p');
    currDate.classList.add('text-muted');
    let curD = new Date(); //should fetch date from db
    currDate.innerHTML = curD.toLocaleDateString() + " | " + status;


    const action = this.actions();

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(cardBlog);
    cardDetails.appendChild(currDate);
   
    card.appendChild(cardImg);
    card.appendChild(cardDetails);
    card.appendChild(action);

    return card;
}

function actions(){
    const action = document.createElement('div');
    action.classList.add('right');
    action.innerHTML = '<div class="col-sm-2"> ' +
        '<div> <p class="d-inline">  Publish  </p> <label class="switch"><input type="checkbox"> <span class="slider round"> </span> </label> </div>' +
        '<div class="text-center m right"> <button id="btnDelete" data-toggle="modal" data-target="#edit" class="btn btn-dark btn-md" > Edit </button>' + 
        '<button id="btnEdit" data-toggle="modal" data-target="#delete"  class="btn btn-outline-dark btn-md "> Delete </button> </div> </div>';

    return action;
}

// Example usage
const card1 = createCard('What are the services!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut enim ad minim veniam, quis nostrud ...', 'Unpublished' ,'https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' );

cardContainer.appendChild(card1);

