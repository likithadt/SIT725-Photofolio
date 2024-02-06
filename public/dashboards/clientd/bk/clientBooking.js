const cardContainer = document.getElementById('c-booking-requests');

function createCard(pgName, msg, status) {
    const card = document.createElement('div');
    card.classList.add('cardb');
    card.classList.add('row');

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('col-sm-10')

    const cardTitle = document.createElement('h4');
    cardTitle.textContent = pgName;

    const cardMsg = document.createElement('p');
    cardMsg.textContent = msg;

     const action = this.status(status);

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(cardMsg);
   
    card.appendChild(cardDetails);
    card.appendChild(action);

    return card;
}

function status(status){
    const action = document.createElement('div');
    let color = "#000000";
    if (status.toLowerCase() == 'pending') {
        color = "#FFD43B"
    } else if (status.toLowerCase() == 'rejected') {
        color = "#DD2330"
    } else if (status.toLowerCase() == 'accepted') {
        color = "#065535"
    } else {
        color = "000000";
    }
    action.innerHTML = '<div class="col-sm-2"> <a class="text-reset" href="#" style="text-decoration: none;"> <i class="fa-solid fa-circle fa-xs" style="color: ' + color +';"></i> <span> '+ status +' </span> </a></div>';
    

    return action;
}

// Example usage
const card1 = createCard('Billie', 'I would like to book you for a wedding shoot!', 'Pending');
const card2 = createCard('Likita', 'I would like to book you for a wedding shoot!', 'Accepted');
const card3 = createCard('Mohan', 'I would like to book you for a wedding shoot!', 'Rejected');

cardContainer.appendChild(card1);

cardContainer.appendChild(card2);

cardContainer.appendChild(card3);

