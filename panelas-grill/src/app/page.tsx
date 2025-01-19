import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg border-2 border-[#e8e8e8] shadow-md w-full max-w-sm">
        {/* Logo */}
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

        {/* Formulário */}
        <form>
          <div className="mb-4">
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Login:
            </label>
            <input
              type="text"
              id="login"
              className="mt-1 block w-full rounded-lg border-2 border-[#e8e8e8] shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="  Digite seu login"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-lg border-2 border-[#e8e8e8] shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="  Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-md hover:bg-orange-600 transition"
          >
            Entrar
          </button>
          <p className="mt-4 text-center text-sm text-gray-500">
            <a href="#" className="text-orange-500 hover:underline">
              Esqueci minha senha
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
