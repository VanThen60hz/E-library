function logout() {
  localStorage.removeItem("accessToken");

  window.location.href = "/pages/login.html";
}
