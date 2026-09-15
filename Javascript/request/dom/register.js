try {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "./profile.html";
  }
} catch (error) {
  alert(error.message);
}

const axiosInstance = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

const form = document.getElementById("register-form");
const message = document.getElementById("register-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const user = { name, data: { email, password } };

  try {
    const { data } = await axiosInstance.post("/objects", user);
    delete data.data.password;
    localStorage.setItem("user", JSON.stringify(data));
    message.className = "message success";
    message.textContent = `Usuario creado correctamente! Tu id es ${data.id}`;
    alert(`Usuario creado correctamente! Tu id es ${data.id}`);
    window.location.href = "./profile.html";
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "No se pudo registrar el usuario. Inténtalo de nuevo.";
    message.className = "message error";
    message.textContent = errorMessage;
  }
});
