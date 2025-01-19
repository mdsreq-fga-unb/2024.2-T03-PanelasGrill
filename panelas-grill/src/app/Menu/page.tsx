import React from "react";
import Sidebar from "@/components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="flex bg-[#FAFAFA]" >
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">MENU PRINCIPAL</h2>
        <button className="p-2 border rounded-full hover:bg-gray-100">
          <span className="sr-only">Search</span>
          🔍
        </button>
      </header>
      <main className="mt-6">
        <p className="text-gray-700">Bem vindo!</p>
      </main>
    </div>
    </div>
  );
};

export default Home;
