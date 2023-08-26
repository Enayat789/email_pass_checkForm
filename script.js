function loginForm() {
  let emailid = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (emailid === "" && password === "") {
    alert("Please enter email and password!! , it can't be empty!!");
  } else if (emailid == "") {
    // checking the password length
    const passwordCheck = password.length;
    if (passwordCheck < 8) {
      alert(
        "Please enter emailid and Password length must be atleast 8 characters"
      );
    } else {
      alert("Please enter emailid. It can't be empty!! ");
    }
  } else if (password == "") {
    // checking the emailId(@)
    const checkEmail = emailid.indexOf("@gmail.com");
    if (checkEmail == -1) {
      alert(
        "email is not valid and Please enter password. It can't be empty!! "
      );
    } else {
      alert("Please enter password. It can't be empty!! ");
    }
  } else {
    // checking the emailId(@)
    const checkEmail = emailid.indexOf("@gmail.com");
    const passwordCheck = password.length;

    if (checkEmail == -1) {
      const passwordCheck = password.length;
      if (passwordCheck < 8) {
        alert(
          " email is not valid and Password length must be atleast 8 characters"
        );
      } else {
        alert("email is not valid");
      }
    } else if (passwordCheck < 8) {
      alert("Password length must be atleast 8 characters");
    } else {
      alert(emailid + "\n" + password);
    }
  }

  // *******
}

function changePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const passwordIcon = document.getElementById("passwordIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.src = "./images/iconShowPassword.png";
  } else {
    passwordInput.type = "password";
    passwordIcon.src = "./images/iconHidePassword.png";
  }
}
