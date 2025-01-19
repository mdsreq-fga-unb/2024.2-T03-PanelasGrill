"use client";

import Sidebar from "@/components/Sidebar";
import {Search} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Menu() {
    const { data: session, status } = useSession();  // Usar useSession no topo
    const router = useRouter();
    
    const [showInput, setShowInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        if (status === "unauthenticated") {
          // Se o usuário não estiver autenticado, redireciona para a página de login
          router.push("/Login");
        }
      }, [status, router]);  // Colocar o useEffect para redirecionar fora da verificação de hooks
    
      if (status === "loading") {
        // Você pode exibir um carregando enquanto verifica a sessão
        return <div>Carregando...</div>;
      }
    return (
        <div className="bg-primary-gray h-screen flex">
            <Sidebar />

            <div className="flex-1 bg-white flex flex-col">
                <header className="flex justify-between items-center p-6 border-b border-[#E8E8E8] bg-white">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Cardápios</h2>
                        <h3 className="text-xl text-gray-600">Guia de acesso!</h3>
                    </div>

                    <div className="flex items-center space-x-6 mr-10 relative">
                        <button
                        className="p-4 border rounded-2xl border-[#3C3C3C] text-black hover:bg-gray-100"
                        onClick={() => setShowInput(!showInput)}
                        >
                        <Search />
                        </button>
                        {showInput && (
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={`absolute top-full right-0 mt-2 w-64 p-2 border rounded-xl text-black border-gray-300 focus:outline-none focus:ring focus:ring-primary-orange transition-transform duration-300 ease-in-out ${
                            showInput ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                            }`}
                            placeholder="Digite para buscar..."
                        />
                        )}
                    </div>
                </header>

                {/* Conteúdo principal */}
                <main className="flex-1 p-6 bg-primary-gray">
                    <p className="text-gray-700">Conteúdo do estoque!</p>
                </main>
            </div>
        </div>
    );
}
