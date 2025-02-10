import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Usuários simulados (para demonstração)
const users = [
  {
    id: 1,
    email: "user@example.com",
    passwordHash: bcrypt.hashSync("senha123", 10), // Criptografando a senha
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        console.log("Autenticando com:", credentials);

        const user = users.find(user => user.email === credentials?.email);
        if (user) {
          const isPasswordValid = await bcrypt.compare(credentials?.password || "", user.passwordHash);
          console.log("Senha válida:", isPasswordValid);

          if (isPasswordValid) {
            return { id: user.id.toString(), email: user.email };
          }
        }

        console.log("Autenticação falhou");
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // <---- Aqui está o uso da variável de ambiente
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.id = String(token.id);
      if (token?.email) session.email = token.email;
      return session;
    },
  },
});


export { handler as GET, handler as POST };
