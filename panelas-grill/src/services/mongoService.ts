// src/services/mongoServices.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function consultarEstoque() {
    const response = await fetch(`${API_URL}/consultar`);
    const data = await response.json();
    return data;
}

export async function inserirNoEstoque(documents: any[]) {
    const response = await fetch(`${API_URL}/inserir`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(documents),
    });
    const data = await response.json();
    return data;
}
