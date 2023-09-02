//login
function loginForm() {
  let emailid = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let passwordCheck = password.length;
  let checkEmail = emailid.includes("@gmail.com");

  if (emailid === "" && password === "") {
    const msg = "Please enter email and password!! , it can't be empty!!";
    showToast(msg, "error");
  } else if (emailid == "" || password == "") {
    if (emailid == "") {
      const msg = "Please enter emailid. It can't be empty!! ";
      showToast(msg, "error");
    } else if (password == "") {
      if (!checkEmail) {
        const msg = "email is not valid and also enter password";
        showToast(msg, "invalid");
        //
      } else {
        const msg = "Please enter Password. It can't be empty!! ";
        showToast(msg, "error");
      }
    }
  } else {
    if (!checkEmail) {
      if (passwordCheck < 8) {
        const msg =
          "Email is not valid and Password length must be atleast 8 characters";
        showToast(msg, "invalid");
      } else {
        const msg = "email is not valid";
        showToast(msg, "invalid");
      }
      //
    } else if (passwordCheck < 8) {
      const msg = "Password length must be atleast 8 characters";
      showToast(msg, "invalid");
    } else {
      const payload = { emailid, password }; // creating a new object

      if (!localStorage.getItem("credentials")) {
        localStorage.setItem("credentials", JSON.stringify(payload));
      } else {
        alert("user alredy created");
      }
      createView();
      createNavbar();
    }
  }
}

window.addEventListener("load", function () {
  // Your code to handle the page load event here
  createView();
});

// create logged in user View--

function createView() {
  if (JSON.parse(localStorage.getItem("credentials"))) {
    const userData = JSON.parse(localStorage.getItem("credentials"));

    // descrtructirug
    const { emailid, password } = userData;

    const showData = document.getElementById("displayData");
    showData.style.display = "flex";

    const showDiv = document.createElement("div");
    showDiv.id = "showDiv";
    showDiv.innerHTML = `
    <p>Your Email Id: ${emailid}</p>
    <p>Your password: ${password}</p>
    `;

    const checkData = document.getElementById("displayData").innerHTML;
    if (checkData === "") {
      showData.appendChild(showDiv);
    }
  }
}

// ********************* Creating navbar ***************

function createNavbar() {
  const container = document.getElementById("container");
  container.style.display = "none";

  const behindForm = document.getElementById("behindForm");
  behindForm.style.display = "flex";

  const navbar = document.getElementById("navbar");
  navbar.style.display = "flex";

  const createLogoDiv = document.createElement("div");
  createLogoDiv.id = "logoDiv";
  createLogoDiv.innerHTML = `<h2>LOGO</h2>`;
  navbar.appendChild(createLogoDiv);

  let emailid = document.getElementById("email").value;

  const createEmailDiv = document.createElement("div");
  createEmailDiv.id = "emailDiv";
  createEmailDiv.innerHTML = `<h5> Email: ${emailid} </h5>`;
  navbar.appendChild(createEmailDiv);
}

// **************
function changePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const passwordIcon = document.getElementById("passwordIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.classList = "fa-solid fa-unlock fa-2x";
  } else {
    passwordInput.type = "password";
    passwordIcon.classList = "fa-solid fa-lock fa-2x";
  }
}

// toast function - for show alert toast
let toastBox = document.getElementById("toastBox");

function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = "toast";

  //
  switch (type) {
    case "success":
      toast.classList.add("Success");
      toast.innerHTML = `<img src="images/checkMark_icon.png" > ${message}`;

      break;
    case "error":
      toast.classList.add("Error");
      toast.innerHTML = `<img src="images/exclamation-mark.png" > ${message}`;

      break;
    case "invalid":
      toast.classList.add("Invalid");
      toast.innerHTML = `<img src="images/circle_xmark_icon.png" > ${message}`;

      break;
    default:
      console.log("please see all toast type , may be some type issue !!");
      break;
  }
  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
