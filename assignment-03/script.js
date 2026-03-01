function validateForm() {

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    if (username === "" || email === "" || phone === "" || password === "" || confirm === "") {
        alert("All fields are mandatory");
        return false;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Phone must be 10 digits");
        return false;
    }

    let emailPattern = /^[a-zA-Z]+@[a-zA-Z]{3}\.[a-zA-Z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Invalid Email");
        return false;
    }

    let passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[&$#@]).{7,}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must contain 1 capital, 1 digit, 1 special char (&,$,#,@)");
        return false;
    }

    if (password !== confirm) {
        alert("Passwords do not match");
        return false;
    }

    alert("Form Submitted Successfully");
}

function changeImage() {
    document.getElementById("img1").setAttribute("src", "https://via.placeholder.com/200");
}

/* DOM Manipulation */

document.getElementById("heading").innerHTML = "Updated Student Registration";

document.getElementsByClassName("demo")[0].style.color = "blue";

/* jQuery Operations */

$(document).ready(function(){

    $("button").click(function(){
        $(this).text("Clicked");
    });

    $("body").css("background-color", "#f2f2f2");

    $("#username").attr("placeholder", "Enter Username");

});