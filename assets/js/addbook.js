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
}

document.getElementById("addBookButton").addEventListener("click", addBook);
