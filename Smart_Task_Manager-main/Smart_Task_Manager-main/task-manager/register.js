const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("registerError");
const successMsg = document.getElementById("registerSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirm = document.getElementById("regConfirmPassword").value.trim();

  if (!username || !email || !password || !confirm) {
    showError("⚠ Please fill in all fields!");
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    showError("⚠ Please enter a valid email address!");
    return;
  }

  if (password.length < 4) {
    showError("⚠ Password must be at least 4 characters!");
    return;
  }

  if (password !== confirm) {
    showError("⚠ Passwords do not match!");
    return;
  }

  // Retrieve existing users
  const users = JSON.parse(localStorage.getItem("taskUsers") || "[]");

  // Check duplicate username or email
  if (users.some(u => u.username === username || u.email === email)) {
    showError("⚠ Username or Email already exists!");
    return;
  }

  // Add new user
  users.push({ username, email, password });
  localStorage.setItem("taskUsers", JSON.stringify(users));

  errorMsg.textContent = "";
  successMsg.textContent = "✅ Registered successfully! Redirecting to login...";
  successMsg.classList.add("visible");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add("visible", "shake");
  setTimeout(() => errorMsg.classList.remove("shake"), 400);
}
