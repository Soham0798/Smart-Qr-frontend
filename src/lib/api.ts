const API ="https://smart-qr-backend-production.up.railway.app"

export async function signup(username: string, password: string) {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function login(username: string, password: string) {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  return res.json();
}

export async function getBuses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buses/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to fetch buses:", errorText);
    throw new Error("Failed to fetch buses");
  }

  return res.json();
}


export async function createBooking(token: string, body: { bus_id: number; source: string; destination: string; }) {
  const res = await fetch(`${API}/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getBooking(token: string, id: number) {
  const res = await fetch(`${API}/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}


