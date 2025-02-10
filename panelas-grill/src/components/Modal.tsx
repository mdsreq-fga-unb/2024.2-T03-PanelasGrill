import React from "react";

interface HistoricoItem {
    _id: string;
    produto: string | { item: string; quantidade?: number; referencia_quantidade?: string };
    tipo: string;
    quantidade?: number;
    referencia_quantidade?: string; // Adicionado como opcional
    data: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    items: HistoricoItem[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, items }) => {
    if (!isOpen) return null;

    // Função para traduzir o tipo de transação
    const traduzirTipoTransacao = (tipo: string) => {
        switch (tipo) {
            case 'entrada_produto':
                return 'Entrada de Produto';
            case 'saida_produto':
                return 'Saída de Produto';
            case 'edicao_produto':
                return 'Edição de Produto';
            case 'inclusao_cardapio':
                return 'Inclusão de Cardápio';
            case 'preparacao_cardapio':
                return 'Preparação de Cardápio';
            default:
                return null; // Retorna null para transações desconhecidas
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden m-4 relative flex flex-col">
                <div className="sticky top-0 bg-white z-50 flex justify-between items-center p-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {items.map(item => {
                        // Acessa os campos corretamente
                        const produto = typeof item.produto === 'object' ? item.produto.item : item.produto || 'Sem nome';
                        const tipoTransacao = traduzirTipoTransacao(item.tipo); // Usa o tipo no nível superior

                        // Lógica para quantidade
                        const quantidade = typeof item.produto === 'object'
                            ? item.produto.quantidade || item.quantidade || 0
                            : item.quantidade || 0;

                        // Lógica para referência
                        const referencia = typeof item.produto === 'object'
                            ? item.produto.referencia_quantidade || item.referencia_quantidade || 'Sem referência'
                            : item.referencia_quantidade || 'Sem referência';

                        return (
                            <div key={item._id} className="p-4 border rounded-lg bg-gray-50 mb-4">
                                <p><strong>Produto:</strong> {produto}</p>
                                {tipoTransacao && ( // Renderiza apenas se tipoTransacao não for null
                                    <p><strong>Tipo de Transação:</strong> {tipoTransacao}</p>
                                )}
                                <p><strong>Quantidade:</strong> {quantidade} - {referencia}</p>
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
            </div>
        </div>
    );
};

export default Modal;