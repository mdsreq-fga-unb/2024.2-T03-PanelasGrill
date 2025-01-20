"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para /login
    router.push("/Login");
  }, [router]);

  return null; // Não renderiza nada, apenas faz o redirecionamento
}
