//login
function loginForm() {
  let emailid = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let contactNumber = document.getElementById("phNumber").value;
  let profilePicture = document.getElementById("avatar").value;
  // console.log(profilePicture);

  let passwordCheck = password.length;
  let contactCheck = contactNumber.length;
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
        showToast(msg, "invalid");
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
    } else if (password != confirmPassword) {
      const msg = "Password does not match!! ";
      showToast(msg, "invalid");
    } else if (contactCheck < 10 || contactCheck > 10) {
      const msg = "Invalid Contact Number!! ";
      showToast(msg, "invalid");
    } else {
      const payload = { emailid, password, contactNumber }; // creating a new object

      if (!localStorage.getItem("credentials")) {
        localStorage.setItem("credentials", JSON.stringify(payload));
      } else {
        alert("user alredy created");
      }
      const containerDiv = document.getElementById("parentContainer");
      containerDiv.style.display = "flex";
      // createView();
      createNavbar();
    }
  }
}

window.addEventListener("load", function () {
  // Your code to handle the page load event here

  if (localStorage.getItem("credentials")) {
    const containerDiv = document.getElementById("parentContainer");
    containerDiv.style.display = "flex";
    createView();
    createNavbar();
  }
});

// show the image from the input file

const getImage = function (event) {
  const showImage = document.getElementById("showImage");
  showImage.style.display = "block";
  //

  const uploadedImage = document.getElementById("uploadedImage");
  uploadedImage.src = URL.createObjectURL(event.target.files[0]);
  uploadedImage.onload = function () {
    URL.revokeObjectURL(uploadedImage.src); // free memory
  };
};

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

  // let emailid = document.getElementById("email").value;
  const userData = JSON.parse(localStorage.getItem("credentials"));
  const { emailid, password } = userData;

  const createEmailDiv = document.createElement("div");
  createEmailDiv.id = "emailDiv";
  createEmailDiv.innerHTML = `<i class="fa-solid fa-user fa-2x " onclick="alert('Emailid: ${emailid}')"> </i>`;

  navbar.appendChild(createEmailDiv);
}

// **************
function changePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const passwordIcon = document.getElementById("passwordIcon");

  const confirmPasswordInput = document.getElementById("confirmPassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    confirmPasswordInput.type = "text"; // confirm password
    passwordIcon.classList = "fa-solid fa-unlock fa-2x";
  } else {
    passwordInput.type = "password";
    confirmPasswordInput.type = "password"; // confirm password
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
