// Listen for the event when the login button is clicked
document
  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default submit button behavior
    const usernameOrEmail = document.getElementById("usernameOrEmail").value; // Get the value from the username/email field
    const password = document.getElementById("password").value; // Get the value from the password field

    // Call the loginAndCheckRole function with login information
    loginAndCheckRole(usernameOrEmail, password);
  });

// Function to perform login and check user role
function loginAndCheckRole(usernameOrEmail, password) {
  // Login data in JSON format
  const loginData = {
    usernameOrEmail: usernameOrEmail,
    password: password,
  };

  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then(async (data) => {
      // Store the access token after login in Local Storage
      if (data.accessToken) {
        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        // console.log(accessToken);

        // Call the function to check the user role from the server
        checkUserRoleAndRedirect(accessToken);
      } else {
        document.getElementById("login-message").textContent =
          "username/email or password is not correct";
      }
    })
    .catch((error) => {
      console.error("Login error: ", error);
    });
}

// Function to check user role from the server
function checkUserRoleAndRedirect(accessToken) {
  console.log("vô đc hàm");

  fetch("http://localhost:8080/api/test/admin/test", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    mode: "cors",
    cache: "default",
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("User has ROLE_ADMIN");
        // Redirect to the dashboard page for ROLE_ADMIN
        window.location.href = "/pages/admin/dashboard.html";
      } else {
        console.log("User does not have ROLE_ADMIN");
        // Redirect to another page or display an error message
        window.location.href = "/index.html";
        console.log("có lỗi");
      }
    })
    .catch((error) => {
      console.error("Error checking user role from the server: ", error);
    });

  console.log("cuối hàm");
}
