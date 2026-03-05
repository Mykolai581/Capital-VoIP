function handleCredentialResponse(response) {
  // Тут ви отримуєте credential від Google
  const credential = response.credential;

  // Відправте credential на ваш сервер для перевірки
  fetch("/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential: credential }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Обробка успішної авторизації
      console.log("Успішний вхід:", data);
      window.location.href = "/dashboard"; // Перенаправлення
    })
    .catch((error) => {
      console.error("Помилка:", error);
    });
}

//==========================================

//Validation

const loginForm = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const buttonEye = document.querySelector(".button-eye");
const formErrorEmail = document.querySelector(".form-error__email");
const formErrorPassword = document.querySelector(".form-error__password");

const addActive = (el) => el.classList.add("active");
const removeActive = (el) => el.classList.remove("active");

email.addEventListener("focus", () => addActive(email));
email.addEventListener("blur", () => removeActive(email));
password.addEventListener("focus", () => addActive(password));
password.addEventListener("blur", () => removeActive(password));

buttonEye.addEventListener("click", () => {
  const iconEye = document.querySelector(".icon-eye");

  if (password.type === "password") {
    password.type = "text";

    iconEye.src = "../img/icons/open eye.svg";
    iconEye.alt = "Hide eye";
  } else {
    password.type = "password";

    iconEye.src = "../img/icons/close eye.svg";
    iconEye.alt = "Close eye";
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (passwordValue.length < 8) {
    formErrorPassword.textContent =
      "Password must be at least 8 characters long ";
  }

  loginForm.reset();
});
