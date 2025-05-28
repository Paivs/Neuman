import { NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/documents", "/clients", "/settings"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Verifica se a rota está protegida
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    // Verifica cookie de autenticação (exemplo simples)
    const token = request.cookies.get("token");
    
    if (!token) {
      // Redireciona para login se não autenticado
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Continua normalmente se autorizado ou rota pública
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/documents/:path*", "/clients/:path*", "/settings/:path*"],
};
