// Auth Guard - checks if user is logged in and authorized
// Include this script BEFORE </head> in every protected page

// Firebase SDKs (loaded via CDN in HTML)
// Check auth state
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    // Not logged in - redirect to login
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    if (currentPage !== "login.html") {
      window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.href);
    }
    return;
  }

  // Check if user exists in Firestore and is active
  try {
    const doc = await db.collection("users").doc(user.uid).get();
    if (!doc.exists) {
      // User authenticated but not in our system
      await auth.signOut();
      window.location.href = "login.html?error=not_authorized";
      return;
    }

    const userData = doc.data();
    if (userData.status !== "active") {
      await auth.signOut();
      window.location.href = "login.html?error=disabled";
      return;
    }

    // User is authorized - set global vars
    window.__currentUser = { uid: user.uid, email: user.email, role: userData.role, ...userData };
    document.body.classList.add("auth-ready");

  } catch (err) {
    console.error("Auth check failed:", err);
    window.location.href = "login.html?error=auth_failed";
  }
});

// Helper: check if current user is admin
function isAdmin() {
  return window.__currentUser && window.__currentUser.role === "admin";
}

// Helper: require admin for this page
async function requireAdmin() {
  return new Promise((resolve) => {
    const check = setInterval(() => {
      if (window.__currentUser) {
        clearInterval(check);
        if (window.__currentUser.role !== "admin") {
          alert("需要管理员权限");
          window.location.href = "index.html";
        }
        resolve(window.__currentUser.role === "admin");
      }
    }, 100);
  });
}
