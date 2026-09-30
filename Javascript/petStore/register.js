const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

async function isAdmin() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    const token = localStorage.getItem("access_token");
    const { data } = await axiosInstance.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (user && data.user.role == "client") {
      window.location.href = "./products.html";
      return;
    }
    const roleInput = document.getElementById("role-group");
    roleInput.classList.remove("hidden");
    isAdminUser = true;
  } catch (error) {
    alert(error.message);
  }
}

let isAdminUser = false;

isAdmin();

const form = document.getElementById("registerForm");
const message = document.getElementById("register-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const user = { name, email, userName, password };

  if (isAdminUser) {
    const role = document.getElementById("role").value;
    user.role = role;
  }

  try {
    const { data } = await axiosInstance.post("/signin", user);

    if (!isAdminUser) {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const { data: userResponse } = await axiosInstance.get("/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(userResponse));
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      alert(`Usuario creado correctamente! Tu id es ${userResponse.user.id}`);
      window.location.href = "./products.html";
      return;
    }

    alert("Usuario creado correctamente!");
    window.location.href = "./admin.html";
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "No se pudo registrar el usuario. Inténtalo de nuevo.";
    message.className = "message error";
    message.textContent = errorMessage;
  }
});
