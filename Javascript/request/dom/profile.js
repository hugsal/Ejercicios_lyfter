const axiosInstance = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 5000,
  headers: { "content-type": "application/json" },
});

const profileId = document.getElementById("profile-id");
const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const logoutBtn = document.getElementById("logout-btn");
const editBtn = document.getElementById("edit-btn");
const formView = document.getElementById("edit-profile-view");
const profileView = document.getElementById("profile-view");
const cancelBtn = document.getElementById("cancel-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const saveBtn = document.getElementById("save-btn");

let user = null;

const SESSION_DURATION = 5 * 60 * 1000;

try {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    window.location.href = "./login.html";
  } else {
    user = JSON.parse(storedUser);

    if (
      !user ||
      typeof user !== "object" ||
      (user.expiresAt !== undefined &&
        (!Number.isFinite(user.expiresAt) || Date.now() >= user.expiresAt))
    ) {
      localStorage.removeItem("user");
      window.location.href = "./login.html";
      throw new Error("La sesión ha expirado");
    }

    if (user.expiresAt === undefined) {
      user.expiresAt = Date.now() + SESSION_DURATION;
      localStorage.setItem("user", JSON.stringify(user));
    }

    profileId.textContent = user.id || "";
    profileName.textContent = user.name || "";
    profileEmail.textContent = user.data?.email || "";
  }
} catch (error) {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
}

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
};

if (user?.expiresAt) {
  window.setTimeout(logout, user.expiresAt - Date.now());
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

if (editBtn) {
  editBtn.addEventListener("click", () => {
    formView.hidden = false;
    profileView.hidden = true;
    editBtn.hidden = true;
    logoutBtn.hidden = true;
    nameInput.value = user?.name || "";
    emailInput.value = user?.data?.email || "";
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    formView.hidden = true;
    profileView.hidden = false;
    editBtn.hidden = false;
    logoutBtn.hidden = false;
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    try {
      const updatedData = {
        name: nameInput.value,
        data: {
          ...(user?.data || {}),
          email: emailInput.value,
        },
      };

      const { data: userData } = await axiosInstance.put(
        `/objects/${user.id}`,
        updatedData,
      );

      user = { ...userData, expiresAt: user.expiresAt };
      localStorage.setItem("user", JSON.stringify(user));

      profileName.textContent = user.name || "";
      profileEmail.textContent = user.data?.email || "";

      formView.hidden = true;
      profileView.hidden = false;
      editBtn.hidden = false;
      logoutBtn.hidden = false;
    } catch (error) {
      alert("Error al guardar cambios: " + error.message);
    }
  });
}
