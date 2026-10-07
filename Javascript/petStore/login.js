try {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "./products.html";
  }
} catch (error) {
  alert(error.message);
}

const form = document.getElementById("loginForm");
const message = document.getElementById("login-message");
console.log(form);

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    try {
      const data = await loginUser(userName, password);
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      const user = await getMe(accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (user && user.role === "admin") {
        window.location.href = "./admin.html";
      } else {
        window.location.href = "./products.html";
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo iniciar sesión. Inténtalo de nuevo.";
      if (message) {
        message.className = "message-error";
        message.textContent = errorMessage;
      }
    }
  });
}
