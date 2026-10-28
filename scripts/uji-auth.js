
import assert from "node:assert/strict";

const BASE_URL = "http://127.0.0.1:3000";

async function request(path, token) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers,
  });

  let body;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  return { status: response.status, body };
}

async function main() {
  console.log("Mulai pengujian autentikasi Chapter 8...\n");

  // 1. API harus aktif.
  const health = await request("/api/health");
  assert.equal(health.status, 200, "Health API harus merespons 200");
  console.log("LULUS: API aktif");

  // 2. Endpoint identitas tidak boleh diakses tanpa token.
  const tanpaToken = await request("/api/auth/saya");
  assert.equal(
    tanpaToken.status,
    401,
    "Endpoint identitas harus menolak request tanpa token",
  );
  console.log("LULUS: Request tanpa token ditolak");

  // 3. Token palsu harus ditolak.
  const tokenPalsu = await request(
    "/api/auth/saya",
    "token-palsu-tidak-valid",
  );
  assert.equal(
    tokenPalsu.status,
    401,
    "Token palsu harus ditolak",
  );
  console.log("LULUS: Token palsu ditolak");

  // 4. Daftar pesanan juga wajib memakai autentikasi.
  const pesananTanpaToken = await request("/api/pesanan");
  assert.equal(
    pesananTanpaToken.status,
    401,
    "Daftar pesanan harus menolak request tanpa token",
  );
  console.log("LULUS: Daftar pesanan tanpa token ditolak");

  console.log("\nSemua 4 pengujian autentikasi lulus.");
}

main().catch((error) => {
  console.error("\nPENGUJIAN GAGAL:", error.message);
  process.exitCode = 1;
});
