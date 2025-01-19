"use client";

import Sidebar from "@/components/Sidebar";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { consultarEstoque, inserirNoEstoque } from "@/services/mongoService";

export default function Estoque() {
    const [showInput, setShowInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [estoque, setEstoque] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controlar a exibição do modal
    const [novoItem, setNovoItem] = useState({
        item: "",
        tipo: "",
        quantidade: 0,
        referencia_quantidade: "kg",
    });

    // Função para carregar os dados
    const carregarEstoque = async () => {
        try {
            const data = await consultarEstoque();
            if (data.status === "success") {
                setEstoque(data.data);
            } else {
                alert(`Erro ao carregar estoque: ${data.message}`);
            }
        } catch (error) {
            console.error("Erro ao carregar estoque:", error);
            alert("Erro ao carregar estoque. Verifique o console.");
        }
    };

    // Carregar dados ao montar o componente
    useEffect(() => {
        carregarEstoque();
    }, []);

    // Função para adicionar itens ao estoque
    const adicionarItem = async () => {
        try {
            const resultado = await inserirNoEstoque([novoItem]);
            if (resultado.status === "success") {
                alert("Itens adicionados com sucesso!");
                carregarEstoque(); // Atualiza a tabela após inserção
                setShowModal(false); // Fecha o modal após a inserção
                setNovoItem({
                    item: "",
                    tipo: "",
                    quantidade: 0,
                    referencia_quantidade: "kg",
                }); // Limpa o formulário
            } else {
                alert(`Erro ao adicionar itens: ${resultado.message}`);
            }
        } catch (error) {
            console.error("Erro ao adicionar itens:", error);
            alert("Erro ao adicionar itens no estoque. Por favor, tente novamente.");
        }
    };

    // Função para atualizar os campos do formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNovoItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Filtrar os itens do estoque com base na busca
    const estoqueFiltrado = estoque.filter((item) =>
        item.item.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="bg-primary-gray h-screen flex">
            <Sidebar />

            <div className="flex-1 bg-white flex flex-col">
                <header className="flex justify-between items-center p-6 border-b border-[#E8E8E8] bg-white">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Estoque</h2>
                        <h3 className="text-xl text-gray-600">Itens em estoque!</h3>
                    </div>

                    <div className="flex items-center space-x-6 mr-10 relative">
                        <button
                            onClick={() => setShowModal(true)}  // Abre o modal ao clicar
                            className="p-4 bg-primary-orange text-white text-xl font-poppins rounded-2xl border-2 border-[#3C3C3C]"
                        >
                            INSERIR INSUMO
                        </button>
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
                <main className="flex-1 p-6 bg-primary-gray text-black">
                    <h3 className="text-xl font-semibold mb-4">Lista de Itens</h3>
                    <table className="table-auto w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 text-left border-b">Item</th>
                                <th className="p-4 text-left border-b">Tipo</th>
                                <th className="p-4 text-left border-b">Quantidade</th>
                                <th className="p-4 text-left border-b">Referência</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estoqueFiltrado.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-4 border-b">{item.item}</td>
                                    <td className="p-4 border-b">{item.tipo}</td>
                                    <td className="p-4 border-b">{item.quantidade}</td>
                                    <td className="p-4 border-b">{item.referencia_quantidade}</td>
                                </tr>
                            ))}
                            {estoqueFiltrado.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center p-4">
                                        Nenhum item encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>

            {/* Modal de Inserção de Item */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h1 className="text-2xl font-semibold mb-4 text-black ">Adicionar Insumo</h1>
                        <div className="space-y-4 text-black">
                            <input
                                type="text"
                                name="item"
                                value={novoItem.item}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Nome do item"
                            />
                            <select
                                name="tipo"
                                value={novoItem.tipo}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="carne">Carne</option>
                                <option value="grão">Grão</option>
                                <option value="verdura">Verdura</option>
                                <option value="fruta">Fruta</option>
                                <option value="processado">Processado</option>
                                <option value="bebida">Bebida</option>
                                <option value="tempero">tempero</option>
                                <option value="óleo e gordura">Óleo e Gordura</option>
                            </select>
                            <input
                                type="number"
                                name="quantidade"
                                value={novoItem.quantidade}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Quantidade"
                            />
                            <select
                                name="referencia_quantidade"
                                value={novoItem.referencia_quantidade}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="kg">unidade</option>
                                <option value="g">Kg</option>
                                <option value="litros">Litros</option>
                                <option value="gramas">gramas</option>
                                {/* Adicione outras opções conforme necessário */}
                            </select>
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)} // Fecha o modal
                                className="px-4 py-2 bg-gray-300 text-black rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={adicionarItem}
                                className="px-4 py-2 bg-primary-orange text-white rounded-md"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
