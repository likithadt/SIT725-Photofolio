async function saveBlog(event) {
    try {
        const imageResult = await uploadImage();
        const imageUrl = `/file/${imageResult.fileId}`; 
        const blogData = await createBlogPost(imageUrl); 
        redirectToBlogs(blogData); 
    } catch (error) {
        console.error("Error at saveBlog():", error);
    }
}


async function uploadImage() {
    const fileInput = document.getElementById('file');
    if (fileInput.files.length === 0) {
        throw new Error("No file selected for upload.");
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Image upload failed');
    }

    return await response.json(); // Returns the result with fileId
}
async function createBlogPost(imageUrl) {
    const blogData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        imageUrl: imageUrl,
    };

    const response = await fetch('/blogs/blog', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create blog post');
    }

    return await response.json(); 
}
function redirectToBlogs(data) {
    console.log("Save Blog Returned ", data);
    window.location.href = './blog.html'; 
}
async function loadBlogs() {
    try {
        const response = await fetch('/blogs/getblogs'); 
        const blogs = await response.json();

        
        blogs.forEach(blog => {
            const card = createCard(blog.title, blog.description, blog.imageUrl);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

const cardContainer = document.getElementById('pg-blogs');

function createCard(title, blog,  img) {
    const card = document.createElement('div');
    card.classList.add('cardb');
    card.classList.add('row');
   // card.classList.add('mx-auto');
    
    const cardImg = document.createElement('div');
    cardImg.classList.add('col-sm-2');
    const bImg = document.createElement('img'); 
    bImg.style = "width: 150px; height: 150px; border:2px solid black";
    bImg.src = img.toString();
    cardImg.appendChild(bImg);

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('col-sm-6')

    const cardTitle = document.createElement('h5');
    cardTitle.textContent = title;

    const cardBlog = document.createElement('p');
    cardBlog.innerHTML = blog;
    cardBlog.style="font-family:robo-kit";
    const currDate = document.createElement('p');
    currDate.classList.add('text-muted');
    let curD = new Date(); 
    currDate.innerHTML = curD.toLocaleDateString();


    const action = actions();

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
    action.classList.add('action-buttons', 'col-sm-4', 'text-right'); 

    action.innerHTML = 
        '<div> <p class="d-inline"> Publish </p> <label class="switch"><input type="checkbox"><span class="slider round"></span></label> </div>' +
        '<div class="mt-2"> <button id="btnEdit" class="btn btn-dark btn-sm mr-1"> Edit </button>' + 
        '<button id="btnDelete" class="btn btn-outline-dark btn-sm"> Delete </button> </div>';

    return action;
}



document.addEventListener('DOMContentLoaded', loadBlogs);