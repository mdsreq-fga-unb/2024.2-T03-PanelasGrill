"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import Logo from "@/assets/logo.png";
import { LayoutDashboard, Box, ScrollText, PanelsTopLeft, LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path; 

  return (
    <div className="h-screen bg-white border-2 border-x-2 border-[#E8E8E8] flex flex-col fixed" style={{ width: "300px" }}>
      <div className="flex items-center justify-center px-8 py-6">
        <Image src={Logo} alt="Panelas Grill" className="w-60 h-32" />
      </div>
      <nav className="flex flex-col flex-1 justify-center items-center mx-11 my-7">
        <Link
          href="/Menu"
          className={`p-4 w-full flex flex-row items-center font-bold text-2xl ${
            isActive("/Menu") ? "text-primary-orange" : "text-gray-700 hover:text-primary-orange"
          }`}
        >
          <LayoutDashboard className="mr-4" />
          Menu
        </Link>
        <Link
          href="/Estoque"
          className={`p-4 w-full flex flex-row items-center font-bold text-2xl ${
            isActive("/Estoque") ? "text-primary-orange" : "text-gray-700 hover:text-primary-orange"
          }`}
        >
          <Box className="mr-4" />
          Estoque
        </Link>
        <Link
          href="/Relatorios"
          className={`p-4 w-full flex flex-row items-center font-bold text-2xl ${
            isActive("/Relatorios") ? "text-primary-orange" : "text-gray-700 hover:text-primary-orange"
          }`}
        >
          <ScrollText className="mr-4" />
          Relatório
        </Link>
        <Link
          href="/Cardapio"
          className={`p-4 w-full flex flex-row items-center font-bold text-2xl ${
            isActive("/Cardapio") ? "text-primary-orange" : "text-gray-700 hover:text-primary-orange"
          }`}
        >
          <PanelsTopLeft className="mr-4" />
          Cardápio
        </Link>
        <Link
          href="/Login"
          className={`p-4 w-full mt-auto flex flex-row items-center font-bold text-2xl ${
            isActive("/Login") ? "text-primary-orange" : "text-gray-700 hover:text-primary-orange"
          }`}
        >
          <LogOut className="mr-4" />
          Sair
        </Link>
      </nav>
      <div className="p-4 text-gray-500 text-sm text-center">Ajuda</div>
    </div>
  );
};

export default Sidebar;
