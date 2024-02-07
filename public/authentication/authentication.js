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

        let respUser = await adduser();
        if(respUser == true) {
            if (formData.role == "photographer") {
                var a = document.createElement('a');
                a.href = '/dashboards/photographer/portfolio/portfolio.html';
                a.click();
            }
            else if (formData.role == "client") {
                var a = document.createElement('a');
                a.href = '/dashboards/clientDashboard.html';
                a.click();
            }
        }
        else {            
            showToaster("Failed to add User");
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
        if(formData.password != formData.confirmPassword) {
            console.log("inside toastreeee");
            showToaster("Passwords don't match");
            return;
        }

        let body = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            role: formData.role,
        }
        const resp = await fetch('/userRegistration/adduser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await resp.json();

        localStorage.setItem("userId", data.insertedId);
        localStorage.setItem("userEmail",body.email);
        localStorage.setItem("userName", body.name);
        localStorage.setItem("userRole", body.role);

        console.log("Data from server ::", data);
        return true;
    } catch (error) {
        console.log("Error creating User", error);
        return false;
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
            if(data.success) {
                localStorage.setItem("userId", data.userData.id);
                localStorage.setItem("userEmail", data.userData.email);
                localStorage.setItem("userName", data.userData.name);
                localStorage.setItem("userRole", data.userData.role);
                if (data.userData.role == "photographer") {
                    var a = document.createElement('a');
                    a.href = '/dashboards/photographer/portfolio/portfolio.html';
                    a.click();
                }
                else if (data.userData.role == "client") {
                    var a = document.createElement('a');
                    a.href = '/dashboards/clientDashboard.html';
                    a.click();
                }
            }
            else {
                showToaster("Email Id or Password not found ");
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
            showToaster("Check your inbox to rest your password ");
            var a = document.createElement('a');
            a.href = '/authentication/login.html';
            a.click();
        }
        else if (resp.status === 404) {
            showToaster("User not found");
        } else {
            showToaster("Could not send the password reset instructions");
        }
    } catch (error) {

        console.log("Error in sendPasswordlink() ", error);

    }
}

async function passNew() {
    try {
        let email = document.getElementById('emailReset').value;
        let password = document.getElementById('passwordNew').value;
        let confirmPass = document.getElementById('passwordConfirm').value;

        if(password != confirmPass) {
            showToaster("Passwords don't match");
            return;
        }

        let body = {
            email, password
        }; 

        const resp = await fetch('/newPassword/setPass', { 
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await resp.json();

        if (data) {
            showToaster("Password reset successfully!");

        } else {
            showToaster("Failed to set password. Please try again");
        }

        var a = document.createElement('a');
        a.href = '/authentication/login.html';
        a.click();
    } catch(error) {
        console.log("Error setting password: ", error);
    }
}

async function newPassword(event)
{
    try {
        showToaster("Password Clicked ");
    } catch (error) {
        console.log("Error in newPassword")
    }
   
}

function showToaster(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }