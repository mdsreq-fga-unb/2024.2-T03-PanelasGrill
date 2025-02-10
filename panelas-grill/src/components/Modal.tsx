import React from "react";

interface HistoricoItem {
    _id: string;
    produto: string | { item: string };
    tipo: string;
    quantidade?: number;
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden m-4 relative flex flex-col">
                <div className="sticky top-0 bg-white z-50 flex justify-between items-center  p-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {items.map(item => (
                        <div key={item._id} className="p-4 border rounded-lg bg-gray-50">
                            <p><strong>Produto:</strong> {typeof item.produto === 'string' ? item.produto : item.produto?.item ?? 'N/A'}</p>
                            <p><strong>Tipo:</strong> {item.tipo}</p>
                            <p><strong>Quantidade:</strong> {item.quantidade !== undefined ? item.quantidade : 'N/A'}</p>
                            <p><strong>Data:</strong> {new Date(item.data).toLocaleString('pt-BR', {
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit', 
                                hour12: false 
                            })}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
