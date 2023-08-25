function loginForm() {
  let emailid = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (
    (emailid == "" || emailid == null) &&
    (password == "" || password == null)
  ) {
    alert("Please enter email and password!! , it can't be empty!!");
    return false;
  } else if (emailid == "" || emailid == null) {
    alert("Please enter emailid. It can't be empty!! ");
    return false;
  } else if (password == "" || password == null) {
    alert("Please enter password. It can't be empty!! ");
    return false;
  }

  // checking the emailId(@)
  const checkEmail = emailid.indexOf("@gmail.com");
  if (checkEmail == -1) {
    alert("email is not valid");
    return false;
  }

  // checking the password length
  const passwordCheck = password.length;
  if (passwordCheck < 8) {
    alert("Password length must be atleast 8 characters");
  } else {
    alert(emailid + "\n" + password);
  }
}
