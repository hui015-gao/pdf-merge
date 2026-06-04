// Auth Guard - Simple password version
// Checks sessionStorage for authenticated state

(function() {
  const authed = sessionStorage.getItem("authed");
  const role = sessionStorage.getItem("role");
  const cp = window.location.pathname.split("/").pop();

  // Public pages
  if (cp === "login.html" || cp === "") return;
  // Admin-only pages
  if (cp === "admin.html" && role !== "admin") {
    window.location.href = "login.html?admin=1";
    return;
  }

  if (!authed) {
    window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.href);
    return;
  }

  window.__currentUser = { role: role || "user" };
  document.body.classList.add("auth-ready");
})();

function isAdmin() { return window.__currentUser && window.__currentUser.role === "admin"; }
