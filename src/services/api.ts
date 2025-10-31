// src/services/api.ts
const BASE_URL = "https://us-central1-integradora2-4b395.cloudfunctions.net/api";

export async function getPlantas() {
  const res = await fetch(`${BASE_URL}/PlantasGeneral`);
  return res.json();
}

interface Planta {
  nombre: string;
  tipo: string;
}

export async function addPlanta(token: string, data: Planta) {

  const res = await fetch(`${BASE_URL}/PlantasGeneral`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
