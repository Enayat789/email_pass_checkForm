function loginForm() {
  let emailid = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let passwordCheck = password.length;
  let checkEmail = emailid.includes("@gmail.com");

  // console.log("passwordCheck", passwordCheck);
  // console.log("checkEmail", checkEmail);

  if (emailid === "" && password === "") {
    const msg = "Please enter email and password!! , it can't be empty!!";
    showToast(msg, "invalid");
  } else if (emailid == "" || password == "") {
    if (emailid == "") {
      const msg = "Please enter emailid. It can't be empty!! ";
      showToast(msg, "error");
    } else if (password == "") {
      const msg = "Please enter Password. It can't be empty!! ";
      showToast(msg, "error");
    }
  } else {
    if (!checkEmail) {
      const msg = "email is not valid";
      showToast(msg, "invalid");
      //
    }
    // else if (passwordCheck < 8) {
    //   // console.log("passwordCheck inside ,", passwordCheck);
    //   const msg = "Password length must be atleast 8 characters";
    //   showToast(msg, "invalid");
    // }
    else {
      const msg = `${emailid + "\n" + password}`;
      showToast(msg, "success");
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

// toast function - for show alert toast
let toastBox = document.getElementById("toastBox");
const toast = document.createElement("div");
toast.className = "toast";

function showToast(message, type) {
  switch (type) {
    case "success":
      toast.classList.add("Success");
      toast.innerHTML = message;

      break;
    case "error":
      toast.classList.add("Error");
      toast.innerHTML = message;

      break;
    case "invalid":
      toast.classList.add("Invalid");
      toast.innerHTML = message;

      break;
    default:
      console.log("please see all toast type , may be some type issue !!");
      break;
  }
  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
