const SESSION_DURATION = 5 * 60 * 1000; // 5 minutos

try {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);

    if (user.expiresAt && Date.now() < user.expiresAt) {
      window.location.href = "./profile.html";
    } else {
      localStorage.removeItem("user");
    }
  }
} catch (error) {
  localStorage.removeItem("user");
  alert("La sesión no es válida");
}

const axiosInstance = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

const form = document.getElementById("login-form");
const messageEl = document.getElementById("login-message");
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("msg") === "expired" && messageEl) {
  messageEl.className = "message error";
  messageEl.textContent = "Sesión expirada, vuelva a iniciar sesión";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("login-id").value;
  const password = document.getElementById("login-password").value;
  let user = null;

  try {
    const response = await axiosInstance.get(`/objects/${id}`);
    user = response.data;
  } catch (error) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  if (user.data.password !== password) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  delete user.data.password;
  const sessionUser = {
    ...user,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  localStorage.setItem("user", JSON.stringify(sessionUser));
  window.location.href = "./profile.html";
});
