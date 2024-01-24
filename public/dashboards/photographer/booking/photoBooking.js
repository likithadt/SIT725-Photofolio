const cardContainer = document.getElementById('booking-requests');

function createCard(title, name, email, msg) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('row');

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('col-sm-8')

    const cardTitle = document.createElement('h4');
    cardTitle.textContent = "Subject: " + title;

    const cardName = document.createElement('p');
    cardName.textContent = "Name: " + name;

    const cardEmail = document.createElement('p');
    cardEmail.textContent = "Email: " + email;

    const cardMsg = document.createElement('p');
    cardMsg.textContent = "Message: " + msg;

    const action = document.createElement('div')
    action.innerHTML = '<div class="col-sm-4"> <div class="text-center"> <button id="btnAccept" class="btn btn-dark btn-md  " Style="width: 100px;" > Accept </button> <button id="btnReject" class="btn btn-outline-dark btn-md " Style="width: 100px;" > Reject</button> </div> </div>';

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(cardName);
    cardDetails.appendChild(cardEmail);
    cardDetails.appendChild(cardMsg);
   
    card.appendChild(cardDetails);
    card.appendChild(action);

    return card;
}

// Example usage
// const card1 = createCard('What are the services!', 'Billie', 'mcdeedb@gmail.com', 'I would like to book you for a wedding shoot!');
// const card2 = createCard('Dynamic Cards 101', 'Billie', 'mcdeedb@gmail.com', 'I would like to book you for a wedding shoot!');
// const card3 = createCard('Dynamic Cards 101', 'Billie', 'mcdeedb@gmail.com', 'I would like to book you for a wedding like to book eddingfor a wedding like to book you for a wedding ');

// cardContainer.appendChild(card1);
// cardContainer.appendChild(card2);
// cardContainer.appendChild(card3);

