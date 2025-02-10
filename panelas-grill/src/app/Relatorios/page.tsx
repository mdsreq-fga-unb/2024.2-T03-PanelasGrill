"use client";

import Sidebar from "@/components/Sidebar";
import { Search, Eye } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { consultarEstoque, consultarCardapio, inserirNoEstoque } from "@/services/mongoService"; // Importe inserirNoEstoque

interface IngredienteModel {
    item_estoque_id: string;
    quantidade: number;
    referencia_quantidade: string;
}

interface ItemParaInserir { // Defina a interface
    item: string;
    tipo: string;
    quantidade: number;
    referencia_quantidade: string;
}


export default function Menu() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [showInput, setShowInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [reportType, setReportType] = useState<string | null>(null);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [proportionType, setProportionType] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [showRelatoriosSection, setShowRelatoriosSection] = useState(false); // Corrigido o nome da variavel
    const [estoque, setEstoque] = useState<any[]>([]); // Estado para armazenar o estoque
    const [cardapios, setCardapios] = useState<any[]>([]); // Estado para armazenar os cardápios
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const [showInsumos, setShowInsumos] = useState(false);
    const [selectedCardapioInsumos, setSelectedCardapioInsumos] = useState<any[]>([]);
    const [showIngredientesModal, setShowIngredientesModal] = useState(false);
    const [selectedIngredientes, setSelectedIngredientes] = useState<IngredienteModel[]>([]);
    const [showError, setShowError] = useState(false);
    
    const [quantidades, setQuantidades] = useState<{ [key: string]: number }>({}); // Estado para armazenar as quantidades
    // Definindo os fluxos de etapas
    const stepsSaida = [
        "Tipo de Relatório",
        "Seleção de Cardápio",
        "Quantidade de Pessoas",
        "Definição de Proporções",
        "Finalização"
    ];

    const stepsEntrada = [
        "Tipo de Relatório",
        "Seleção de Cardápio",
        "Quantidade de Insumos",
        "Finalização"
    ];

    const steps = reportType === "saida" ? stepsSaida : stepsEntrada;

    // Função para carregar o estoque e os cardápios
    const carregarDados = async () => {
        setLoading(true);
        try {
            const estoqueData = await consultarEstoque();
            const cardapiosData = await consultarCardapio();

            if (estoqueData.status === "success") {
                setEstoque(estoqueData.data);
            } else {
                alert(`Erro ao carregar estoque: ${estoqueData.message}`);
            }

            if (cardapiosData.status === "success") {
                setCardapios(cardapiosData.data);
            } else {
                alert(`Erro ao carregar cardápios: ${cardapiosData.message}`);
            }
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            alert("Erro ao carregar dados. Verifique o console.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/Login");
        } else if (status === "authenticated") {
            setShowRelatoriosSection(true); // Use o nome correto da variavel
        }
    }, [status, router]);

    // Carrega os dados quando o componente é montado ou quando o usuário avança para a etapa de seleção de cardápio
    useEffect(() => {
        if (currentStep === 1) {
            carregarDados();
        }
    }, [currentStep]);

    if (status === "loading") {
        return <div>Carregando...</div>;
    }
    const handleShowInsumos = (cardapioId: string) => {
        const insumosRelacionados = estoque.filter(item =>
            cardapios.find(cardapio => cardapio._id === cardapioId)?.ingredientes.includes(item._id)
        );
        setSelectedCardapioInsumos(insumosRelacionados);
        setShowInsumos(true);
    };
    const handleShowIngredientes = (cardapio: any) => {
        if (cardapio && cardapio.ingredientes) {
            setSelectedIngredientes(cardapio.ingredientes);
            setShowIngredientesModal(true);
        } else {
            alert("Este cardápio não possui ingredientes.");
        }
    };
    const handleStepClick = (stepIndex: number) => {
        setCurrentStep(stepIndex);
    };

    const handleReportTypeClick = (type: string) => {
        setReportType(type);
        setCurrentStep(1); // Avança para a próxima etapa
    };

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
        setCurrentStep(2); // Avança para a próxima etapa
    };

    const handleProportionClick = (type: string) => {
        setProportionType(type);
        if (type === "manual") {
            setQuantity(null); // Resetar a quantidade se o usuário escolher "Inserir manualmente"
        }
    };
    const handleAdvance = () => {
        if (proportionType !== null) {
            setCurrentStep(3); // Avança para a próxima etapa
        }
    };
    const handleQuantityClick = (qty: number) => {
        setQuantity(qty);
        setCurrentStep(reportType === "saida" ? 4 : 3); // Avança para a etapa correta dependendo do fluxo
    };

    const resetSteps = () => {
        setCurrentStep(0);
        setReportType(null);
        setSelectedMenu(null);
        setProportionType(null);
        setQuantity(null);
    };

    const handleFinalizarRegistroEntrada = async () => {
        const cardapioSelecionado = cardapios.find(cardapio => cardapio._id === selectedMenu);

        if (!cardapioSelecionado) {
            alert("Cardápio não encontrado.");
            return;
        }

        const documentosParaInserir = cardapioSelecionado.ingredientes.map((ingrediente: IngredienteModel) => {
            const itemEstoque = estoque.find(item => item._id === ingrediente.item_estoque_id);

            if (!itemEstoque) {
                console.warn(`Item de estoque com ID ${ingrediente.item_estoque_id} não encontrado no estoque.`);
                return null; // Ignora este ingrediente
            }

            const quantidadeAdicional = quantidades[ingrediente.item_estoque_id] || 0;
              // Validar se a quantidade em estoque é suficiente para remover
              if (itemEstoque.quantidade + quantidadeAdicional < 0) {
                alert(`Quantidade insuficiente de ${itemEstoque.item} em estoque.`);
                return null;
            }

            return {
                item: itemEstoque.item,
                tipo: itemEstoque.tipo,
                quantidade: itemEstoque.quantidade + quantidadeAdicional,
                referencia_quantidade: itemEstoque.referencia_quantidade,
            };
        }).filter((doc: any): doc is ItemParaInserir => doc !== null); // Filtra ingredientes ignorados
    
        if (documentosParaInserir.length === 0) {
            alert("Nenhum item para adicionar ao estoque.");
            return;
        }

        try {
            const resultado = await inserirNoEstoque(documentosParaInserir);

            if (resultado.status === "success") {
                alert("Insumos adicionados do estoque com sucesso!");
                resetSteps();
                // Recarrega o estoque para refletir as mudanças
                carregarDados();
            } else {
                alert(`Erro ao adicionar/remover insumos ao estoque: ${resultado.message}`);
            }
        } catch (error) {
            console.error("Erro ao inserir no estoque:", error);
            alert("Erro ao inserir no estoque. Verifique o console.");
        }
    };
    const handleFinalizarRegistroSaida = async () => {
        const cardapioSelecionado = cardapios.find(cardapio => cardapio._id === selectedMenu);

        if (!cardapioSelecionado) {
            alert("Cardápio não encontrado.");
            return;
        }

        const documentosParaRemover = cardapioSelecionado.ingredientes.map((ingrediente: IngredienteModel) => {
            const itemEstoque = estoque.find(item => item._id === ingrediente.item_estoque_id);

            if (!itemEstoque) {
                console.warn(`Item de estoque com ID ${ingrediente.item_estoque_id} não encontrado no estoque.`);
                return null; // Ignora este ingrediente
            }

            // Use a quantidade do estado 'quantidades' se estiver disponível,
            // senão, use a quantidade original do cardápio
            const quantidadeARemover = quantidades[ingrediente.item_estoque_id] !== undefined
                ? quantidades[ingrediente.item_estoque_id]  // Usa a quantidade alterada
                : (reportType === 'saida' ? ingrediente.quantidade * (quantity || 1) : ingrediente.quantidade);  // Usa a quantidade original

            // Validar se a quantidade em estoque é suficiente para remover
            if (itemEstoque.quantidade < quantidadeARemover) {
                alert(`Quantidade insuficiente de ${itemEstoque.item} em estoque.`);
                return null;
            }

            return {
                item: itemEstoque.item,
                tipo: itemEstoque.tipo,
                quantidade: itemEstoque.quantidade - quantidadeARemover,
                referencia_quantidade: itemEstoque.referencia_quantidade,
            };
        }).filter((doc: any): doc is ItemParaInserir => doc !== null);

        if (documentosParaRemover.length === 0) {
            alert("Nenhum item para remover do estoque.");
            return;
        }

        try {
            const resultado = await inserirNoEstoque(documentosParaRemover);

            if (resultado.status === "success") {
                alert("Insumos removidos do estoque com sucesso!");
                resetSteps();
                carregarDados();
            } else {
                alert(`Erro ao remover insumos do estoque: ${resultado.message}`);
            }
        } catch (error) {
            console.error("Erro ao remover do estoque:", error);
            alert("Erro ao remover do estoque. Verifique o console.");
        }
    };

    return (
        <div className="bg-primary-gray h-screen flex">
            <Sidebar />

            <div className="flex-1 bg-white flex flex-col pl-72 ml-3">
                <header className="flex justify-between items-center p-6 border-b border-[#E8E8E8] bg-white ">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Registros Diários</h2>
                        <h3 className="text-xl text-gray-600">Registrar relatório de saída ou de entrada de insumos!</h3>
                    </div>
                </header>

                {/* Conteúdo principal */}
                <main className="flex-1 p-6 bg-primary-gray">
                    <div className="flex justify-center mt-4">
                        <div className="flex space-x-4">
                            {currentStep === 0 ? (
                                <button
                                    className="px-4 py-2 rounded-lg bg-primary-orange text-white"
                                >
                                    {steps[0]}
                                </button>
                            ) : (
                                steps.map((step, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleStepClick(index)}
                                        className={`px-4 py-2 rounded-lg ${currentStep === index
                                                ? "bg-primary-orange text-white"
                                                : "bg-secondary-gray text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {step}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {currentStep === 0 && (
                        <div className="mb-4 mt-4">
                            <p className="text-gray-700 font-semibold text-3xl font-poppins">Que tipo de registro você deseja fazer?</p>
                            <div className="flex space-x-7 py-6 text-xl font-poppins">
                                <button onClick={() => handleReportTypeClick("entrada")} className="bg-white text-gray-700 px-4 py-2 rounded-xl border-4 border-secondary-gray hover:bg-gray-200">Relatório de Entrada</button>
                                <button onClick={() => handleReportTypeClick("saida")} className="bg-white text-gray-700 px-4 py-2 rounded-xl border-4 border-secondary-gray hover:bg-gray-200">Relatório de Saída</button>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="mb-4 mt-4">
                            <div>
                            <p className="text-gray-700 font-semibold text-3xl font-poppins py-5">Qual cardápio deseja selecionar?</p>
                            
                            {/* Campo de busca com ícone de lupa */}
                            <div className="flex items-center mb-4">
                                <Search className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md text-black "
                                    placeholder="Filtrar cardápios..."
                                />
                            </div>
                            </div>
                            {loading ? (
                                <div className="text-center py-6">
                                    <p>Carregando cardápios...</p>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-4 py-6 text-xl font-poppins ">
                                    {cardapios.filter(cardapio => 
                                        cardapio.nome.toLowerCase().includes(searchValue.toLowerCase())
                                    ).map((cardapio) => (
                                        <div key={cardapio._id} className="w-full flex flex-row text-center justify-center px-5">
                                            <button
                                                onClick={() => handleMenuClick(cardapio._id)}
                                                className="bg-white text-gray-700 px-6 py-1 w-11/12 rounded-xl border-4 border-secondary-gray hover:bg-gray-200"
                                            >
                                                {cardapio.nome}
                                            </button>
                                            <button
                                                onClick={() => handleShowIngredientes(cardapio)} // Chama a nova função
                                                className="bg-primary-orange text-white px-6 py-1 w-1/12 rounded-xl border-4 border-secondary-gray hover:bg-gray-200 flex items-center justify-center"
                                            >
                                                <Eye />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {showIngredientesModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg w-96 shadow-lg transform transition-all duration-300 ease-in-out">
                                <h1 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Ingredientes do Cardápio</h1>
                                <ul className="space-y-3">
                                    {Array.isArray(selectedIngredientes) && selectedIngredientes.length > 0 ? (
                                        selectedIngredientes.map((ingrediente, index) => (
                                            <li key={index} className="flex items-center space-x-3">
                                                <span className="text-gray-600">•</span>
                                                <span className="text-gray-700">
                                                    Insumo: {estoque.find(item => item._id === ingrediente.item_estoque_id)?.item}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-600">Nenhum ingrediente encontrado.</li>
                                    )}
                                </ul>
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => setShowIngredientesModal(false)}
                                        className="px-6 py-2 bg-primary-orange text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && reportType === "saida" && (
                        <div className="mb-4 mt-4">
                            <p className="text-gray-700 font-semibold text-3xl font-poppins">
                                Quer fazer um lançamento para quantas pessoas?
                            </p>

                            {/* Opção 1: Selecionar a quantidade de pessoas */}
                            <div className="mt-6">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="proportionType"
                                        value="manual"
                                        checked={proportionType === "manual"}
                                        onChange={() => handleProportionClick("manual")}
                                        className="form-radio h-5 w-5 text-primary-orange"
                                    />
                                    <span className="text-gray-700 text-xl font-poppins">
                                        Selecionar a quantidade de pessoas
                                    </span>
                                </label>
                                {proportionType === "manual" && (
                                    <div className="mt-4 ml-8">
                                        <input
                                            type="number"
                                            value={quantity || ""}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            placeholder="Digite a quantidade"
                                            className="w-48 px-4 py-2 border-2 border-secondary-gray rounded-lg focus:outline-none focus:border-primary-orange text-black"
                                            min="1"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Opção 2: Não selecionar a quantidade de pessoas */}
                            <div className="mt-6">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        name="proportionType"
                                        value="noQuantity"
                                        checked={proportionType === "noQuantity"}
                                        onChange={() => handleProportionClick("noQuantity")}
                                        className="form-radio h-5 w-5 text-primary-orange "
                                    />
                                    <span className="text-gray-700 text-xl font-poppins">
                                        Não selecionar a quantidade de pessoas
                                    </span>
                                </label>
                            </div>

                            {/* Botão Avançar */}
                            <div className="mt-8">
                                <button
                                    onClick={handleAdvance}
                                    disabled={proportionType === null}
                                    className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${
                                        proportionType !== null
                                            ? "bg-primary-orange hover:bg-orange-600"
                                            : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Avançar
                                </button>
                            </div>
                        </div>
                    )}
                        {currentStep === 2 && reportType === "entrada" && (
                            <div className="mb-4 mt-4">
                                <p className="text-gray-700 font-semibold text-3xl font-poppins py-4">Selecione a quantidade de cada insumo de entrada:</p>

                                {/* Exibir o cardápio selecionado */}
                                {selectedMenu && (
                                    <div className="mt-4">
                                        <h4 className="text-xl font-semibold text-black">Cardápio Selecionado: {cardapios.find(cardapio => cardapio._id === selectedMenu)?.nome}</h4>
                                        <table className="w-3/5 bg-white border border-gray-300 mt-2">
                                            <thead>
                                                <tr className="bg-gray-100 text-black">
                                                    <th className="p-4 text-left border-b">Insumo</th>
                                                    <th className="p-4 text-left border-b">Referência</th>
                                                    <th className="p-4 text-left border-b">Quantidade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.map((ingrediente: IngredienteModel, index: number) => (
                                                    <tr key={index} className="hover:bg-gray-50 text-black">
                                                        <td className="p-4 border-b">
                                                            {estoque.find(item => item._id === ingrediente.item_estoque_id)?.item}
                                                        </td>
                                                        <td className="p-4 border-b">
                                                            {ingrediente.referencia_quantidade}
                                                        </td>
                                                        <td className="p-4 border-b">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                placeholder="Qtd"
                                                                className="w-24 p-2 border border-gray-300 rounded-md"
                                                                onChange={(e) => {
                                                                    const quantidade = Number(e.target.value);
                                                                    setQuantidades((prev) => ({
                                                                        ...prev,
                                                                        [ingrediente.item_estoque_id]: quantidade, // Armazena a quantidade no estado
                                                                    }));
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                                {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.length === 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="text-center p-4">Nenhum ingrediente encontrado.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Mensagem de erro */}
                                {showError && (
                                    <p className="text-red-500 mt-2">Por favor, preencha a quantidade de todos os insumos.</p>
                                )}

                                <div className="flex space-x-7 py-6 text-xl font-poppins">
                                    <button 
                                        onClick={() => {
                                            const allQuantitiesFilled = cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.every((ingrediente: IngredienteModel) => {
                                                return quantidades[ingrediente.item_estoque_id] >= 0; // Verifica se a quantidade está preenchida
                                            });

                                            if (allQuantitiesFilled) {
                                                handleQuantityClick(20);
                                            } else {
                                                setShowError(true); // Exibe a mensagem de erro
                                            }
                                        }} 
                                        className={`bg-primary-orange text-white px-4 py-2 rounded-xl border-4 border-white hover:bg-gray-200 ${showError ? "" : ""}`}
                                     >
                                        Avançar
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentStep === 3 && reportType === "saida" && (
                            <div className="mb-4 mt-4">
                                <p className="text-gray-700 font-semibold text-3xl font-poppins">Como deseja definir as proporções de insumos?</p>
                                {selectedMenu && (
                                    <div className="mt-4">
                                        <h4 className="text-xl font-semibold text-black">Cardápio Selecionado: {cardapios.find(cardapio => cardapio._id === selectedMenu)?.nome}</h4>
                                        <table className="w-3/5 bg-white border border-gray-300 mt-2">
                                            <thead>
                                                <tr className="bg-gray-100 text-black">
                                                    <th className="p-4 text-left border-b">Insumo</th>
                                                    <th className="p-4 text-left border-b">Referência</th>
                                                    <th className="p-4 text-left border-b">Quantidade</th>
                                                    <th className="p-4 text-left border-b">Alterar quantidade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.map((ingrediente: IngredienteModel, index: number) => (
                                                    <tr key={index} className="hover:bg-gray-50 text-black">
                                                        <td className="p-4 border-b">
                                                            {estoque.find(item => item._id === ingrediente.item_estoque_id)?.item}
                                                        </td>
                                                        <td className="p-4 border-b">
                                                            {ingrediente.referencia_quantidade}
                                                        </td>
                                                        <td className="p-4 border-b">
                                                            {ingrediente.quantidade * (quantity || 1)}
                                                        </td>
                                                        <td className="p-4 border-b">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                placeholder="Qtd"
                                                                className="w-24 p-2 border border-gray-300 rounded-md"
                                                                onChange={(e) => {
                                                                    const quantidade = Number(e.target.value);
                                                                    setQuantidades((prev) => ({
                                                                        ...prev,
                                                                        [ingrediente.item_estoque_id]: quantidade, // Armazena a quantidade no estado
                                                                    }));
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                                {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.length === 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="text-center p-4">Nenhum ingrediente encontrado.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <div className="flex space-x-7 py-6 text-xl font-poppins">
                                    <button onClick={() => {
                                        // Muda o passo atual para 4
                                        setCurrentStep(4);
                                    }} className="bg-white text-gray-700 px-4 py-2 rounded-xl border-4 border-secondary-gray hover:bg-gray-200">Avançar</button>
                                </div>
                            </div>
                        )}

                    {currentStep === 3 && reportType === "entrada" && (
                        

                        <div className="mt-6">
                        <p className="text-gray-700 font-semibold text-3xl font-poppins">Clique no botão abaixo para concluir o registro!</p>
                        <p className="font-poppins text-md text-black font-semibold mt-5">Ao clicar em "Realizar Registro", os insumos relacionados serão registrados no estoque. Certifique-se de que os itens estão sendo inseridos corretamente, pois esta ação não é reversível!</p>
                        {/* Exibir informações atualizadas */}
                        {selectedMenu && (
                            <div className="mt-4">
                                <h4 className="text-xl font-semibold text-black">Cardápio Selecionado: {cardapios.find(cardapio => cardapio._id === selectedMenu)?.nome}</h4>
                                <table className="w-3/5 bg-white border border-gray-300 mt-2">
                                    <thead>
                                        <tr className="bg-gray-100 text-black">
                                            <th className="p-4 text-left border-b">Insumo</th>
                                            <th className="p-4 text-left border-b">Referência</th>
                                            <th className="p-4 text-left border-b">Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.map((ingrediente: IngredienteModel, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50 text-black">
                                                <td className="p-4 border-b">
                                                    {estoque.find(item => item._id === ingrediente.item_estoque_id)?.item}
                                                </td>
                                                <td className="p-4 border-b">
                                                    {ingrediente.referencia_quantidade}
                                                </td>
                                                <td className="p-4 border-b">
                                                    {quantidades[ingrediente.item_estoque_id]}
                                                </td>
                                            </tr>
                                        ))}
                                        {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center p-4">Nenhum ingrediente encontrado.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <button 
                            onClick={handleFinalizarRegistroEntrada}
                            className="bg-[#21c900] text-white px-6 py-3 rounded-md shadow-md mt-4 hover:bg-orange-600"
                        >
                            Realizar Registro
                        </button>
                    </div>
                    )}

                    {currentStep === 4 && reportType === "saida" && (
                         <div className="mt-6">
                         <p className="text-gray-700 font-semibold text-3xl font-poppins">Clique no botão abaixo para concluir o registro!</p>
                         <p className="font-poppins text-md text-black font-semibold mt-5">Ao clicar em "Realizar Registro", os insumos relacionados serão registrados no estoque. Certifique-se de que os itens estão sendo inseridos corretamente, pois esta ação não é reversível!</p>
                         {/* Exibir informações atualizadas */}
                         {selectedMenu && (
                             <div className="mt-4">
                                 <h4 className="text-xl font-semibold text-black">Cardápio Selecionado: {cardapios.find(cardapio => cardapio._id === selectedMenu)?.nome}</h4>
                                 <table className="w-3/5 bg-white border border-gray-300 mt-2">
                                     <thead>
                                         <tr className="bg-gray-100 text-black">
                                             <th className="p-4 text-left border-b">Insumo</th>
                                             <th className="p-4 text-left border-b">Referência</th>
                                             <th className="p-4 text-left border-b">Quantidade</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.map((ingrediente: IngredienteModel, index: number) => (
                                             <tr key={index} className="hover:bg-gray-50 text-black">
                                                 <td className="p-4 border-b">
                                                     {estoque.find(item => item._id === ingrediente.item_estoque_id)?.item}
                                                 </td>
                                                 <td className="p-4 border-b">
                                                     {ingrediente.referencia_quantidade}
                                                 </td>
                                                 <td className="p-4 border-b">
                                                 {quantidades[ingrediente.item_estoque_id] || (ingrediente.quantidade * (quantity || 1))}
                                                 </td>
                                             </tr>
                                         ))}
                                         {cardapios.find(cardapio => cardapio._id === selectedMenu)?.ingredientes.length === 0 && (
                                             <tr>
                                                 <td colSpan={3} className="text-center p-4">Nenhum ingrediente encontrado.</td>
                                             </tr>
                                         )}
                                     </tbody>
                                 </table>
                             </div>
                         )}
                         <button
                             onClick={handleFinalizarRegistroSaida}
                             className="bg-[#21c900] text-white px-6 py-3 rounded-md shadow-md mt-4 hover:bg-orange-600"
                         >
                             Realizar Registro
                         </button>
                     </div>
                    )}
                </main>
            </div>
        </div>
    );
}