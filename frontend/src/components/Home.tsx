import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FormSubmission {
    id: string;
    nome?: string;
    cnpj?: string;
    municipio?: string;
    categoria?: string;
    item?: string;
    status?: string;
    createdAt: string;
}

export default function Home() {
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        fetchSubmissions();
    }, []);

    async function fetchSubmissions() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/api/planos/list`);

            if (!response.ok) {
                throw new Error("Erro ao buscar formulários");
            }

            const data = await response.json();

            if (data.success && data.data?.items) {
                // Mapear os dados do formato de planos para o formato de submissions
                const mappedSubmissions = data.data.items.map((plano: any) => ({
                    id: plano.id,
                    nome: plano.nomeProponente,
                    cnpj: plano.cnpj,
                    municipio: plano.municipio,
                    categoria: plano.categoria?.label || "-",
                    item: plano.item?.label || "-",
                    status: plano.status || "EM_ANALISE",
                    createdAt: plano.createdAt
                }));
                setSubmissions(mappedSubmissions);
            } else {
                setSubmissions([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function getStatusBadge(status: string) {
        const statusMap: Record<string, { label: string; className: string }> = {
            EM_ANALISE: { label: "Em Análise", className: "bg-warning text-dark" },
            APROVADO: { label: "Aprovado", className: "bg-success" },
            NEGADO: { label: "Negado", className: "bg-danger" }
        };

        const statusInfo = statusMap[status] || statusMap.EM_ANALISE;
        return (
            <span className={`badge ${statusInfo.className}`}>
                {statusInfo.label}
            </span>
        );
    }

    function canEdit(status: string): boolean {
        return status === "EM_ANALISE";
    }

    function handleViewSubmission(id: string) {
        navigate(`/formulario/${id}`);
    }

    if (loading) {
        return (
            <div className="container-fluid p-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p className="mt-3 text-muted">Carregando formulários...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid p-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="alert alert-danger" role="alert">
                            <h5 className="alert-heading">Erro ao carregar formulários</h5>
                            <p>{error}</p>
                            <hr />
                            <p className="mb-0">
                                Verifique se o servidor backend está rodando em {API_URL}
                            </p>
                        </div>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={fetchSubmissions}
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid p-2 p-md-4">
            <div className="card shadow-sm">
                <div className="card-header bg-light-emphasis text-black">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                        <h2 className="mb-0 fs-4 fs-md-3">Formulários de Plano de Uso</h2>
                        <button
                            className="btn btn-primary w-36 w-md-auto"
                            onClick={() => navigate("/formulario")}
                        >
                            + Criar Formulário
                        </button>
                    </div>
                </div>
                <div className="card-body p-2 p-md-4">
                    {submissions.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted mb-4">Nenhum formulário encontrado</p>
                        </div>
                    ) : (
                        <>
                            {/* Visualização Desktop - Tabela */}
                            <div className="table-responsive d-none d-md-block">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>CNPJ</th>
                                            <th>Município</th>
                                            <th>Categoria</th>
                                            <th>Item</th>
                                            <th>Status</th>
                                            <th>Data de Criação</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submissions.map((submission) => (
                                            <tr key={submission.id}>
                                                <td>{submission.nome || "-"}</td>
                                                <td>{submission.cnpj || "-"}</td>
                                                <td>{submission.municipio || "-"}</td>
                                                <td>{submission.categoria || "-"}</td>
                                                <td>{submission.item || "-"}</td>
                                                <td>{getStatusBadge(submission.status || "EM_ANALISE")}</td>
                                                <td>{formatDate(submission.createdAt)}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleViewSubmission(submission.id)}
                                                        >
                                                            Visualizar
                                                        </button>
                                                        {canEdit(submission.status || "EM_ANALISE") && (
                                                            <button
                                                                className="btn btn-sm btn-outline-success"
                                                                onClick={() => navigate(`/formulario/${submission.id}?editMode=true`)}
                                                            >
                                                                Editar
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Visualização Mobile - Cards */}
                            <div className="d-md-none">
                                {submissions.map((submission) => (
                                    <div key={submission.id} className="card mb-3 border">
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h6 className="card-title mb-0 fw-bold text-truncate" style={{ maxWidth: '70%' }}>
                                                    {submission.nome || "Sem nome"}
                                                </h6>
                                                {getStatusBadge(submission.status || "EM_ANALISE")}
                                            </div>

                                            <div className="small text-muted mb-2">
                                                <div className="mb-1">
                                                    <strong>CNPJ:</strong> {submission.cnpj || "-"}
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Município:</strong> {submission.municipio || "-"}
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Categoria:</strong> {submission.categoria || "-"}
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Item:</strong> {submission.item || "-"}
                                                </div>
                                                <div className="mb-1">
                                                    <strong>Criado em:</strong> {formatDate(submission.createdAt)}
                                                </div>
                                            </div>

                                            <div className="d-flex gap-2 mt-3">
                                                <button
                                                    className="btn btn-sm btn-outline-primary flex-grow-1"
                                                    onClick={() => handleViewSubmission(submission.id)}
                                                >
                                                    Visualizar
                                                </button>
                                                {canEdit(submission.status || "EM_ANALISE") && (
                                                    <button
                                                        className="btn btn-sm btn-outline-success flex-grow-1"
                                                        onClick={() => navigate(`/formulario/${submission.id}?editMode=true`)}
                                                    >
                                                        Editar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
