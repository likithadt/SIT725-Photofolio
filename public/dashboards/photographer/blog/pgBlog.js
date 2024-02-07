let file_id = "";
let file_url = "";

const cardContainer = document.getElementById('pg-blogs');

function createCard(title, blog, status, img, id) {
    const card = document.createElement('div');
    card.classList.add('cardb');
    card.classList.add('row');
    card.classList.add('mx-auto');
    card.id = id + '_main'

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


    const action = this.actions(id);

    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(cardBlog);
    cardDetails.appendChild(currDate);
   
    card.appendChild(cardImg);
    card.appendChild(cardDetails);
    card.appendChild(action);

    return card;
}

function actions(id){
    const action = document.createElement('div');
    // action.classList.add('right');
    action.innerHTML = '<div class="col-sm-1"> ' +
        '<button id="'+id+'" data-toggle="modal" onclick="deleteBlog(event)" style="position: relative; left: 200px; top:130px" data-target="#delete"  class="btn btn-outline-dark btn-md "> Delete </button> </div>';

    return action;
}

// Example usage
// const card1 = createCard('What are the services!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut enim ad minim veniam, quis nostrud ...', 'Unpublished' ,'https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' );

function showToaster(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function openFileUpload() {
    document.getElementById("imageChoose").click();
  }

function  selectedFile(e) {
        if (e.target.files[0]) {
            uploadImage();
        }
}

async function uploadImage() {
    const form = document.getElementById('form-submit');
    const formData = new FormData(form);
    try {
        const resp = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await resp.json();

        console.log("Data from server ::", data);
        file_id = data.fileId;
        retrieveImage(data.fileId);
        
    } catch(error) {
        console.log("Error uploading image", error);
    }
}

async function retrieveImage(fileId) {
    try {
        const resp = await fetch(`/file/${fileId}`, {
            method: 'GET',
        });
        const data = await resp;

        imgEle = document.getElementById('img-upload');
        imgEle.src = data.url;
        imgEle.alt = 'image';
        file_url = data.url;
        photo = document.getElementById("img-upload");
        photo.style.display = 'block';

    } catch(error) {
        console.log("Error uploading image", error);
    }

}

async function createNew() {
    try{
        photographerId = localStorage.getItem("userId");
        const data = {
            title : document.getElementById('Title').value,
            description : document.getElementById('description').value,
            fileId: file_id,
            photographerId: photographerId,
            fileUrl : file_url,
            date: new Date(),
        };

        const resp = await fetch('/photographers/createNewBlog', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const response = await resp.json();
        console.log("blog response :: ",response);
        showToaster("Blogpost created Successfully");

        var frm = document.getElementById('newBlog');
        frm.reset();  // Reset all form data

        location.href = '/dashboards/photographer/blog/pgBlog.html';

    }
    catch(error){
        showToaster("Blogpost creation failed");
    }
}

async function fetchBlogPosts() {
    try{
        photographerId = localStorage.getItem("userId");

        const resp = await fetch('/photographers/fetchAllBlogs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({photographerId}),
        });
        const response = await resp.json();
        
        for(let i=0; i< response.length;i++) {
            const cardd = createCard(response[i].title,response[i].description,'Melbourne',response[i].fileUrl, response[i]._id);
            cardContainer.appendChild(cardd);
        }
        console.log("List of blogs :: ",response);

        showToaster("Blogposts listed successfully");
    }
    catch(error){
        showToaster("Failed to load blogposts");
    }
}

async function deleteBlog(e)
{
console.log(e.target.id)
try {
    id = e.target.id;
    const resp = await fetch(`/photographers/deleteBlog/${id}`, {method: 'DELETE'});
    const data = await resp.json();
    main_id = id+'_main';
    main_container = document.getElementById(main_id);
    main_container.remove();
    showToaster("Deleted Blog post successfully")
    console.log("Data from server ::", data);
} catch(error) {
    console.log("Error getting Data", error);
}
}
