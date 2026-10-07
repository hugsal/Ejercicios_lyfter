function requireAuth(redirectUrl = "./unauthorized.html") {
  try {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  } catch (error) {
    alert(error.message);
    return false;
  }
}

function logout(redirectUrl = "./index.html") {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = redirectUrl;
}

function setupLogoutListener(buttonId = "log-out-btn") {
  const btn = document.getElementById(buttonId);
  if (btn) {
    btn.addEventListener("click", () => logout());
  }
}
