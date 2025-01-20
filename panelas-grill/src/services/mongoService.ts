// src/services/mongoServices.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function consultarEstoque() {
    const response = await fetch(`${API_URL}/consultar`);
    const data = await response.json();
    return data;
}
export async function inserirNoEstoque(documents: any[]) {
    console.log("Documentos enviados:", documents);
    const response = await fetch(`${API_URL}/inserir`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(documents),
    });
    const data = await response.json();
    console.log("Resposta da API:", data);
    return data;
}
export async function atualizarEstoque(document: any) {
    console.log("Documento a ser atualizado:", document);
    const response = await fetch(`${API_URL}/editar/${document._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
    });
    const data = await response.json();
    console.log("Resposta da API:", data);
    return data;
}