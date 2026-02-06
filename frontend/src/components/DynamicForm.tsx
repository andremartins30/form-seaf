import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getQuestionsByFormType } from "../data/questions";
import { useCategories } from "../hooks/useCategories";
import { useFormType } from "../hooks/useFormType";
import ProducerListField from "./fields/ProducerListField";
import type { Producer } from "./fields/ProducerListField";
import SeedlingProducerListField from "./fields/SeedlingProducerListField";
import type { SeedlingProducer } from "./fields/SeedlingProducerListField";
import BeneficiaryListField from "./fields/BeneficiaryListField";
import type { Beneficiary } from "./fields/BeneficiaryListField";
import { formatFormData } from "../utils/formatFormData";

interface Professional {
    institution: string;
    profession?: string;
}

interface ValueChain {
    produto: string;
    mercados: string[];
}

interface Equipment {
    name?: string;
    quantity: string;
}

interface DynamicFormProps {
    viewMode?: boolean;
}

export default function DynamicForm({ viewMode = false }: DynamicFormProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const editMode = searchParams.get('editMode') === 'true';
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [professionals, setProfessionals] = useState<Record<string, Professional[]>>({});
    const [valueChains, setValueChains] = useState<Record<string, ValueChain[]>>({});
    const [equipments, setEquipments] = useState<Record<string, Equipment[]>>({});
    const [producerList, setProducerList] = useState<Producer[]>([]);
    const [seedlingProducerList, setSeedlingProducerList] = useState<SeedlingProducer[]>([]);
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const { data: categoriesData, loading: loadingCategories, error: categoriesError } = useCategories();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // Carregar dados do formulário se estiver em modo visualização ou edição
    useEffect(() => {
        if ((viewMode || editMode) && id) {
            loadFormData(id);
        }
    }, [viewMode, editMode, id]);

    async function loadFormData(formId: string) {
        try {
            setLoadingData(true);
            const response = await fetch(`${API_URL}/api/planos/${formId}`);

            if (!response.ok) {
                throw new Error("Erro ao carregar formulário");
            }

            const result = await response.json();

            if (result.success && result.data) {
                const plano = result.data;

                // Verificar se está tentando editar um plano aprovado ou negado
                if (editMode && (plano.status === 'APROVADO' || plano.status === 'NEGADO')) {
                    alert(`Não é possível editar um formulário com status ${plano.status === 'APROVADO' ? 'Aprovado' : 'Negado'}.`);
                    navigate(`/formulario/${formId}`); // Redirecionar para modo visualização
                    return;
                }

                // Preencher campos básicos do payload original
                if (plano.payloadOriginal) {
                    const payload = plano.payloadOriginal;
                    const newAnswers: Record<string, string | string[]> = {};

                    // Campos simples
                    Object.keys(payload).forEach(key => {
                        if (typeof payload[key] === 'string' || Array.isArray(payload[key])) {
                            newAnswers[key] = payload[key];
                        }
                    });

                    setAnswers(newAnswers);

                    // Profissionais
                    if (payload.professionals) {
                        setProfessionals(payload.professionals);
                    }

                    // Cadeias de valor
                    if (payload.valueChains) {
                        setValueChains(payload.valueChains);
                    }

                    // Equipamentos
                    if (payload.equipments) {
                        setEquipments(payload.equipments);
                    }

                    // Lista de produtores
                    if (payload.producerList) {
                        setProducerList(payload.producerList);
                    }

                    // Lista de produtores de mudas
                    if (payload.seedlingProducerList) {
                        setSeedlingProducerList(payload.seedlingProducerList);
                    }

                    // Lista de beneficiários
                    if (payload.beneficiaries) {
                        setBeneficiaries(payload.beneficiaries);
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            alert("Erro ao carregar formulário");
            navigate("/");
        } finally {
            setLoadingData(false);
        }
    }

    // Hook para detectar mudanças de formType e confirmar com usuário
    const handleFormTypeChange = useCallback((_newFormType: string) => {
        if (viewMode || editMode) return; // Não limpar em modo visualização ou edição

        // Preservar apenas campos comuns (contato)
        const commonFields = ['nome', 'cnpj', 'municipio', 'telefone1', 'telefone2', 'email'];
        const preservedAnswers: Record<string, string | string[]> = {};

        commonFields.forEach(field => {
            if (answers[field]) {
                preservedAnswers[field] = answers[field];
            }
        });

        // Limpar todos os estados exceto campos comuns
        setAnswers(preservedAnswers);
        setProfessionals({});
        setValueChains({});
        setEquipments({});
        setProducerList([]);
        setSeedlingProducerList([]);
        setBeneficiaries([]);
    }, [answers, viewMode, editMode]);

    const { formType } = useFormType(
        answers.categoria as string,
        categoriesData,
        handleFormTypeChange
    );

    // Mesclar perguntas estáticas com dados dinâmicos da API
    const dynamicQuestions = useMemo(() => {
        // Obter questions baseado no formType
        const baseQuestions = getQuestionsByFormType(formType);

        if (!categoriesData) return baseQuestions;

        return baseQuestions.map(q => {
            // Atualizar a pergunta de categoria com dados da API
            if (q.id === "categoria") {
                return {
                    ...q,
                    options: categoriesData.categoryOptions
                };
            }

            // Atualizar a pergunta de item com dados da API
            if (q.id === "item") {
                return {
                    ...q,
                    getOptions: (answers: { categoria?: string }) => {
                        return categoriesData.itemsMap[answers.categoria as string] || [];
                    }
                };
            }

            // Atualizar a pergunta de tipos de comunidades com dados da API
            if (q.id === "tipos_comunidades") {
                return {
                    ...q,
                    options: categoriesData.communityTypeOptions
                };
            }

            return q;
        });
    }, [categoriesData, formType]);

    function handleChange(id: string, value: string | string[]) {
        setAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    }

    // Adicionar um profissional
    const addProfessional = (type: string) => {
        setProfessionals(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), { institution: "", profession: "" }]
        }));
    };

    // Remover um profissional
    const removeProfessional = (type: string, index: number) => {
        setProfessionals(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    // Atualizar dados de um profissional
    const updateProfessional = (type: string, index: number, field: string, value: string) => {
        setProfessionals(prev => ({
            ...prev,
            [type]: prev[type].map((prof, i) =>
                i === index ? { ...prof, [field]: value } : prof
            )
        }));
    };

    // Adicionar uma cadeia de valor
    const addValueChain = (type: string) => {
        setValueChains(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), { produto: "", mercados: [] }]
        }));
    };

    // Remover uma cadeia de valor
    const removeValueChain = (type: string, index: number) => {
        setValueChains(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    // Atualizar produto de uma cadeia de valor
    const updateValueChainProduct = (type: string, index: number, value: string) => {
        setValueChains(prev => ({
            ...prev,
            [type]: prev[type].map((chain, i) =>
                i === index ? { ...chain, produto: value } : chain
            )
        }));
    };

    // Atualizar mercados de uma cadeia de valor
    const updateValueChainMarkets = (type: string, index: number, marketValue: string) => {
        setValueChains(prev => ({
            ...prev,
            [type]: prev[type].map((chain, i) => {
                if (i === index) {
                    const currentMarkets = chain.mercados || [];
                    const updatedMarkets = currentMarkets.includes(marketValue)
                        ? currentMarkets.filter(m => m !== marketValue)
                        : [...currentMarkets, marketValue];
                    return { ...chain, mercados: updatedMarkets };
                }
                return chain;
            })
        }));
    };

    // Adicionar um equipamento
    const addEquipment = (type: string) => {
        setEquipments(prev => ({
            ...prev,
            [type]: [...(prev[type] || []), { quantity: "" }]
        }));
    };

    // Remover um equipamento
    const removeEquipment = (type: string, index: number) => {
        setEquipments(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    // Atualizar quantidade de um equipamento
    const updateEquipmentQuantity = (type: string, index: number, value: string) => {
        setEquipments(prev => ({
            ...prev,
            [type]: prev[type].map((equip, i) =>
                i === index ? { ...equip, quantity: value } : equip
            )
        }));
    };

    // Atualizar nome de um equipamento (para "outros")
    const updateEquipmentName = (type: string, index: number, value: string) => {
        setEquipments(prev => ({
            ...prev,
            [type]: prev[type].map((equip, i) =>
                i === index ? { ...equip, name: value } : equip
            )
        }));
    };

    // Função para determinar o tamanho da coluna com base no tipo de campo
    const getColumnClass = (type: string) => {
        switch (type) {
            case "text":
            case "number":
                return "col-sm-2"; // 3 por linha
            case "select":
                return "col-md-6"; // 2 por linha
            case "radio":
                return "col-md-4"; // 3 por linha
            case "checkbox-group":
                return "col-md-6"; // 2 por linha
            case "textarea":
            case "producer-list":
            case "seedling-producer-list":
            case "beneficiary-list":
                return "col-12"; // largura total
            default:
                return "col-md-4";
        }
    };

    // Agrupar perguntas por grupo
    const groupedQuestions = dynamicQuestions.reduce((acc: any, q) => {
        const group = q.group || 0;
        if (!acc[group]) acc[group] = [];
        acc[group].push(q);
        return acc;
    }, {});

    // Mostrar loading enquanto carrega categorias ou dados
    if (loadingCategories || loadingData) {
        return (
            <div className="container-fluid p-4">
                <div className="card shadow-sm">
                    <div className="card-body text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p className="mt-3 text-muted">
                            {loadingData ? "Carregando dados do formulário..." : "Carregando formulário..."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Mostrar erro se houver
    if (categoriesError) {
        return (
            <div className="container-fluid p-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="alert alert-danger" role="alert">
                            <h5 className="alert-heading">Erro ao carregar dados</h5>
                            <p>{categoriesError}</p>
                            <hr />
                            <p className="mb-0">
                                Verifique se o servidor backend está rodando em http://localhost:3000
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light-emphasis text-black d-flex justify-content-between align-items-center">
                            <h2 className="mb-0">
                                {editMode ? "Editar Formulário de Plano de Uso" : viewMode ? "Visualizar Formulário de Plano de Uso" : "Formulário de Plano de uso"}
                            </h2>
                            {editMode && (
                                <span className="badge bg-warning">Modo Edição</span>
                            )}
                            {viewMode && !editMode && (
                                <span className="badge bg-info">Modo Visualização</span>
                            )}
                        </div>
                        <div className="card-body p-4">
                            <fieldset disabled={viewMode && !editMode}>
                                {/* Seção de informações de contato (grupos 1-6) */}
                                <div className="mb-4 pb-3 border-bottom">
                                    <h5 className="text-secondary mb-3">Informações de Contato</h5>
                                    <div className="row g-3">
                                        {dynamicQuestions.filter((q: any) => q.group && q.group >= 1 && q.group <= 6).map((q: any) => (
                                            <div key={q.id} className="col-md-4">
                                                <label className="form-label fw-semibold small">
                                                    {q.questionNumber !== undefined && (
                                                        <span className="badge bg-secondary me-2">{q.questionNumber}</span>
                                                    )}
                                                    {q.label}
                                                    {q.required && <span className="text-danger ms-1">*</span>}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={answers[q.id] || ""}
                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                    required={q.required}
                                                    placeholder={`Digite ${q.label}`}
                                                    disabled={viewMode && !editMode}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Perguntas numeradas (grupos 7+) */}
                                {Object.keys(groupedQuestions).map(groupKey => {
                                    const groupNum = parseInt(groupKey);
                                    if (groupNum >= 1 && groupNum <= 6) return null; // Pular informações de contato

                                    const group = groupedQuestions[groupKey];
                                    const visibleQuestions = group.filter((q: any) => {
                                        const visible = q.showIf ? q.showIf(answers) : true;
                                        return visible;
                                    });

                                    if (visibleQuestions.length === 0) return null;

                                    const mainQuestion = visibleQuestions[0];
                                    const hasQuestionNumber = mainQuestion.questionNumber !== undefined;

                                    return (
                                        <div key={groupKey} className="mb-4 border-bottom pb-3">
                                            {hasQuestionNumber && (
                                                <div className="mb-2">
                                                    <span className="badge bg-secondary me-2">{mainQuestion.questionNumber}</span>
                                                    <span className="fw-bold text-uppercase small">{mainQuestion.label}</span>
                                                </div>
                                            )}

                                            {/* Renderização especial para grupo 7 (Categoria/Item) */}
                                            {groupNum === 7 ? (
                                                <div className="row g-3">
                                                    {visibleQuestions.map((q: any) => {
                                                        const options = q.getOptions ? q.getOptions(answers) : q.options;
                                                        return (
                                                            <div key={q.id} className="col-md-4">
                                                                <label className="form-label fw-semibold small">
                                                                    {q.id === "categoria" ? "Categoria" : q.label}
                                                                    {q.required && <span className="text-danger ms-1">*</span>}
                                                                </label>
                                                                <select
                                                                    className="form-select form-select-sm"
                                                                    value={answers[q.id] || ""}
                                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                                    required={q.required}
                                                                    disabled={viewMode && !editMode}
                                                                >
                                                                    <option value="">Selecione...</option>
                                                                    {options?.map((opt: any) => (
                                                                        <option key={opt.value} value={opt.value}>
                                                                            {opt.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : groupNum === 8 ? (
                                                /* Renderização especial para grupo 8 */
                                                <div>
                                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                                        {visibleQuestions.filter((q: any) => q.type === "radio").map((q: any) => (
                                                            <React.Fragment key={q.id}>
                                                                {q.options?.map((opt: any) => (
                                                                    <div key={opt.value} className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name={q.id}
                                                                            id={`${q.id}-${opt.value}`}
                                                                            value={opt.value}
                                                                            checked={answers[q.id] === opt.value}
                                                                            onChange={() => handleChange(q.id, opt.value)}
                                                                            required={q.required}
                                                                        />
                                                                        <label className="form-check-label small" htmlFor={`${q.id}-${opt.value}`}>
                                                                            {opt.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                    {visibleQuestions.filter((q: any) => q.type === "number").map((q: any) => (
                                                        <div key={q.id} className="col-md-3">
                                                            <label className="form-label fw-semibold small">
                                                                {q.label}
                                                                {q.required && <span className="text-danger ms-1">*</span>}
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={answers[q.id] || ""}
                                                                onChange={e => handleChange(q.id, e.target.value)}
                                                                required={q.required}
                                                                placeholder="Quantidade"
                                                                min="0"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : groupNum === 10 ? (
                                                /* Renderização especial para grupo 10 */
                                                <div>
                                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                                        {visibleQuestions.filter((q: any) => q.type === "radio").map((q: any) => (
                                                            <React.Fragment key={q.id}>
                                                                {q.options?.map((opt: any) => (
                                                                    <div key={opt.value} className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name={q.id}
                                                                            id={`${q.id}-${opt.value}`}
                                                                            value={opt.value}
                                                                            checked={answers[q.id] === opt.value}
                                                                            onChange={() => handleChange(q.id, opt.value)}
                                                                            required={q.required}
                                                                        />
                                                                        <label className="form-check-label small" htmlFor={`${q.id}-${opt.value}`}>
                                                                            {opt.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                    {visibleQuestions.filter((q: any) => q.type === "checkbox-group").map((q: any) => (
                                                        <div key={q.id} className="mb-3">
                                                            <div className="row g-2">
                                                                {q.options?.map((opt: any) => {
                                                                    // Mapear o value do checkbox para o id do campo de quantidade correspondente
                                                                    const quantityFieldMap: Record<string, string> = {
                                                                        "comunidades_tradicionais": "qtd_comunidades_tradicionais",
                                                                        "comunidades_indigenas": "qtd_comunidades_indigenas",
                                                                        "quilombolas": "qtd_quilombolas",
                                                                        "assentamentos": "qtd_assentamentos",
                                                                        "associacoes": "qtd_associacoes",
                                                                        "cooperativas": "qtd_cooperativas",
                                                                        "comunidades_outras": "qtd_comunidades_outras"
                                                                    };
                                                                    const quantityFieldId = quantityFieldMap[opt.value];
                                                                    const isChecked = Array.isArray(answers[q.id]) && answers[q.id].includes(opt.value);
                                                                    const isComunidadesOutras = opt.value === "comunidades_outras";

                                                                    return (
                                                                        <div key={opt.value} className="col-6">
                                                                            <div className="d-flex flex-column gap-2">
                                                                                <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                                                                                    <div className="form-check">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="form-check-input"
                                                                                            id={`${q.id}-${opt.value}`}
                                                                                            checked={isChecked}
                                                                                            onChange={() => {
                                                                                                const current = Array.isArray(answers[q.id]) ? answers[q.id] as string[] : [];
                                                                                                const updated = current.includes(opt.value)
                                                                                                    ? current.filter(v => v !== opt.value)
                                                                                                    : [...current, opt.value];
                                                                                                handleChange(q.id, updated);
                                                                                            }}
                                                                                        />
                                                                                        <label className="form-check-label small" htmlFor={`${q.id}-${opt.value}`}>
                                                                                            {opt.label}
                                                                                        </label>
                                                                                    </div>
                                                                                    {isChecked && quantityFieldId && (
                                                                                        <div className="d-flex align-items-center gap-2">
                                                                                            <label htmlFor={`input-${quantityFieldId}`} className="form-label fw-semibold small mb-0">
                                                                                                Quantidade:
                                                                                            </label>
                                                                                            <input
                                                                                                type="number"
                                                                                                className="form-control form-control-sm"
                                                                                                id={`input-${quantityFieldId}`}
                                                                                                style={{ width: '80px' }}
                                                                                                value={answers[quantityFieldId] || ""}
                                                                                                onChange={e => handleChange(quantityFieldId, e.target.value)}
                                                                                                placeholder="0"
                                                                                                min="0"
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                {isChecked && isComunidadesOutras && (
                                                                                    <div className="ms-4">
                                                                                        <label htmlFor="input-descricao_comunidades_outras" className="form-label fw-semibold small">
                                                                                            Descreva o tipo de comunidade:
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control form-control-sm"
                                                                                            id="input-descricao_comunidades_outras"
                                                                                            value={answers.descricao_comunidades_outras || ""}
                                                                                            onChange={e => handleChange("descricao_comunidades_outras", e.target.value)}
                                                                                            placeholder="Especifique o tipo de comunidade..."
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : groupNum === 13 ? (
                                                /* Renderização especial para grupo 13 */
                                                <div>
                                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                                        {visibleQuestions.filter((q: any) => q.type === "radio").map((q: any) => (
                                                            <React.Fragment key={q.id}>
                                                                {q.options?.map((opt: any) => (
                                                                    <div key={opt.value} className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name={q.id}
                                                                            id={`${q.id}-${opt.value}`}
                                                                            value={opt.value}
                                                                            checked={answers[q.id] === opt.value}
                                                                            onChange={() => handleChange(q.id, opt.value)}
                                                                            required={q.required}
                                                                        />
                                                                        <label className="form-check-label small" htmlFor={`${q.id}-${opt.value}`}>
                                                                            {opt.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                    {visibleQuestions.filter((q: any) => q.type === "checkbox-group").map((q: any) => (
                                                        <div key={q.id} className="mb-3">
                                                            <div className="row g-2">
                                                                {q.options?.map((opt: any) => {
                                                                    const isChecked = Array.isArray(answers[q.id]) && answers[q.id].includes(opt.value);

                                                                    return (
                                                                        <div key={opt.value} className="col-6">
                                                                            <div className="form-check">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    className="form-check-input"
                                                                                    id={`${q.id}-${opt.value}`}
                                                                                    checked={isChecked}
                                                                                    onChange={() => {
                                                                                        const current = Array.isArray(answers[q.id]) ? answers[q.id] as string[] : [];
                                                                                        const willBeUnchecked = current.includes(opt.value);

                                                                                        // Se está desmarcando e tem profissionais, limpar
                                                                                        if (willBeUnchecked && professionals[opt.value]?.length > 0) {
                                                                                            setProfessionals(prev => {
                                                                                                const newProf = { ...prev };
                                                                                                delete newProf[opt.value];
                                                                                                return newProf;
                                                                                            });
                                                                                        }

                                                                                        const updated = current.includes(opt.value)
                                                                                            ? current.filter(v => v !== opt.value)
                                                                                            : [...current, opt.value];
                                                                                        handleChange(q.id, updated);
                                                                                    }}
                                                                                />
                                                                                <label className="form-check-label small" htmlFor={`${q.id}-${opt.value}`}>
                                                                                    {opt.label}
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {/* Renderizar campos de texto e número adicionais (qtd, instituição) */}
                                                    {visibleQuestions.filter((q: any) => q.type === "text" || q.type === "number").map((q: any) => (
                                                        <div key={q.id} className="col-md-4 mb-2">
                                                            <label className="form-label fw-semibold small">
                                                                {q.label}
                                                                {q.required && <span className="text-danger ms-1">*</span>}
                                                            </label>
                                                            <input
                                                                type={q.type}
                                                                className="form-control form-control-sm"
                                                                value={answers[q.id] || ""}
                                                                onChange={e => handleChange(q.id, e.target.value)}
                                                                required={q.required}
                                                                placeholder={q.type === "number" ? "Quantidade" : `Digite ${q.label.toLowerCase()}`}
                                                                min={q.type === "number" ? "0" : undefined}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="row g-3">
                                                    {visibleQuestions.map((q: any) => {
                                                        const options = q.getOptions ? q.getOptions(answers) : q.options;
                                                        const isMainQuestion = q.questionNumber !== undefined;

                                                        return (
                                                            <div key={q.id} className={q.columnClass || getColumnClass(q.type)}>
                                                                {!isMainQuestion && (
                                                                    <label className="form-label fw-semibold small">
                                                                        {q.label}
                                                                        {q.required && <span className="text-danger ms-1">*</span>}
                                                                    </label>
                                                                )}

                                                                {q.type === "select" && (
                                                                    <select
                                                                        className="form-select form-select-sm"
                                                                        value={answers[q.id] || ""}
                                                                        onChange={e => handleChange(q.id, e.target.value)}
                                                                        required={q.required}
                                                                    >
                                                                        <option value="">Selecione...</option>
                                                                        {options?.map((opt: any) => (
                                                                            <option key={opt.value} value={opt.value}>
                                                                                {opt.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                )}

                                                                {q.type === "text" && (
                                                                    <>
                                                                        {q.id === "local_proposta" && (
                                                                            <div>
                                                                                <label htmlFor={q.id} className="form-label fw-semibold small mb-1">
                                                                                    Município
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    id={q.id}
                                                                                    value={answers[q.id] || ""}
                                                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                                                    required={q.required}
                                                                                    placeholder="Digite o município"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {q.id === "responsavel_tecnico" && (
                                                                            <div>
                                                                                <label htmlFor={q.id} className="form-label fw-semibold small mb-1">
                                                                                    Responsável
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    id={q.id}
                                                                                    value={answers[q.id] || ""}
                                                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                                                    required={q.required}
                                                                                    placeholder="Digite o nome do responsável técnico"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {q.id === "assinatura_proponente" && (
                                                                            <div>
                                                                                <label htmlFor={q.id} className="form-label fw-semibold small mb-1">
                                                                                    Proponente
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    id={q.id}
                                                                                    value={answers[q.id] || ""}
                                                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                                                    required={q.required}
                                                                                    placeholder="Digite assinatura do proponente"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {q.id === "responsavel_tecnico_calcario" && (
                                                                            <div>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    id={q.id}
                                                                                    value={answers[q.id] || ""}
                                                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                                                    required={q.required}
                                                                                    placeholder="Digite o nome do responsável técnico"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {q.id !== "local_proposta" && q.id !== "responsavel_tecnico" && q.id !== "assinatura_proponente" && q.id !== "responsavel_tecnico_calcario" && (
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-sm"
                                                                                value={answers[q.id] || ""}
                                                                                onChange={e => handleChange(q.id, e.target.value)}
                                                                                required={q.required}
                                                                                placeholder={`Digite ${q.label.toLowerCase()}`}
                                                                            />
                                                                        )}
                                                                    </>
                                                                )}

                                                                {q.type === "number" && (
                                                                    <input
                                                                        type="number"
                                                                        className="form-control form-control-sm"
                                                                        value={answers[q.id] || ""}
                                                                        onChange={e => handleChange(q.id, e.target.value)}
                                                                        required={q.required}
                                                                        placeholder="Quantidade"
                                                                        min="0"
                                                                    />
                                                                )}

                                                                {q.type === "textarea" && (
                                                                    <textarea
                                                                        className="form-control form-control-sm"
                                                                        rows={3}
                                                                        value={answers[q.id] || ""}
                                                                        onChange={e => handleChange(q.id, e.target.value)}
                                                                        placeholder="Digite sua resposta..."
                                                                        required={q.required}
                                                                    />
                                                                )}

                                                                {q.type === "date" && (
                                                                    <input
                                                                        type="date"
                                                                        className="form-control form-control-sm"
                                                                        value={answers[q.id] || ""}
                                                                        onChange={e => handleChange(q.id, e.target.value)}
                                                                        required={q.required}
                                                                    />
                                                                )}

                                                                {q.type === "checkbox" && (
                                                                    <div className="form-check">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input"
                                                                            id={q.id}
                                                                            checked={answers[q.id] === "true"}
                                                                            onChange={e => handleChange(q.id, e.target.checked ? "true" : "false")}
                                                                            required={q.required}
                                                                        />
                                                                        <label className="form-check-label small" htmlFor={q.id}>
                                                                            Li e concordo
                                                                        </label>
                                                                    </div>
                                                                )}

                                                                {q.type === "producer-list" && (
                                                                    <ProducerListField
                                                                        id={q.id}
                                                                        label={q.label}
                                                                        value={producerList}
                                                                        onChange={setProducerList}
                                                                        required={q.required}
                                                                    />
                                                                )}

                                                                {q.type === "seedling-producer-list" && (
                                                                    <SeedlingProducerListField
                                                                        id={q.id}
                                                                        label={q.label}
                                                                        value={seedlingProducerList}
                                                                        onChange={setSeedlingProducerList}
                                                                        required={q.required}
                                                                    />
                                                                )}

                                                                {q.type === "beneficiary-list" && (
                                                                    <BeneficiaryListField
                                                                        value={beneficiaries}
                                                                        onChange={setBeneficiaries}
                                                                        disabled={viewMode && !editMode}
                                                                    />
                                                                )}

                                                                {q.type === "radio" && (
                                                                    <div className="d-flex flex-wrap gap-3">
                                                                        {q.options?.map((opt: any) => (
                                                                            <div key={opt.value} className="form-check">
                                                                                <input
                                                                                    className="form-check-input"
                                                                                    type="radio"
                                                                                    name={q.id}
                                                                                    id={`${q.id}-${opt.value}`}
                                                                                    value={opt.value}
                                                                                    checked={answers[q.id] === opt.value}
                                                                                    onChange={() => handleChange(q.id, opt.value)}
                                                                                    required={q.required}
                                                                                />
                                                                                <label className="form-check-label small" htmlFor={`${q.id}-${opt.value}`}>
                                                                                    {opt.label}
                                                                                </label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {q.type === "checkbox-group" && (
                                                                    <div className="row g-2">
                                                                        {q.options?.map((opt: any) => (
                                                                            <div key={opt.value} className="col-6">
                                                                                <div className="d-flex align-items-center gap-2">
                                                                                    <div className="form-check">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            className="form-check-input"
                                                                                            id={`${q.id}-${opt.value}`}
                                                                                            checked={Array.isArray(answers[q.id]) && answers[q.id].includes(opt.value)}
                                                                                            onChange={() => {
                                                                                                const current = Array.isArray(answers[q.id]) ? answers[q.id] as string[] : [];
                                                                                                const isChecked = current.includes(opt.value);

                                                                                                // Validação antes de desmarcar
                                                                                                if (isChecked) {
                                                                                                    if (q.id === "tipos_profissionais" && professionals[opt.value]?.length > 0) {
                                                                                                        alert("Por favor, remova todos os profissionais desta categoria antes de desmarcar.");
                                                                                                        return;
                                                                                                    }
                                                                                                    if (q.id === "cadeias_valor" && valueChains[opt.value]?.length > 0) {
                                                                                                        alert("Por favor, remova todos os produtos desta cadeia de valor antes de desmarcar.");
                                                                                                        return;
                                                                                                    }
                                                                                                    if (q.id === "capacidade_atendimento" && equipments[opt.value]?.length > 0) {
                                                                                                        alert("Por favor, remova todos os equipamentos desta categoria antes de desmarcar.");
                                                                                                        return;
                                                                                                    }
                                                                                                }

                                                                                                const updated = isChecked
                                                                                                    ? current.filter(v => v !== opt.value)
                                                                                                    : [...current, opt.value];

                                                                                                handleChange(q.id, updated);
                                                                                            }}
                                                                                        />
                                                                                        <label className="form-check-label small" htmlFor={`${q.id}-${opt.value}`}>
                                                                                            {opt.label}
                                                                                        </label>
                                                                                    </div>
                                                                                    {opt.value === "outros_grupos" && Array.isArray(answers[q.id]) && answers[q.id].includes(opt.value) && (
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control form-control-sm flex-grow-1"
                                                                                            value={answers["qtd_outros_grupos"] || ""}
                                                                                            onChange={e => handleChange("qtd_outros_grupos", e.target.value)}
                                                                                            placeholder="Descrever e quantidade"
                                                                                            style={{ minWidth: '150px' }}
                                                                                        />
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* Renderização especial para cadeias de valor (grupo 11) */}
                                            {groupNum === 11 && answers.cadeias_valor && Array.isArray(answers.cadeias_valor) && (answers.cadeias_valor.length > 0 || Object.values(valueChains).some(arr => arr.length > 0)) && (
                                                <div className="col-12">
                                                    <div className="card bg-light">
                                                        <div className="card-body">
                                                            <h6 className="card-title mb-3">Detalhes das Cadeias de Valor</h6>
                                                            {(answers.cadeias_valor as string[]).map(chainType => {
                                                                const chainsOfType = valueChains[chainType] || [];
                                                                const chainLabel = visibleQuestions.find((q: any) => q.id === "cadeias_valor")
                                                                    ?.options?.find((opt: any) => opt.value === chainType)?.label || chainType;

                                                                const marketOptions = [
                                                                    { value: "pnae", label: "PNAE" },
                                                                    { value: "paa", label: "PAA" },
                                                                    { value: "feiras", label: "Feiras locais" },
                                                                    { value: "privado", label: "Mercados privados" },
                                                                    { value: "varejo", label: "Varejo / Informal" },
                                                                    { value: "intermunicipal", label: "Export. Intermunicipal" },
                                                                    { value: "interestadual", label: "Export. Interestadual" },
                                                                    { value: "internacional", label: "Export. Internacional" }
                                                                ];

                                                                return (
                                                                    <div key={chainType} className="mb-4 pb-3 border-bottom">
                                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                                            <div>
                                                                                <strong className="text-primary">{chainLabel}</strong>
                                                                                {chainsOfType.length > 0 && (
                                                                                    <span className="badge bg-info ms-2">
                                                                                        Produtos cadastrados: {chainsOfType.length}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-sm btn-success"
                                                                                onClick={() => addValueChain(chainType)}
                                                                            >
                                                                                + Adicionar Produto
                                                                            </button>
                                                                        </div>

                                                                        {chainsOfType.length === 0 ? (
                                                                            <p className="text-muted small mb-0">Nenhum produto adicionado. Clique em "Adicionar Produto" para inserir.</p>
                                                                        ) : (
                                                                            chainsOfType.map((chain, index) => (
                                                                                <div key={index} className="card mb-3">
                                                                                    <div className="card-body">
                                                                                        <div className="row g-2 mb-3">
                                                                                            <div className="col-auto">
                                                                                                <div className="badge bg-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem' }}>
                                                                                                    #{index + 1}
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col">
                                                                                                <label className="form-label small mb-1 fw-semibold">Produto específico</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control form-control-sm"
                                                                                                    value={chain.produto}
                                                                                                    onChange={e => updateValueChainProduct(chainType, index, e.target.value)}
                                                                                                    placeholder="Ex: Leite, Carne, Banana, Abacaxi, Alface, Repolho, Couve, Cacau, Café, Tomate"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-auto">
                                                                                                <label className="form-label small mb-1 d-block">&nbsp;</label>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-sm btn-danger"
                                                                                                    onClick={() => removeValueChain(chainType, index)}
                                                                                                >
                                                                                                    Remover
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div>
                                                                                            <label className="form-label small mb-2 fw-semibold">Mercados acessados:</label>
                                                                                            <div className="row g-2">
                                                                                                {marketOptions.map(market => (
                                                                                                    <div key={market.value} className="col-md-3">
                                                                                                        <div className="form-check">
                                                                                                            <input
                                                                                                                type="checkbox"
                                                                                                                className="form-check-input"
                                                                                                                id={`${chainType}-${index}-${market.value}`}
                                                                                                                checked={chain.mercados?.includes(market.value) || false}
                                                                                                                onChange={() => updateValueChainMarkets(chainType, index, market.value)}
                                                                                                            />
                                                                                                            <label className="form-check-label small" htmlFor={`${chainType}-${index}-${market.value}`}>
                                                                                                                {market.label}
                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Renderização especial para capacidade de atendimento (grupo 16) */}
                                            {groupNum === 16 && answers.capacidade_atendimento && Array.isArray(answers.capacidade_atendimento) && (answers.capacidade_atendimento.length > 0 || Object.values(equipments).some(arr => arr.length > 0)) && (
                                                <div className="col-12">
                                                    <div className="card bg-light">
                                                        <div className="card-body">
                                                            <h6 className="card-title mb-3">Quantidade de Equipamentos/Máquinas</h6>
                                                            {(answers.capacidade_atendimento as string[]).map(equipType => {
                                                                const equipmentsOfType = equipments[equipType] || [];
                                                                const equipLabel = visibleQuestions.find((q: any) => q.id === "capacidade_atendimento")
                                                                    ?.options?.find((opt: any) => opt.value === equipType)?.label || equipType;

                                                                return (
                                                                    <div key={equipType} className="mb-4 pb-3 border-bottom">
                                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                                            <div className="col-sm-9">
                                                                                <strong className="text-primary">{equipLabel}</strong>
                                                                                {equipmentsOfType.length > 0 && (
                                                                                    <span className="badge bg-info ms-2">
                                                                                        Total registrado: {equipmentsOfType.reduce((sum, e) => sum + parseInt(e.quantity || "0"), 0)}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-sm btn-success"
                                                                                onClick={() => addEquipment(equipType)}
                                                                            >
                                                                                + Adicionar
                                                                            </button>
                                                                        </div>

                                                                        {equipmentsOfType.length === 0 ? (
                                                                            <p className="text-muted small mb-0">Nenhuma quantidade adicionada. Clique em "Adicionar" para inserir.</p>
                                                                        ) : (
                                                                            equipmentsOfType.map((equip, index) => (
                                                                                <div key={index} className="row g-2 mb-2 align-items-end">
                                                                                    <div className="col-sm-1">
                                                                                        <label className="form-label small mb-1">#</label>
                                                                                        <div className="form-control form-control-sm text-center bg-light">{index + 1}</div>
                                                                                    </div>
                                                                                    {equipType === "outros_equipamentos" && (
                                                                                        <div className="col-sm-4">
                                                                                            <label className="form-label small mb-1">Nome do Equipamento</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control form-control-sm"
                                                                                                value={equip.name || ""}
                                                                                                onChange={e => updateEquipmentName(equipType, index, e.target.value)}
                                                                                                placeholder="Descrever o equipamento"
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                    <div className="col-sm-2">
                                                                                        <label className="form-label small mb-1">Quantidade</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            className="form-control form-control-sm"
                                                                                            value={equip.quantity}
                                                                                            onChange={e => updateEquipmentQuantity(equipType, index, e.target.value)}
                                                                                            placeholder="Qtd"
                                                                                            min="0"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-sm-1">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-sm btn-danger w-100"
                                                                                            onClick={() => removeEquipment(equipType, index)}
                                                                                        >
                                                                                            Remover
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Renderização especial para profissionais (grupo 13) */}
                                            {groupNum === 13 && answers.tipos_profissionais && Array.isArray(answers.tipos_profissionais) && (answers.tipos_profissionais.length > 0 || Object.values(professionals).some(arr => arr.length > 0)) && (
                                                <div className="col-12">
                                                    <div className="card bg-light">
                                                        <div className="card-body">
                                                            <h6 className="card-title mb-3">Detalhes dos Profissionais</h6>
                                                            {(answers.tipos_profissionais as string[]).map(profType => {
                                                                const professionalsOfType = professionals[profType] || [];
                                                                const profLabel = visibleQuestions.find((q: any) => q.id === "tipos_profissionais")
                                                                    ?.options?.find((opt: any) => opt.value === profType)?.label || profType;

                                                                return (
                                                                    <div key={profType} className="mb-4 pb-3 border-bottom">
                                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                                            <div className="col-sm-9">
                                                                                <strong className="text-primary">{profLabel}</strong>
                                                                                {professionalsOfType.length > 0 && (
                                                                                    <span className="badge bg-info ms-2">
                                                                                        Quantidade: {professionalsOfType.length}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-sm btn-success"
                                                                                onClick={() => addProfessional(profType)}
                                                                            >
                                                                                + Adicionar
                                                                            </button>
                                                                        </div>

                                                                        {professionalsOfType.length === 0 ? (
                                                                            <p className="text-muted small mb-0">Nenhum profissional adicionado. Clique em "Adicionar" para inserir.</p>
                                                                        ) : (
                                                                            professionalsOfType.map((prof, index) => (
                                                                                <div key={index} className="row g-2 mb-2 align-items-end">
                                                                                    <div className="col-sm-1">
                                                                                        <label className="form-label small mb-1">#</label>
                                                                                        <div className="form-control form-control-sm text-center bg-light">{index + 1}</div>
                                                                                    </div>
                                                                                    {profType === "outro_profissional" && (
                                                                                        <div className="col-sm-5">
                                                                                            <label className="form-label small mb-1">Area de Atuação</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control form-control-sm"
                                                                                                value={prof.profession || ""}
                                                                                                onChange={e => updateProfessional(profType, index, "profession", e.target.value)}
                                                                                                placeholder="Digite a Area de atuação"
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                    <div className={profType === "outro_profissional" ? "col-sm-5" : "col-sm-10"}>
                                                                                        <label className="form-label small mb-1">Instituição de Origem do servidor</label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control form-control-sm"
                                                                                            value={prof.institution}
                                                                                            onChange={e => updateProfessional(profType, index, "institution", e.target.value)}
                                                                                            placeholder="Digite a instituição"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-sm-1">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-sm btn-danger w-100"
                                                                                            onClick={() => removeProfessional(profType, index)}
                                                                                        >
                                                                                            Remover
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Alerta para pergunta 17 - público agricultura familiar */}
                                            {groupNum === 17 && answers.publico_agricultura_familiar === "nao" && (
                                                <div className="col-12">
                                                    <div className="alert alert-warning" role="alert">
                                                        <h6 className="alert-heading">⚠️ Atenção</h6>
                                                        <p className="mb-0">
                                                            A atribuição da SEAF é direcionada à agricultura familiar.
                                                            Caso o público não seja da agricultura familiar, esta solicitação pode não ser atendida.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </fieldset>
                        </div>

                        {!viewMode && (
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary px-4"
                                    onClick={() => navigate("/")}
                                >
                                    Voltar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary px-4"
                                    onClick={() => {
                                        setAnswers({});
                                        setProfessionals({});
                                        setValueChains({});
                                        setEquipments({});
                                        setProducerList([]);
                                        setSeedlingProducerList([]);
                                        setBeneficiaries([]);
                                    }}
                                >
                                    Limpar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary px-4"
                                    disabled={submitting}
                                    onClick={async () => {
                                        setSubmitting(true);
                                        try {
                                            const rawData = {
                                                formType,
                                                ...answers,
                                                professionals,
                                                valueChains,
                                                equipments,
                                                producerList,
                                                seedlingProducerList,
                                                beneficiaries
                                            };

                                            // Formatar dados em estrutura organizada e traduzida
                                            const payloadFormatado = formatFormData(rawData);

                                            console.log(`=== ${editMode ? 'ATUALIZANDO' : 'ENVIANDO'} PARA API ===`);
                                            console.log(JSON.stringify({ payloadFormatado }, null, 2));

                                            // Enviar para API (POST para criar, PUT para atualizar)
                                            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                                            const url = editMode && id
                                                ? `${API_URL}/api/planos/${id}`
                                                : `${API_URL}/api/planos`;
                                            const method = editMode ? 'PUT' : 'POST';

                                            const response = await fetch(url, {
                                                method,
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    payloadFormatado,
                                                    payloadOriginal: rawData, // Opcional: salvar dados brutos também
                                                }),
                                            });

                                            const result = await response.json();

                                            if (response.ok && result.success) {
                                                console.log(`✅ Plano ${editMode ? 'atualizado' : 'criado'}:`, result.data);
                                                alert(`Formulário ${editMode ? 'atualizado' : 'enviado'} com sucesso!\n\nID: ${result.data.id}\nProponente: ${result.data.nomeProponente}\nMunicípio: ${result.data.municipio}`);

                                                // Limpar formulário após sucesso
                                                setAnswers({});
                                                setProfessionals({});
                                                setValueChains({});
                                                setEquipments({});
                                                setProducerList([]);
                                                setSeedlingProducerList([]);
                                                setBeneficiaries([]);

                                                // Voltar para home após 1 segundo
                                                setTimeout(() => navigate("/"), 1000);
                                            } else {
                                                console.error("❌ Erro na API:", result);
                                                alert(`Erro ao ${editMode ? 'atualizar' : 'enviar'} formulário:\n${result.error || 'Erro desconhecido'}`);
                                            }
                                        } catch (error) {
                                            console.error("❌ Erro ao enviar:", error);
                                            alert(`Erro ao ${editMode ? 'atualizar' : 'enviar'} formulário:\n${error instanceof Error ? error.message : 'Erro de conexão'}`);
                                        } finally {
                                            setSubmitting(false);
                                        }
                                    }}
                                >
                                    {submitting ? (editMode ? 'Atualizando...' : 'Enviando...') : (editMode ? 'Atualizar' : 'Enviar')}
                                </button>
                            </div>
                        )}

                        {viewMode && (
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                <button
                                    type="button"
                                    className="btn btn-secondary px-4"
                                    onClick={() => {
                                        // Ativar modo de edição
                                        navigate(`/form/${id}?editMode=true`);
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary px-4"
                                    onClick={() => navigate("/")}
                                >
                                    Voltar para Lista
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
