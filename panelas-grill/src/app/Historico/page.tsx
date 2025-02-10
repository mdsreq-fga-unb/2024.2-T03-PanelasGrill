"use client";

import Sidebar from "@/components/Sidebar";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { consultarHistorico } from "@/services/mongoService";

interface HistoricoItem {
    _id: string;
    produto: string | { item: string; quantidade?: number; referencia_quantidade?: string }; // Ajustado para lidar com string e objeto
    tipo: string;
    quantidade?: number; // Tornado opcional
    data: string;
}

export default function Historico() {
    const { status } = useSession();
    const router = useRouter();

    const [showInput, setShowInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [historico, setHistorico] = useState<HistoricoItem[]>([]);
    const [selectedType, setSelectedType] = useState<string>(""); // Estado para tipo selecionado
    const [startDate, setStartDate] = useState<string>(""); // Estado para data inicial
    const [endDate, setEndDate] = useState<string>(""); // Estado para data final

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/Login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchHistorico = async () => {
            const { status, data } = await consultarHistorico();
            if (status === "success") {
                console.log("Fetched Data:", data); // Log dos dados buscados
                setHistorico(data);
            }
        };

        fetchHistorico();
    }, []);

    // Ordena o array de histórico por data em ordem decrescente
    const sortedHistorico = historico.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    const filteredHistorico = sortedHistorico.filter(item => {
        const matchesSearch = searchValue
            ? (typeof item.produto === 'string' ? item.produto : item.produto?.item).toLowerCase().includes(searchValue.toLowerCase()) ||
              item.tipo.toLowerCase().includes(searchValue.toLowerCase()) ||
              new Date(item.data).toLocaleString('pt-BR', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  hour12: false 
              }).includes(searchValue)
            : true;

        const matchesType = selectedType ? item.tipo === selectedType : true;

        // Lógica de filtragem de data
        const itemDate = new Date(item.data);
        const isWithinDateRange = (!startDate || itemDate >= new Date(startDate)) && (!endDate || itemDate <= new Date(endDate));

        return matchesSearch && matchesType && isWithinDateRange;
    });

    if (status === "loading") {
        return <div>Carregando...</div>;
    }

    return (
        <div className="bg-primary-gray h-screen flex">
            <Sidebar />

            <div className="flex-1 bg-white flex flex-col pl-72 ml-3">
                <header className="flex justify-between items-center p-6 border-b border-[#E8E8E8] bg-white">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Histórico</h2>
                        <h3 className="text-xl text-gray-600">Histórico de alterações do estoque!</h3>
                    </div>
                    <button
                        onClick={() => router.push("/Registro")}
                        className="p-4 bg-primary-orange flex flex-row text-white text-xl font-poppins rounded-2xl border-2 text-center justify-center"
                    >
                        Ir para Relatórios
                    </button>
                </header>

                <main className="flex-1 p-6 bg-gray-100 text-black">
                    <div className="flex justify-left p-6 text-black">
                        <div className="mx-5">
                            <label htmlFor="tipo" className="mr-2 text-xl ">Filtrar por Tipo:</label>
                            <select
                                id="tipo"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="border rounded-md p-2 text-black bg-primary-gray"
                            >
                                <option value="">Todos</option>
                                <option value="entrada">Entrada</option>
                                <option value="saida">Saída</option>
                                <option value="atualizacao">Atualização</option>
                                <option value="inclusao_cardapio">Inclusão de Cardápio</option>
                                <option value="exclusao_cardapio">Exclusão de Cardápio</option>
                                <option value="entrada_produto">Entrada Registro</option>
                                <option value="saida_produto">Saída Registro</option>
                                <option value="criacao_cardapio">Criação de Cardápio</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="startDate" className="mr-2 text-xl">Data Inicial:</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border rounded-md p-2 text-black bg-primary-gray"
                            />
                        </div>
                        <div className="mx-5">
                            <label htmlFor="endDate" className="mr-2 text-xl">Data Final:</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border rounded-md p-2 text-black bg-primary-gray"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {filteredHistorico.map(item => {
                            // Acessa os campos corretamente
                            const produto = typeof item.produto === 'object' ? item.produto.item : item.produto || 'Sem nome';
                            const quantidade = typeof item.produto === 'object' ? item.produto.quantidade : item.quantidade; // Acesso correto à quantidade

                            return (
                                <div key={item._id} className="p-4 border rounded-lg bg-white shadow-sm">
                                    <p><strong>Produto:</strong> {produto}</p>
                                    <p><strong>Tipo:</strong> {item.tipo}</p>
                                    <p><strong>Quantidade:</strong> {quantidade !== undefined ? quantidade : 'N/A'}</p> {/* Verifica se é undefined */}
                                    <p><strong>Data:</strong> {new Date(item.data).toLocaleString('pt-BR', { 
                                        day: '2-digit', 
                                        month: '2-digit', 
                                        year: 'numeric', 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        hour12: false 
                                    })}</p>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}