// Auth configuration - hashed passwords (SHA-256)
// Admin: manages the site, can change passwords
// User: shared password for all paying customers
// Change these by updating the hashes below

const AUTH_CONFIG = {
  // Admin master password hash
  adminHash: "9ad17b34f1d1ad383dfde1a6085fd6876248eba20fdad1c5fec8cb8f7d747ec1",
  // Shared user password hash (default: "071528")
  userHash: "b8ac404613e97553f0fadc39a2266c4870a9e77dc016b411974efba9a6d3cda8",
  // Current shared password plaintext (only admin can see this)
  sharedPassword: "071528"
};

// Hash a string with SHA-256
async function sha256(str) {
  const buf = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,"0")).join("");
}

// Verify a password
async function verifyPassword(input, storedHash) {
  const inputHash = await sha256(input);
  return inputHash === storedHash;
}
