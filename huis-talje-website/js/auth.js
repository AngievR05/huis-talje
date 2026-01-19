/* ==========================================
   AUTH (FRONT-END DEMO) — localStorage
   ========================================== */

const KEY_USERS = "ht_users";
const KEY_SESSION = "ht_session";

const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const panelLogin = document.getElementById("panel-login");
const panelSignup = document.getElementById("panel-signup");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginMsg = document.getElementById("loginMsg");
const signupMsg = document.getElementById("signupMsg");

const logoutBtn = document.getElementById("logoutBtn");

function readUsers() {
  try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

function setSession(email) {
  localStorage.setItem(KEY_SESSION, JSON.stringify({
    email,
    lastLoginISO: new Date().toISOString()
  }));
}

function clearSession() {
  localStorage.removeItem(KEY_SESSION);
}

function setTab(which) {
  const isLogin = which === "login";

  tabLogin.classList.toggle("active", isLogin);
  tabSignup.classList.toggle("active", !isLogin);

  tabLogin.setAttribute("aria-selected", String(isLogin));
  tabSignup.setAttribute("aria-selected", String(!isLogin));

  panelLogin.classList.toggle("active", isLogin);
  panelSignup.classList.toggle("active", !isLogin);

  loginMsg.textContent = "";
  signupMsg.textContent = "";
}

document.querySelectorAll("[data-switch]").forEach(btn => {
  btn.addEventListener("click", () => setTab(btn.dataset.switch));
});

tabLogin.addEventListener("click", () => setTab("login"));
tabSignup.addEventListener("click", () => setTab("signup"));

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signupMsg.textContent = "";

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("confirmPassword").value;
  const phone = document.getElementById("phone").value.trim();

  if (!firstName || !lastName || !email || !password) {
    signupMsg.textContent = "Please fill in all required fields.";
    return;
  }
  if (password.length < 6) {
    signupMsg.textContent = "Password must be at least 6 characters.";
    return;
  }
  if (password !== confirm) {
    signupMsg.textContent = "Passwords do not match.";
    return;
  }

  const users = readUsers();
  const exists = users.some(u => u.email === email);
  if (exists) {
    signupMsg.textContent = "Account already exists. Please log in.";
    setTab("login");
    return;
  }

  // Minimal profile data the profile page can use
  users.push({
    email,
    password, // front-end demo only (don’t do this in real apps)
    firstName,
    lastName,
    phone,
    createdISO: new Date().toISOString(),
    totalDonated: 0,
    volunteerHours: 0,
    eventsAttended: 0
  });

  saveUsers(users);
  setSession(email);

  signupMsg.textContent = "Account created! Redirecting to Profile...";
  setTimeout(() => {
    window.location.href = "profile.html";
  }, 600);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginMsg.textContent = "";

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    loginMsg.textContent = "Incorrect email or password.";
    return;
  }

  setSession(email);
  loginMsg.textContent = "Logged in! Redirecting to Profile...";
  setTimeout(() => {
    window.location.href = "profile.html";
  }, 500);
});

logoutBtn.addEventListener("click", () => {
  clearSession();
  alert("Logged out.");
});
