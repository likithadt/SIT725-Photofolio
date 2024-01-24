//Function to gather all the elements in the form 
async function formElements() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        role: document.getElementById('roleSelect').value
    };

    return formData;

}

//onclick Event function that will handle adding all the users and also navigate to the appropriate dashboard 
async function roleBasedPageNavigator(event) {
    try {
        console.log("Sign up button is working");
        var formData = await formElements();


        console.log(formData);

        adduser();
        if (formData.role == "photographer") {
            var a = document.createElement('a');
            a.href = '/dashboards/photographerDashboard.html';
            a.click()
        }
        else if (formData.role == "client") {
            var a = document.createElement('a');
            a.href = '/dashboards/clientDashboard.html';
            a.click()
        }
        else {
            alert("please fill all the details ");
        }

    }
    catch (error) {
        console.log(error);
    }
}


// function to add users in to the database 
async function adduser() {
    try {
        var formData = await formElements();
        const resp = await fetch('/userRegistration/adduser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await resp.json();

        console.log("Data from server ::", data);
    } catch (error) {
        console.log("Error creating User", error);
    }
}




