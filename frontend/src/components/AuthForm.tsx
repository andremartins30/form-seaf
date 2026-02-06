import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthFormProps {
    children: ReactNode;
}

export function AuthForm({ children }: AuthFormProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifica se já está autenticado (sessionStorage)
        const authenticated = sessionStorage.getItem("authenticated");

        if (authenticated === "true") {
            setIsAuthenticated(true);
        } else {
            // Solicita a senha
            const password = prompt("Digite a senha para acessar o formulário:");

            // Defina sua senha aqui ou use variável de ambiente
            const correctPassword = import.meta.env.VITE_ACCESS_PASSWORD || "plano2025";

            if (password === correctPassword) {
                setIsAuthenticated(true);
                sessionStorage.setItem("authenticated", "true");
            } else {
                alert("Senha incorreta! Recarregue a página para tentar novamente.");
            }
        }
    }, []);

    if (!isAuthenticated) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontFamily: "system-ui"
            }}>
                <p>Acesso negado. Recarregue a página e digite a senha correta.</p>
            </div>
        );
    }

    return <>{children}</>;
}