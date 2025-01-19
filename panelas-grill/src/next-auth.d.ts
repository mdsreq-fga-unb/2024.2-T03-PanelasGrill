import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Estendendo a interface de `User` do NextAuth
declare module "next-auth" {
  interface Session {
    id: string; // Campo id adicionado à sessão
    email: string; // Campo email adicionado à sessão
  }

  interface User {
    id: string; // Campo id adicionado ao usuário
    email: string; // Campo email adicionado ao usuário
  }
}
