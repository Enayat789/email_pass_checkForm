async function addProduct() {
  const product_Image = document.getElementById("productImage").files[0];
  const product_name = document.getElementById("prd_name").value;
  const product_description = document.getElementById("prd_description").value;

  if (!product_Image && product_name == "" && product_description == "") {
    const msg = "Please enter all the inputs!! , they can't be empty!!";
    showToast(msg, "error");
  } else if (
    !product_Image ||
    product_name == "" ||
    product_description == ""
  ) {
    if (!product_Image) {
      const msg = "plz upload product image";
      showToast(msg, "invalid");
    } else if (product_name == "") {
      const msg = "Enter product name!!";
      showToast(msg, "invalid");
    } else if (product_description == "") {
      const msg = "Enter description!!";
      showToast(msg, "invalid");
    }
  } else {
    try {
      const profileImageBase64 = await fileToBase64(product_Image);
      //   console.log(profileImageBase64);
      const payload = {
        product_name,
        product_description,
        productImage: profileImageBase64,
      };

      if (!localStorage.getItem("productDetails")) {
        localStorage.setItem("productDetails", JSON.stringify(payload));
      } else {
        alert("product details available already");
      }

      //
    } catch (error) {
      console.log("err haii kuch !!");
    }
  }
}

// it will take a image of the product
function imgFor_product(event) {
  const file = event.target.files[0];
  const uploadImage = getImage(file); // passing to getImage() function

  const uploadedImage = document.getElementById("takeProductImage");
  uploadedImage.src = uploadImage;

  const showImage = document.getElementById("takeProductImage");
  showImage.style.display = "flex";
}

// // for the product table details
const pTable = document.getElementById("productTable");
pTable.innerHTML = `
    <div class="product_headingDetails">
      <p>Product Details</p>
    </div>
    <div class="about_product">

    <label for="">

    </label>


      <label for="productName">Product Name: </label>
      <input type="text" id="productName" name="productName" />

      <label for="descriptionProduct">product description:</label>
      <textarea id="descriptionProduct" name="" cols="20" rows="5"></textarea>

      <input type="button" id="" value="" />
      

    </div>
`;
