"use client";

import Sidebar from "@/components/Sidebar";
import { History } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { consultarHistorico } from "@/services/mongoService";

import Modal from "@/components/Modal"; // Import the Modal component

interface HistoricoItem {
    _id: string;
    produto: string | { item: string };
    tipo: string;
    quantidade: number;
    data: string;
}

export default function Historico() {
    const { status } = useSession();
    const router = useRouter();

    const [showInput, setShowInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [historico, setHistorico] = useState<HistoricoItem[]>([]);
    const [selectedType, setSelectedType] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [reportType, setReportType] = useState<"daily" | "monthly">("daily");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItems, setModalItems] = useState<HistoricoItem[]>([]);
    const [modalTitle, setModalTitle] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/Login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchHistorico = async () => {
            const { status, data } = await consultarHistorico();
            if (status === "success") {
                console.log("Fetched Data:", data);
                setHistorico(data);
            }
        };

        fetchHistorico();
    }, []);

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

        const itemDate = new Date(item.data);
        const isWithinDateRange = (!startDate || itemDate >= new Date(startDate)) && (!endDate || itemDate <= new Date(endDate));

        return matchesSearch && matchesType && isWithinDateRange;
    });

    const getDailyReport = () => {
        const dailyReport: { [key: string]: HistoricoItem[] } = {};
        filteredHistorico.forEach(item => {
            const date = new Date(item.data).toLocaleDateString('pt-BR');
            if (!dailyReport[date]) {
                dailyReport[date] = [];
            }
            dailyReport[date].push(item);
        });
        return dailyReport;
    };

    const getMonthlyReport = () => {
        const monthlyReport: { [key: string]: HistoricoItem[] } = {};
        filteredHistorico.forEach(item => {
            const monthYear = new Date(item.data).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
            if (!monthlyReport[monthYear]) {
                monthlyReport[monthYear] = [];
            }
            monthlyReport[monthYear].push(item);
        });
        return monthlyReport;
    };

    if (status === "loading") {
        return <div>Carregando...</div>;
    }

    const reportData = reportType === "daily" ? getDailyReport() : getMonthlyReport();

    const handleDayClick = (date: string) => {
        setModalTitle(`Relatório Diário - ${date}`);
        setModalItems(reportData[date] || []);
        setModalOpen(true);
    };
    
    const handleMonthClick = (monthYear: string) => {
        setModalTitle(`Relatório Mensal - ${monthYear}`);
        setModalItems(reportData[monthYear] || []);
        setModalOpen(true);
    };

    return (
        <div className="bg-primary-gray h-screen flex">
            <Sidebar />

            <div className="flex-1 bg-white flex flex-col pl-72 ml-3">
                <header className="flex justify-between items-center p-6 border-b border-[#E8E8E8] bg-white">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Lista de Relatórios</h2>
                        <h3 className="text-xl text-gray-600">Lista de relatórios diários e mensais.</h3>
                    </div>
                    
                    <button
                            onClick={() => router.push("/Historico")}
                            className="p-4 bg-primary-orange flex flex-row text-white text-xl font-poppins rounded-2xl border-2 text-center justify-center"
                        >
                            
                            <History className="mr-4 " />Histórico Completo
                        </button>
                </header>

                <main className="flex-1 p-6 bg-gray-100 text-black">
                    <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setReportType("daily")}
                        className={`p-3 border rounded-md text-xl mr-2 ${
                            reportType === "daily" ? "bg-primary-orange text-white" : "bg-white text-black border-gray-300"
                        }`}
                    >
                        Visualizar Relatórios Diários
                    </button>
                    <button
                        onClick={() => setReportType("monthly")}
                        className={`p-3 border rounded-md text-xl ${
                            reportType === "monthly" ? "bg-primary-orange text-white" : "bg-white text-black border-gray-300"
                        }`}
                    >
                        Visualizar Relatórios Mensais
                    </button>

                    </div>
                    <div className="flex justify-left p-6 text-black">
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
                        {reportType === "daily" ? (
                            Object.entries(reportData).map(([date, items]) => (
                                <div key={date} className="p-4 border rounded-lg bg-white shadow-sm cursor-pointer" onClick={() => handleDayClick(date)}>
                                    <p><strong>Data:</strong> {date}</p>
                                </div>
                            ))
                        ) : reportType === "monthly" ? (
                            Object.entries(reportData).map(([monthYear, items]) => (
                                <div key={monthYear} className="p-4 border rounded-lg bg-white shadow-sm cursor-pointer" onClick={() => handleMonthClick(monthYear)}>
                                    <p><strong>Mês/Ano:</strong> {monthYear}</p>
                                </div>
                            ))
                        ) : (
                            filteredHistorico.map(item => (
                                <div key={item._id} className="p-4 border rounded-lg bg-white shadow-sm">
                                    <p>
                                        <strong> Produto:</strong> 
                                        {typeof item.produto === 'string' ? item.produto : item.produto?.item ?? 'N/A'}
                                    </p>
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
                            ))
                        )}
                    </div>
                </main>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} items={modalItems} />
        </div>
    );
} 