let file_id = "";

$(document).ready(function () {
    $(document).on('change', '.btn-file :file', function () {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imgInp").change(function () {
        readURL(this);
    });   
});

async function createNew(event){
    try{
        const data = {
            title : document.getElementById('Title').value,
            category : document.getElementById('Cateogory').value,
            inspiration : document.getElementById('Inspiration').value,
            tags : document.getElementById('tags').value,
            fileId: file_id,
        };

        const resp = await fetch('/photographers/newportfolio', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const response = await resp.json();

    }
    catch(error){
        console.log("Error encountered in user query - contact form", error);
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

    } catch(error) {
        console.log("Error uploading image", error);
    }

}

function openFileUpload() {
    document.getElementById("imageChoose").click();
  }

function  selectedFile(e) {
        if (e.target.files[0]) {
            uploadImage();
        }
  }