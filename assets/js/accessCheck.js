function checkAccessToken() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    fetch("http://localhost:8080/api/test/admin/test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Access Denied") {
          window.location.href = "/pages/404.html";
        }
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });
  } else {
    window.location.href = "/pages/404.html";
  }
}

window.addEventListener("load", checkAccessToken);
