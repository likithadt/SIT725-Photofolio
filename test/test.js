var expect  = require("chai").expect;
var request = require("request");

// Landing page testing
describe("Landing Page Loading Properly", function() {
    var url = "http://localhost:3000/";
    it("Landing Page working properly and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    var url = "http://localhost:3000/#about";
    it("Landing Page opens on About and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    var url = "http://localhost:3000/#features";
    it("Landing Page opens on Features and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    var url = "http://localhost:3000/#testimonials";
    it("Landing Page opens on Testimonials and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    var url = "http://localhost:3000/#contact";
    it("Landing Page opens on Contact Us Form and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    var url = "http://localhost:3000/landing/testimonials";
    it("Testimonials GET API is called and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.length).to.be.greaterThan(0);
            done();
        });
    });

    var url = "http://localhost:3000/landing/testimonials";
    it("Testimonials API returns a list of testimonials", function(done) {
        request(url, function(error, response, body) {
            expect(body.length).to.be.greaterThan(0);
            done();
        });
    });

});

describe("Website Loads all the styles", function() {
    var url = "http://localhost:3000/styles.css";
    it("CSS Styles loaded properly and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

// Login page
describe("Login Page is loading correctly", function() {
    var url = "http://localhost:3000/authentication/login.html";
    it("Login page loaded properly and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

describe("Login POST request is working", function() {
    var url = "http://localhost:3000/login/login";
    it("Login API works and returns status 200", function(done) {
        request.post({
            url: url,
            json: {email: "kiranms20@gmail.com", password: "mohan"}
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    var url = "http://localhost:3000/login/login";
    it("Login API works and returns false when wrong data is given", function(done) {
        request.post({
            url: url,
            json: {email: "kiranms20@gmail.com", password: "1234"}
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.success).to.equal(false);
            done();
        });
    });

    var url = "http://localhost:3000/login/login";
    it("Login API works and returns true when correct data is given", function(done) {
        request.post({
            url: url,
            json: {email: "kiranms20@gmail.com", password: "mohan"}
        }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body.success).to.equal(true);
            done();
        });
    });
});

// Password Reset Page
describe("Password Reset page is loading correctly", function() {
    var url = "http://localhost:3000/authentication/passwordReset.html";
    it("Password reset page loaded properly and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

// User Registration page
describe("User Signup page is loading correctly", function() {
    var url = "http://localhost:3000/authentication/userRegistration.html";
    it("Signup page loaded properly and returns status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});


