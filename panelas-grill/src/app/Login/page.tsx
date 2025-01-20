"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importando useRouter

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Usando o hook useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    console.log("Resposta do signIn:", res); // Verifique a resposta
    
    if (res?.error) {
      setError("Email ou senha incorretos");
    } else {
      console.log("Login bem-sucedido");
      router.push("/Menu");
    }
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg border-2 border-[#e8e8e8] shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <Image
            src="/imagens/PanelasGrill_login.png"
            alt="Panelas Grill"
            width={250}
            height={50}
            priority
            className="ml-8"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Login:
            </label>
            <input
              type="email"
              id="login"
              className="mt-1 block w-full rounded-lg border-2 border-[#e8e8e8] shadow-sm focus:border-orange-500 focus:ring-orange-500 text-black"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-lg border-2 border-[#e8e8e8] shadow-sm focus:border-orange-500 focus:ring-orange-500 text-black"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-md justify-center items-center ">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 px-4 mt-2 rounded-md hover:bg-orange-600 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
