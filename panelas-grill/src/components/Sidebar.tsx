import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { LayoutDashboard, Box, ScrollText, PanelsTopLeft, LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-white border-2 border-x-2 border-[#E8E8E8] flex flex-col" style={{ width: "300px" }}>
      <div className="flex items-center justify-center px-8 py-6">
        <Image src={Logo} alt="Panelas Grill" className="w-60 h-32" />
      </div>
      <nav className="flex flex-col flex-1 justify-center items-center mx-11 my-7">
        <a href="/Menu" className="p-4 text-gray-700 hover:text-primary-orange w-full flex flex-row items-center font-bold text-2xl">
          <LayoutDashboard className="mr-4" />
          Menu
        </a>
        <a href="/Estoque" className="p-4 text-gray-700 hover:text-primary-orange w-full font-bold text-2xl flex flex-row items-center">
          <Box className="mr-4" />
          Estoque
        </a>
        <a href="/Relatorios" className="p-4 text-gray-700 hover:text-primary-orange w-full font-bold text-2xl flex flex-row items-center">
          <ScrollText className="mr-4" />
          Relatório
        </a>
        <a href="Cardapio" className="p-4 text-gray-700 hover:text-primary-orange w-full font-bold text-2xl flex flex-row items-center">
          <PanelsTopLeft className="mr-4" />
          Cardápio
        </a>
        <a href="" className="p-4 text-gray-700 hover:text-primary-orange w-full mt-auto font-bold text-2xl flex flex-row items-center">
          <LogOut className="mr-4" />
          Sair
        </a>
      </nav>
      <div className="p-4 text-gray-500 text-sm text-center">Ajuda</div>
    </div>
  );
};

export default Sidebar;
