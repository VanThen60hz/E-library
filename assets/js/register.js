const { response } = require("express");

function register() {
  // Lấy dữ liệu từ các trường đầu vào
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const birthdayInput = document.getElementById("birthday").value;
  const phone = document.getElementById("phone").value;

  const genderString = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  const gender = Number(genderString);

  const birthday = formatBirthday(birthdayInput);

  // Tạo một đối tượng chứa dữ liệu để gửi
  const data = {
    name,
    username,
    password,
    email,
    phone,
    birthday,
    gender,
  };

  // Gửi yêu cầu POST đến máy chủ BE
  fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          // Set the error message in the "message" element
          document.getElementById("register-message").textContent =
            errorData.message;
          throw new Error("Network response was not ok");
        });
      }

      // Remove old css class
      const messageElement = document.getElementById("register-message");
      messageElement.classList.remove("text-danger");

      // Set notification with green color
      messageElement.textContent = username + " registered successfully!";
      messageElement.classList.add("text-success");

      return response.json();
    })
    .then((data) => {
      // Xử lý dữ liệu JSON ở đây nếu cần
      console.log("Response Data:", data);
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
    });
}

// Hàm chuyển đổi ngày sinh thành định dạng yyyy-mm-dd
function formatBirthday(inputDate) {
  const parts = inputDate.split("-"); // Giả sử ngày tháng năm được nhập dưới dạng dd-mm-yyyy
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}/${month}/${day}`;
  }
  return inputDate; // Trả về ngày sinh ban đầu nếu định dạng không hợp lệ
}
