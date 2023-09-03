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

async function loginForm() {
  let emailid = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const profileInput = document.getElementById("profile").files[0];

  try {
    // Wait for the base64 conversion to complete
    profileImageBase64 = await fileToBase64(profileInput);

    // Your login logic here

    // Create a payload object with email, password, and profile image
    const payload = {
      emailid,
      password,
      profileImage: profileImageBase64, // Use the external variable
    };

    // Check if user data already exists in localStorage
    if (!localStorage.getItem("credentials")) {
      // If not, save the user data to localStorage
      localStorage.setItem("credentials", JSON.stringify(payload));
      alert("User created successfully.");
    } else {
      alert("User already exists.");
    }
  } catch (error) {
    console.error(error); // Handle errors, e.g., if no file is selected
  }
}
