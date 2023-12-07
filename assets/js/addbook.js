document.addEventListener("DOMContentLoaded", function () {
  // Get the select elements
  let authorSelect = document.getElementById("author");
  let publisherSelect = document.getElementById("publisher");
  let categoriesCheckboxes = document.getElementById("categories-checkboxes");
  const addBookButton = document.getElementById("addBookButton");

  // Function to populate a select element with options
  function populateSelect(selectElement, data, defaultOptionText) {
    // Add default option
    let defaultOption = document.createElement("option");
    defaultOption.text = defaultOptionText;
    selectElement.appendChild(defaultOption);

    // Iterate through the data and add options to the select element
    data.forEach((item) => {
      let option = document.createElement("option");
      option.value = item[Object.keys(item)[0]]; // Assuming each object has only one property
      option.text = item[Object.keys(item)[0]];
      selectElement.appendChild(option);
    });
  }

  function populateCheckboxes(checkboxesContainer, data) {
    data.forEach((item) => {
      let checkboxDiv = document.createElement("div");
      checkboxDiv.classList.add("form-check", "form-check-inline");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "categories";
      checkbox.value = item.id;
      checkbox.id = "category" + item.id;
      checkbox.classList.add("form-check-input");

      let label = document.createElement("label");
      label.classList.add("form-check-label");
      label.htmlFor = "category" + item.id;
      label.appendChild(document.createTextNode(item.name));

      checkboxDiv.appendChild(checkbox);
      checkboxDiv.appendChild(label);
      checkboxesContainer.appendChild(checkboxDiv);
    });
  }

  // Fetch data for the author select
  fetch("http://localhost:8080/api/author")
    .then((response) => response.json())
    .then((data) => populateSelect(authorSelect, data, "Select author"))
    .catch((error) => console.error("Error fetching author data:", error));

  // Fetch data for the publisher select
  fetch("http://localhost:8080/api/publisher")
    .then((response) => response.json())
    .then((data) => populateSelect(publisherSelect, data, "Select publisher"))
    .catch((error) => console.error("Error fetching publisher data:", error));

  fetch("http://localhost:8080/api/category")
    .then((response) => response.json())
    .then((data) => populateCheckboxes(categoriesCheckboxes, data))
    .catch((error) => console.error("Error fetching category data:", error));
});

//   const bookData = {
//     title: "Example Book",
//     description: "This is an example book description.",
//     quantity: 10,
//     price: 29.99,
//     image: "example_image.jpg",
//     createDate: "2023-01-01",
//     publishedYear: "2022-01-01",
//     publisherId: "Nhà  bản hội nhà văn",
//     authorId: "Jose Mauro De",
//     categoryIds: [1, 2],
//   };

// Function to upload image to Cloudinary
async function uploadCloudinary() {
  return new Promise(async (resolve, reject) => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      console.error("No file selected");
      reject(new Error("No file selected"));
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const authToken = localStorage.getItem("accessToken");

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/test/cloudinary",
        {
          method: "POST",
          body: formData,
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        resolve(data.url);
      } else {
        const data = await response.text();
        resolve(data);
      }

      // Optionally, you can reset the file input
      fileInput.value = ""; // Clear the selected file
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
      reject(error);
    }
  });
}

// Function to add a book
async function addBook() {
  try {
    // Upload the image to Cloudinary and get the URL
    const imageUrl = await uploadCloudinary();
    console.log(imageUrl);

    if (!imageUrl) {
      console.error("Image upload failed");
      return;
    }
    console.log(imageUrl);

    const bookData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      quantity: document.getElementById("quantity").value,
      price: document.getElementById("price").value,
      image: imageUrl,
      // category: document.getElementById("category").value,
      publishedYear: document.getElementById("publishingDate").value,
      publisherId: document.getElementById("publisher").value,
      authorId: document.getElementById("author").value,
      categoryIds: Array.from(
        document.querySelectorAll('input[name="categories"]:checked')
      ).map((category) => category.value),
    };

    const apiUrl = "http://localhost:8080/api/book"; // Replace with the actual API endpoint
    const authToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include this line if using token-based authentication
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Error adding the book.");
      }

      console.log("Book added successfully!");
      // Add any additional processing here if needed
    } catch (error) {
      console.error(error.message);
    }
  } catch (error) {
    console.error("Error adding book:", error);
    // Handle errors, display an error message, etc.
  }
}

addBookButton.addEventListener("click", addBook);

// back again
const previousPage = document.querySelector(".previous-page");

previousPage.addEventListener("click", () => {
  window.location.href = "books.html";
});

function displaySelectedFile(input) {
  let fileInput = input;
  let displayDummy = document.querySelector(".tm-book-img-dummy");
  let displayDummyIcon = document.querySelector(".tm-book-img-dummy i");

  if (fileInput.files && fileInput.files[0]) {
    let reader = new FileReader();
    displayDummyIcon.style.display = "none";

    reader.onload = function (e) {
      // Ensure that the element is visible
      displayDummy.style.display = "block";
      displayDummy.style.backgroundImage = "url(" + e.target.result + ")";
      displayDummy.style.backgroundSize = "cover";
    };

    reader.onerror = function (e) {
      console.error("Error reading the file:", e);
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}
