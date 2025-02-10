"use client";

import Sidebar from "@/components/Sidebar";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Estoque from "@/assets/estoque.jpg";
import Registros from "@/assets/Registros.jpg";
import Cardapio from "@/assets/Cardapio.jpg";
import Historico from "@/assets/historico.jpg";


export default function Menu() {
    const { status } = useSession();
    const router = useRouter();
    
    const [showInput, setShowInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/Login");
        }
    }, [status, router]);
    
    if (status === "loading") {
        return <div>Carregando...</div>;
    }
    
    return (
        <div className="bg-primary-gray h-screen flex">
            <Sidebar />

            <div className="flex-1 bg-white flex flex-col pl-72 ml-3">
                <header className="flex justify-between items-center p-6 border-b border-[#E8E8E8] bg-white">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Menu principal</h2>
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
                                className="absolute top-full right-0 mt-2 w-64 p-2 border rounded-xl text-black border-gray-300 focus:outline-none focus:ring focus:ring-primary-orange transition-transform duration-300 ease-in-out"
                                placeholder="Digite para buscar..."
                            />
                        )}
                    </div>
                </header>

                <main className="flex-1 p-6 bg-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Estoque", description: "Gerencie seu estoque.", img: Estoque },
                            { title: "Registros", description: "Fazer um novo registro.", img: Registros },
                            { title: "Cardápio", description: "Gerencie seus cardápios.", img: Cardapio },
                            { title: "Histórico", description: "Veja seu histórico.", img: Historico },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                                <Image alt={`Imagem de ${item.title}`} className="w-full h-40 object-cover rounded-t-lg" src={item.img} width="600" height="400" />
                                <h3 className="text-xl font-bold mt-4 text-black">{item.title}</h3>
                                <p className="text-gray-600 mt-2">{item.description}</p>
                                <button className="mt-4 bg-primary-orange text-white py-2 px-4 rounded hover:bg-secondary-gray">Acessar</button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
