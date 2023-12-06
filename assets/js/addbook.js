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
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "categories";
      checkbox.value = item.id;
      checkbox.id = "category" + item.id;

      let label = document.createElement("label");
      label.htmlFor = "category" + item.id;
      label.appendChild(document.createTextNode(item.name));

      checkboxesContainer.appendChild(checkbox);
      checkboxesContainer.appendChild(label);
      checkboxesContainer.appendChild(document.createElement("br"));
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

async function addBook() {
  const bookData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    quantity: document.getElementById("quantity").value,
    price: document.getElementById("price").value,
    image: "bookImageUrl",
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

    let addSuccess = document.querySelector('.added-to-data-success');
    let addedMessageTimeoutId = false;

    addSuccess.classList.add('active');

    if (addedMessageTimeoutId) {
      clearTimeout(addedMessageTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addSuccess.classList.remove('active');
    }, 2000);

    addedMessageTimeoutId = timeoutId;

    // console.log("Book added successfully!");
    // Add any additional processing here if needed
  } catch (error) {
    let addedMessageTimeoutId = false;

    let addNotSuccess = document.querySelector('.added-to-data-not-success');

    addNotSuccess.classList.add('active');

    if (addedMessageTimeoutId) {
      clearTimeout(addedMessageTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addNotSuccess.classList.remove('active');
    }, 2000);

    addedMessageTimeoutId = timeoutId;
  }
}

addBookButton.addEventListener("click", addBook);


// back again
const previousPage = document.querySelector('.previous-page');

previousPage.addEventListener('click', () => {
  window.location.href = 'books.html';
})
