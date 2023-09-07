//login
async function loginForm() {
  const userName = document.getElementById("userName").value;
  const emailid = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const contactNumber = document.getElementById("phNumber").value;
  const profileInput = document.getElementById("profile").files[0];

  let passwordCheck = password.length;
  let contactCheck = contactNumber.length;
  let checkEmail = emailid.includes("@gmail.com");

  if (
    !profileInput &&
    userName == "" &&
    emailid === "" &&
    password === "" &&
    contactNumber == ""
  ) {
    const msg = "Please enter all the inputs!! , they can't be empty!!";
    showToast(msg, "error");
    //
  } else if (
    !profileInput ||
    userName == "" ||
    emailid == "" ||
    password == ""
  ) {
    if (!profileInput) {
      const msg = "Please select a file!! ";
      showToast(msg, "invalid");
    } else if (userName == "") {
      const msg = "Please enter your Full Name!! ";
      showToast(msg, "invalid");
    } else if (emailid == "") {
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
      try {
        const profileImageBase64 = await fileToBase64(profileInput);
        console.log(profileImageBase64);

        const payload = {
          userName,
          emailid,
          password,
          contactNumber,
          profileImage: profileImageBase64, // Use the external variable
        }; // creating a new object

        if (!localStorage.getItem("credentials")) {
          localStorage.setItem("credentials", JSON.stringify(payload));
        } else {
          alert("user alredy created");
        }
        const containerDiv = document.getElementById("parentContainer");
        containerDiv.style.display = "flex";
        createNavbar();
        const msg = "congratulations ! succesfully logged in ";
        showToast(msg, "success");
      } catch (error) {
        // if any error,
        console.log("err haii kuch !!");
      }
    }
  }
}
// when page load, this will check local storage..
// if localstorage has same key, then it will show already logged in data ..
window.addEventListener("load", function () {
  if (localStorage.getItem("credentials")) {
    const containerDiv = document.getElementById("parentContainer");
    containerDiv.style.display = "flex";

    createNavbar();
    const msg = "already logged in ";
    // showToast(msg, "success");
  }
});

// taking image from input file and then passing to getImage()
//then showing in form

function imageFromFileinput(event) {
  const file = event.target.files[0];
  const uploadImage = getImage(file); // passing to getImage() function

  const uploadedImage = document.getElementById("uploadedImage");
  uploadedImage.src = uploadImage;

  const showImage = document.getElementById("showImage");
  showImage.style.display = "flex";
}

// generate uplaoded image file to object URL only.
// this function will only return object URL only..
const getImage = function (file) {
  return URL.createObjectURL(file);
};

// update new image
// only for upload and preview new profile picture
function newImageUpload(event) {
  const file = event.target.files[0];
  const image = getImage(file); // calling getimage() to convert object URL
  if (image) {
    document.getElementById("previewProfile").src = image;
  }
}

// Function to convert a file to base64 using a callback
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Data = e.target.result;
      resolve(base64Data);
    };

    reader.readAsDataURL(file);
  });
}

// close the profile section
var isOpen = false; // boolean  true / false

function closeProfile() {
  const showData = document.getElementById("displayData_2");

  if (isOpen) {
    isOpen = false;
    showData.id = "displayData";
  } else {
    isOpen = true;
    showData.id = "displayData_2";
  }
}

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

  const userData = JSON.parse(localStorage.getItem("credentials"));
  const { emailid, password, profileImage } = userData;
  // console.log("this is profile ", profileImage);

  const createEmailDiv = document.createElement("div");
  const profilePic = document.createElement("img");
  profilePic.id = "profilePic";
  profilePic.src = profileImage;
  profilePic.addEventListener("click", () => createView());

  createEmailDiv.appendChild(profilePic);
  createEmailDiv.id = "emailDiv";

  navbar.appendChild(createEmailDiv);
}

// create logged in user View--

function createView() {
  if (JSON.parse(localStorage.getItem("credentials"))) {
    //
    if (document.getElementById("showDiv")) {
      if (!isOpen) {
        const showData = document.getElementById("displayData");
        isOpen = true;
        showData.id = "displayData_2";
      }
    } else {
      const userData = JSON.parse(localStorage.getItem("credentials"));
      // descrtructirug
      const { emailid, userName, contactNumber, profileImage } = userData;

      const showData = document.getElementById("displayData");

      const showDiv = document.createElement("div");
      showDiv.id = "showDiv";
      showDiv.innerHTML = `
      <div class = "innerProfileImageDiv">
         <img id='previewProfile' src= "${profileImage}" />
         <label for="updatepictute"> 
          <i class="fa-solid fa-camera" id="editProfileImage" >
          <input type="file" id="updatepictute" name="updatepictute" accept="image/*" onchange='newImageUpload(event)' />
          </i>
         </label>
      </div>
      <div class ="innerProfileDataDiv">
         <span>Name:</span> 
         <input type='text' value=${userName} id="nameInput" /> 
         </br>
         <span>Email:</span> 
         <input type='text' value=${emailid} id="emailInput"/>
         </br>
         <span>Contact Number:</span> 
         <input type='number' value=${contactNumber} id="numberInput" /> 
      </div>
      <div class ="editProfileDetails">
       <button id="editButton" onclick='updateProfile()'>UPDATE PROFILE</button>
      </div>
      <div class ="logoutUser">     
       <button id="editButton" onclick='logout()'>Logout</button>
      </div>
      `;
      showData.appendChild(showDiv);

      if (!isOpen) {
        isOpen = true;
        showData.id = "displayData_2";
      }
    }
  }
}

// taking the new value from input text in the profile section and the a file as a image for profile picture
async function updatedData() {
  const userName = document.getElementById("nameInput").value;
  const emailid = document.getElementById("emailInput").value;
  const contactNumber = document.getElementById("numberInput").value;
  const updatedProfileImage = document.getElementById("updatepictute").files[0];
  // console.log("images taken", updatedProfileImage);

  if (updatedProfileImage == undefined) {
    if (JSON.parse(localStorage.getItem("credentials"))) {
      const alreadyData = JSON.parse(localStorage.getItem("credentials")); // getting data from local storage in a variable
      const { profileImage } = alreadyData; // taking the image from the local storage

      const payload = {
        userName,
        emailid,
        contactNumber,
        profileImage,
      };
      localStorage.setItem("credentials", JSON.stringify(payload));
      //
    } else {
      alert("data is not there");
    }
    //
  } else {
    try {
      const profileUpdatedImage = await fileToBase64(updatedProfileImage);

      const payload = {
        userName,
        emailid,
        contactNumber,
        profileImage: profileUpdatedImage,
      }; // creating a new object

      if (JSON.parse(localStorage.getItem("credentials"))) {
        localStorage.setItem("credentials", JSON.stringify(payload));
      } else {
        alert("data is not there");
      }
    } catch (error) {
      console.log("something is error");
    }
  }
}

// ********************* Creating navbar ***************
// **************
function changePasswordVisibility() {
  const passwordIcon = document.getElementById("passwordIcon");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    passwordIcon.classList = "fa-solid fa-unlock fa-2x";
  } else {
    confirmPasswordInput.type = "password";
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

// lougout function
// this function will check first the localstorage
// then remove exsisiting user from localstorage...
function logout() {
  if (JSON.parse(localStorage.getItem("credentials"))) {
    localStorage.removeItem("credentials");
    location.reload(); // page reloading
  }
}

// update profile
// this function will firstly check the localstorage
// then it will update the exixiting user by latest inputs or base64 images
function updateProfile() {
  if (JSON.parse(localStorage.getItem("credentials"))) {
    const alreadyData = JSON.parse(localStorage.getItem("credentials"));
    // console.log("alreadyData", alreadyData);
    updatedData();
  }
}
