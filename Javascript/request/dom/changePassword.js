const axiosInstance = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

const form = document.getElementById("change-password-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("change-user-id").value;
  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  let user;

  try {
    const { data } = await axiosInstance.get(`/objects/${id}`);
    user = data;
  } catch (error) {
    if (error.response?.status === 404) {
      alert("Usuario no encontrado");
      return;
    }

    alert("No se pudo consultar el usuario");
    return;
  }

  if (!user) {
    alert("Usuario no encontrado");
    return;
  }

  if (user.data.password !== oldPassword) {
    alert("Contraseña anterior incorrecta");
    return;
  }

  user.data.password = newPassword;

  try {
    await axiosInstance.patch(`/objects/${id}`, { data: user.data });
  } catch (error) {
    alert("No se pudo cambiar la contraseña");
    return;
  }

  alert("Contraseña cambiada exitosamente");
});
