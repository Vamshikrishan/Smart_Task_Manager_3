const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("loginError");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showError("⚠ Please fill in both fields!");
    return;
  }

  // Get registered users from localStorage
  const users = JSON.parse(localStorage.getItem("taskUsers") || "[]");
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    errorMsg.textContent = "";
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "main.html";
    }, 600);
  } else {
    showError("❌ Invalid username or password!");
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add("visible", "shake");
  setTimeout(() => errorMsg.classList.remove("shake"), 400);
}
