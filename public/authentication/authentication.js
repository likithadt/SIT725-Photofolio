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

async function loginFormData() {
    var formData = {
        email: document.getElementById('userEmail').value,
        password: document.getElementById('userPassword').value
    };

    return formData;

}

async function resetFormData() {
    var formData = document.getElementById('resetEmail').value;
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
            a.href = '/dashboards/photographer/photographerDashboard.html';
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


async function loginEvent(event) {
    try {
        console.log("Inside Login button");

        var formData = await loginFormData();
        console.log("Email Id is ", formData.email);
        console.log("Password Is ", formData.password);
        const resp = await fetch('/login/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

        });

        if (resp.status === 200) {
            const data = await resp.json();

            console.log("data is ", data);
            if (data.role == "photographer") {
                var a = document.createElement('a');
                a.href = '/dashboards/photographer/photographerDashboard.html';
                a.click()
            }
            else if (data.role == "client") {
                var a = document.createElement('a');
                a.href = '/dashboards/clientDashboard.html';
                a.click()
            }

            else {
                alert("Email Id or Password not found ");
            }

        } else {
            console.log("Incorrect Username or password");

        }


    } catch (error) {
        console.log("Error while checking credentials ", error);
    }

}

async function resetPassword(event) {
    try {
        const data = await resetFormData();
        console.log(data);
        await sendPasswordLink(data);
    } catch (error) {
        console.log("Error in resetPassword()");
    }
}


async function sendPasswordLink(email) {
    try {

        const resp = await fetch('/resetPassword/resetpassword', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),

        });

        const data = await resp.json();

        if (resp.status === 200) {
            alert("Check your inbox to rest your password ");
        }
        else if (resp.status === 404) {
            alert("User not found");
        } else {
            alert("Could not send the password reset instructions");
        }
    } catch (error) {

        console.log("Error in sendPasswordlink() ", error);

    }
}

async function newPassword(event)
{
    try {
        alert("Password Clicked ");
    } catch (error) {
        console.log("Error in newPassword")
    }
   
}