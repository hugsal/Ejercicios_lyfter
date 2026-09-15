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

try {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    window.location.href = "./login.html";
  } else {
    user = JSON.parse(storedUser);
    profileId.textContent = user.id || "";
    profileName.textContent = user.name || "";
    profileEmail.textContent = user.data?.email || "";
  }
} catch (error) {
  alert("Error al cargar datos del usuario: " + error.message);
}

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
};

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
      const { data: serverUser } = await axiosInstance.get(
        `/objects/${user.id}`
      );

      const updatedData = {
        name: nameInput.value,
        data: {
          ...(serverUser?.data || {}),
          email: emailInput.value,
        },
      };

      const { data: userData } = await axiosInstance.put(
        `/objects/${user.id}`,
        updatedData
      );

      if (userData?.data?.password) {
        delete userData.data.password;
      }

      user = userData;
      localStorage.setItem("user", JSON.stringify(userData));

      profileName.textContent = userData.name || "";
      profileEmail.textContent = userData.data?.email || "";

      formView.hidden = true;
      profileView.hidden = false;
      editBtn.hidden = false;
      logoutBtn.hidden = false;
    } catch (error) {
      alert("Error al guardar cambios: " + error.message);
    }
  });
}
