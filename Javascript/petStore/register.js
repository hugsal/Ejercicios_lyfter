let isAdminUser = false;

async function checkAdminState() {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    const token = localStorage.getItem("access_token");
    const user = await getMe(token);

    if (user && user.role === "client") {
      window.location.href = "./products.html";
      return;
    }
    const roleInput = document.getElementById("role-group");
    if (roleInput) roleInput.classList.remove("hidden");
    isAdminUser = true;
  } catch (error) {
    alert(error.message);
  }
}

checkAdminState();

const form = document.getElementById("registerForm");
const message = document.getElementById("register-message");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userPayload = { name, email, userName, password };

    if (isAdminUser) {
      const role = document.getElementById("role").value;
      userPayload.role = role;
    }

    try {
      const data = await registerUser(userPayload);

      if (!isAdminUser) {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        const {
          data: { user },
        } = await getMe(accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`Usuario creado correctamente! Tu id es ${user.id}`);
        window.location.href = "./products.html";
        return;
      }

      alert("Usuario creado correctamente!");
      window.location.href = "./admin.html";
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "No se pudo registrar el usuario. Inténtalo de nuevo.";
      if (message) {
        message.className = "message error";
        message.textContent = errorMessage;
      }
    }
  });
}
