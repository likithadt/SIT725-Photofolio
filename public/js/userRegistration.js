
function roleBasedPageNavigator() {
    var userType = document.getElementById('roleSelect');
    var role = userType.value;
    console.log(role);
    if (role == "photographer") {
        window.location.href = "photographerDashboard.html";
    } else if (role == "viewer") {
        window.location.href = "clientDashboard.html";
    }
}