// src/services/mongoServices.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
import type { NextApiRequest, NextApiResponse } from 'next';

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
export async function excluirEstoque(item_id:string) {
    const response = await fetch(`${API_URL}/excluir/${item_id}`, {
    method: "DELETE",
     });
    const data = await response.json()
    console.log("Resposta da API:", data);
     return data;
   }
export async function criarCardapio(cardapio:any) {
     const response = await fetch(`${API_URL}/cardapio`, {
         method: "POST",
         headers: {
              "Content-Type": "application/json",
           },
           body: JSON.stringify(cardapio),
        });
        const data = await response.json();
        return data;
    }
export async function consultarCardapio() {
   const response = await fetch(`${API_URL}/cardapio`);
   const data = await response.json();
   return data;
   }
 export async function editarCardapio(cardapio:any) {
      const response = await fetch(`${API_URL}/cardapio/${cardapio._id}`, {
           method: "PUT",
           headers: {
                "Content-Type": "application/json",
                },
           body: JSON.stringify(cardapio)
      });
      const data = await response.json();
      return data;
     }
     export async function prepararCardapio(cardapio_id: string, quantidade_pratos: number) {
        const encodedCardapioId = encodeURIComponent(cardapio_id);
        const response = await fetch(`${API_URL}/cardapio/preparar/${encodedCardapioId}?quantidade_pratos=${quantidade_pratos}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Erro ao preparar o cardápio');
        }
        const data = await response.json();
        return data;
    }

    export async function excluirCardapio(cardapio_id: string) {
        try {
            const response = await fetch(`${API_URL}/cardapio/${cardapio_id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Resposta da API:", data);
            return data;
        } catch (error) {
            console.error("Erro ao excluir cardápio:", error);
            throw error;
        }
    }
    export async function consultarHistorico() {
        try {
            const response = await fetch(`${API_URL}/transacoes`);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Resposta da API:", data);
            return data;
        } catch (error) {
            console.error("Erro ao consultar histórico:", error);
            throw error;
        }
    }
    