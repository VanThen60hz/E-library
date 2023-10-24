function checkAccessToken() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    window.location.href = "/pages/404.html";
  }
}

window.addEventListener("load", checkAccessToken);
