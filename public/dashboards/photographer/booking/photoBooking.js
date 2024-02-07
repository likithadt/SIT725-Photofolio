var bookingRequestsData;

const cardContainer = document.getElementById('booking-requests');

function createCard(title, name, email, msg, id, status) {
    const card = document.createElement('div');
    card.classList.add('cardb');
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

     const action = this.actions();

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(cardName);
    cardDetails.appendChild(cardEmail);
    cardDetails.appendChild(cardMsg);
   
    card.appendChild(cardDetails);

    if(status == -1){
        const action = this.actions(id);
        card.appendChild(action);

        }
        else if(status == 0)
        {
            const status = document.createElement('div');
            status.innerHTML = '<div class="col-sm-4 " id="changed_status_reject"> <div class="text-center"> Booking Declined </div> </div>';
            card.appendChild(status);
        }
        else{
                const status_accept = document.createElement('div');
                status_accept.innerHTML = '<div class="col-sm-4 " id="changed_status_accept"> <div class="text-center"> Booking Accepted</div> </div>';
                card.appendChild(status_accept);
        }
   
    return card;
}

function actions(id){
    const action = document.createElement('div');
    action.innerHTML = '<div class="col-sm-4 " onclick = "getId(event)" id="actions_block"> <div class="text-center"> <button id='+'"btnAccept_' + id +'" data-target="#accept" class="btn btn-dark btn-md" style="width: 100px;"> Accept </button> <button id='+'"btnReject_' + id +'"  data-target="#reject"  class="btn btn-outline-dark btn-md " Style="width: 100px;" > Reject</button> </div> </div>';
    return action;
}

async function getBookingRequests(){
    try{
        photographerId = localStorage.getItem("userId");
        showToaster("hello from bookings");

        const resp = await fetch('/photographers/bookingRequests', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({photographerId}),
        });
        const data = await resp.json();
        
        for(var i=0;i<data.length;i++){
        bookingRequestsData = data;
        const card1 = createCard(data[i].title, data[i].name, data[i].email, data[i].message, i, data[i].status);
        cardContainer.appendChild(card1);
        }
    }
    catch(e){
        console.log(" Error while fetching Data from server ::", e);
    }
}

async function changeBookingStatus(id, id_db, email, name){
    try{

        const enquiry_body = `

Dear ${name},

We're thrilled to inform you that your booking request for a photographer has been successfully confirmed for your event.
        
Your chosen photographer will be in touch with you shortly to discuss further details and ensure everything is set for the event. Please keep an eye on your inbox for their message.
        
If you have any immediate questions or concerns, feel free to reach out to us at team.photopholio@gmail.com.
        
Thank you for choosing our platform for your photography needs. We're excited to help make your event memorable!
        
Best regards,
Team Photofolio

                        `;
email_data = {
body: enquiry_body,
email : email,
subject: "Booking Confirmation"
};

const data = {
status: 1,
id: id_db,
email_data: email_data,
};

        const resp = await fetch('/photographers/sendAcceptMessage', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const response = await resp.json();
        if(response){

            const status = document.createElement('div');
            card_container = document.getElementById("booking-requests");
            changed_status = card_container.children[id];

            changed_status_actions = changed_status.children[1]
            changed_status.removeChild(changed_status_actions);

            status.innerHTML = '<div class="col-sm-4 " id="changed_status_accept"> <div class="text-center"> Booking Accepted </div> </div>';
            changed_status.appendChild(status);

        }

    }
    catch(error){
        console.log("Error encountered in user query - contact form", error);
    }
} 

async function changeBookingStatusReject(id, id_db, email, name){
    try{

        const enquiry_body = `

Dear ${name},

Regrettably, we're unable to accommodate your photography booking for the requested date and time. We apologize for any inconvenience caused. For further assistance or alternative options, please reach out to us at team.photofolio@gmail.com.

Best regards,
Team Photofolio

                        `;
email_data = {
body: enquiry_body,
email : email,
subject: "Update on Booking Request"
};

const data = {
status: 0,
id: id_db,
email_data: email_data,
};

        const resp = await fetch('/photographers/sendRejectMessage', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const response = await resp.json();

        if(response){

            const status = document.createElement('div');
            card_container = document.getElementById("booking-requests");
            changed_status = card_container.children[id];
            changed_status_actions = changed_status.children[1]
            changed_status.removeChild(changed_status_actions);

            status.innerHTML = '<div class="col-sm-4 " id="changed_status_reject"> <div class="text-center"> Booking Declined </div> </div>';
            changed_status.appendChild(status);

        }

    }
    catch(error){
        console.log("Error encountered in user query - contact form", error);
    }
} 


 function getId(e)
 {
    id = e.target.id;
    id_selected= id.split("_")[1];
    action = id.split("_")[0];

    email_Selected = bookingRequestsData[id_selected].email;
    name_selected = bookingRequestsData[id_selected].name;
    id_db = bookingRequestsData[id_selected]._id;
    if(action == "btnAccept"){
        changeBookingStatus(id_selected,id_db, email_Selected, name_selected);
    }
    else{
        changeBookingStatusReject(id_selected,id_db, email_Selected, name_selected);
    }
 }

 function showToaster(message) {
 
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

getBookingRequests();
