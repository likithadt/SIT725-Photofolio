const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = 'http://localhost:3000'; // Ensure your server is running on this port

// Use chai-http for HTTP requests
chai.use(chaiHttp);

describe("Landing Page Tests", function() {
    it("Landing Page should return status 200", function(done) {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("About section should return status 200", function(done) {
        chai.request(server)
            .get('/#about')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Features section should return status 200", function(done) {
        chai.request(server)
            .get('/#features')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Testimonials API should return status 200 and a non-empty body", function(done) {
        chai.request(server)
            .get('/landing/testimonials')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf.above(0);
                done();
            });
    });
});

describe("Website Assets", function() {
    it("CSS should load properly and return status 200", function(done) {
        chai.request(server)
            .get('/styles.css')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

// var expect  = require("chai").expect;
// var request = require("request");

// // Landing page testing
// describe("Landing Page Loading Properly", function() {
//     var url = "http://localhost:3000/";
//     it("Landing Page working properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/#about";
//     it("Landing Page opens on About and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/#features";
//     it("Landing Page opens on Features and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/#testimonials";
//     it("Landing Page opens on Testimonials and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/#contact";
//     it("Landing Page opens on Contact Us Form and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/landing/testimonials";
//     it("Testimonials GET API is called and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/landing/testimonials";
//     it("Testimonials API returns a list of testimonials", function(done) {
//         request(url, function(error, response, body) {
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });
// });

// describe("Website Loads all the styles", function() {
//     var url = "http://localhost:3000/styles.css";
//     it("CSS Styles loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });
// });

// // Login page
// describe("Login Page is loading correctly", function() {
//     var url = "http://localhost:3000/authentication/login.html";
//     it("Login page loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });
// });

// describe("Login POST request is working", function() {
//     var url = "http://localhost:3000/login/login";
//     it("Login API works and returns status 200", function(done) {
//         request.post({
//             url: url,
//             json: {email: "kiranms20@gmail.com", password: "mohan"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/login/login";
//     it("Login API works and returns false when wrong data is given", function(done) {
//         request.post({
//             url: url,
//             json: {email: "kiranms20@gmail.com", password: "1234"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.success).to.equal(false);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/login/login";
//     it("Login API works and returns true when correct data is given", function(done) {
//         request.post({
//             url: url,
//             json: {email: "kiranms20@gmail.com", password: "mohan"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.success).to.equal(true);
//             done();
//         });
//     });
// });

// // Password Reset Page
// describe("Password Reset page is loading correctly", function() {
//     var url = "http://localhost:3000/authentication/passwordReset.html";
//     it("Password reset page loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/authentication/newPassword.html";
//     it("New password page loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });
// });

// // Sending Reset Password Link
// describe("Password Reset Button is working to send an EMAIL", function() {
//     var url = "http://localhost:3000/resetPassword/resetpassword";
//     it("Password reset API is successful and giving back 200", function(done) {
//         request.post({
//             url: url,
//             json: {email: "kiranms20@gmail.com"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/resetPassword/resetpassword";
//     it("Password reset API is successful and an email is sent by checking the status", function(done) {
//         request.post({
//             url: url,
//             json: {email: "kiranms20@gmail.com"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/resetPassword/resetpassword";
//     it("Wrong Email is sent and the reset password API gives back 404", function(done) {
//         request.post({
//             url: url,
//             json: {email: "dummy@gmail.com"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(404);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });
// });

// describe("New password is stored successfully in the DB", function() {
//         var url = "http://localhost:3000/newPassword/setPass";
//         it("New password API is working and returns 200", function(done) {
//         request.put({
//             url: url,
//             json: {email:"kiranms20@gmail.com",password:"1111"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/newPassword/setPass";
//         it("New password API is working and stores the data in DB", function(done) {
//         request.put({
//             url: url,
//             json: {email:"kiranms20@gmail.com",password:"1111"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/newPassword/setPass";
//         it("Entered Email is not found and the API returns False", function(done) {
//         request.put({
//             url: url,
//             json: {email:"aaaa@gmail.com",password:"1111"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body).to.equal(false);
//             done();
//         });
//     });
// });


// // User Registration page
// describe("User Signup page is loading correctly", function() {
//     var url = "http://localhost:3000/authentication/userRegistration.html";
//     it("Signup page loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });
// });

// describe("User Signup API is working properly and returns 200", function() {
//     var url = "http://localhost:3000/userRegistration/adduser";
//     it("User is added and API returns 200", function(done) {
//         request.post({
//             url: url,
//             json: {email:"dummy@gmail.com",password:"1234",name:"Mohan",role:"photographer"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });
// });

// describe("Photographers dashboard is working correctly", function() {
//     var url = "http://localhost:3000/dashboards/photographer/portfolio/portfolio.html";
//     it("Portfolios loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/dashboards/photographer/booking/photoBooking.html";
//     it("Booking requests loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/dashboards/photographer/events/events.html";
//     it("Events are loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/dashboards/photographer/blog/pgBlog.html";
//     it("Blog posts are loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });    
    
// });

// describe("Clients dashboard is working correctly", function() {
//     var url = "http://localhost:3000/dashboards/clientd/clientDashboard.html";
//     it("Photographers portfolios loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/dashboards/clientd/bk/clientBooking.html";
//     it("Booking statuses are loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/dashboards/clientd/blog/clientBlog.html";
//     it("Blog posts are loaded properly and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });     
// });

// describe("Photographers dashboard returns back data as expected and is working correctly", function() {
//     var url = "http://localhost:3000/photographers/portfolios";
//     it("Portfolios API is working as expected and returns status 200", function(done) {
//         request.post({
//             url: url,
//             json: {photographerId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/photographers/portfolios";
//     it("Portfolios API is working as expected and returns back data as expected", function(done) {
//         request.post({
//             url: url,
//             json: {photographerId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/photographers/bookingRequests";
//     it("Bookings Listing API is working as expected and returns status 200", function(done) {
//         request.post({
//             url: url,
//             json: {photographerId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/photographers/bookingRequests";
//     it("Bookings Listing API is working as expected and returns back data as expected", function(done) {
//         request.post({
//             url: url,
//             json: {photographerId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/photographers/fetchAllBlogs";
//     it("Blogs Listing API is working as expected and returns status 200", function(done) {
//         request.post({
//             url: url,
//             json: {photographerId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/photographers/fetchAllBlogs";
//     it("Blogs Listing API is working as expected and returns back data as expected", function(done) {
//         request.post({
//             url: url,
//             json: {photographerId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });
// });

// describe("Events page in the photographers dashboard is working correctly", function() {
//     var url = "http://localhost:3000/photographers/events";
//     it("Events Listing API is working as expected and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/photographers/events";
//     it("Events Listing API is working as expected and returns back data as expected", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });     
// });

// describe("Photographers page in the client dashboard is working correctly", function() {
//     var url = "http://localhost:3000/clients/fetchPhotographers";
//     it("Fetching photographers API is working as expected and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/clients/fetchPhotographers";
//     it("Fetching Photographers API is working as expected and returns back data as expected", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });
    
//     var url = "http://localhost:3000/clients/fetchAllBlogs";
//     it("Fetching photographers Blogs API is working as expected and returns status 200", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/clients/fetchAllBlogs";
//     it("Fetching Photographers Blogs API is working as expected and returns back data as expected", function(done) {
//         request(url, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });
// });

// describe("Clients dashboard returns back data as expected and is working correctly", function() {
//     var url = "http://localhost:3000/clients/getBookingRequests";
//     it("Requests Listing page is working as expected and returns status 200", function(done) {
//         request.post({
//             url: url,
//             json: {clientId:"65c3a985407e066d89af1639"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/clients/getBookingRequests";
//     it("Requests Listing page is working as expected and returns back data as expected", function(done) {
//         request.post({
//             url: url,
//             json: {clientId:"65c3a985407e066d89af1639"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/clients/getSelectedPhotographer";
//     it("Fetching data of specific photographer API is working as expected and returns status 200", function(done) {
//         request.post({
//             url: url,
//             json: {pId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             // expect(body.success).to.equal(true);
//             done();
//         });
//     });

//     var url = "http://localhost:3000/clients/getSelectedPhotographer";
//     it("Fetching data of specific photographer API is working as expected and returns back data as expected", function(done) {
//         request.post({
//             url: url,
//             json: {pId:"65c3a0c7407e066d89af1583"}
//         }, function(error, response, body) {
//             expect(response.statusCode).to.equal(200);
//             expect(body.length).to.be.greaterThan(0);
//             done();
//         });
//     });
// });