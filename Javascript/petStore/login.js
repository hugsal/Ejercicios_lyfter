try {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "./products.html";
  }
} catch (error) {
  alert(error.message);
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

const form = document.getElementById("loginForm");
const message = document.getElementById("login-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;

  try {
    const { data } = await axiosInstance.post("/login", { userName, password });
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const { data: userResponse } = await axiosInstance.get("/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    localStorage.setItem("user", JSON.stringify(userResponse.user));
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    if (userResponse.user.role === "admin") {
      window.location.href = "./admin.html";
    } else {
      window.location.href = "./products.html";
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "No se pudo iniciar sesión. Inténtalo de nuevo.";
    message.className = "message-error";
    message.textContent = errorMessage;
  }
});
