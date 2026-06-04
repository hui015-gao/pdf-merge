// Auth Guard - LeanCloud version
// Checks if user is logged in AND active

function checkAuth() {
  const user = AV.User.current();
  if (!user) {
    const cp = window.location.pathname.split("/").pop() || "index.html";
    if (cp !== "login.html" && cp !== "leancloud-setup.html") {
      window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.href);
    }
    return false;
  }

  const status = user.get("status") || "active";
  if (status !== "active") {
    AV.User.logOut();
    window.location.href = "login.html?error=disabled";
    return false;
  }

  window.__currentUser = {
    id: user.id,
    email: user.get("email") || user.get("username"),
    role: user.get("role") || "user",
  };
  document.body.classList.add("auth-ready");
  return true;
}

function isAdmin() {
  return window.__currentUser && window.__currentUser.role === "admin";
}

function requireAdmin() {
  if (!isAdmin()) {
    alert("需要管理员权限");
    window.location.href = "index.html";
    return false;
  }
  return true;
}

window.addEventListener("DOMContentLoaded", checkAuth);
