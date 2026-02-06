export interface Producer {
    nome: string;
    cpf: string;
    quantidade: string; // toneladas
    area: string; // hectares
    recomendacao: string; // ton/ha
    cadeia: string;
    cadeiaOutras?: string; // descrição quando cadeia = "Outras"
    laudo: string; // nº laudo e código laboratório
    dataAnalise: string; // date
}

interface ProducerListFieldProps {
    id: string;
    label: string;
    value: Producer[];
    onChange: (value: Producer[]) => void;
    required?: boolean;
}

export default function ProducerListField({
    id: _id,
    label: _label,
    value = [],
    onChange,
    required
}: ProducerListFieldProps) {
    const handleAdd = () => {
        const newProducer: Producer = {
            nome: '',
            cpf: '',
            quantidade: '',
            area: '',
            recomendacao: '',
            cadeia: '',
            cadeiaOutras: '',
            laudo: '',
            dataAnalise: ''
        };
        onChange([...value, newProducer]);
    };

    const handleRemove = (index: number) => {
        if (required && value.length <= 1) {
            alert('Deve haver ao menos um produtor na lista');
            return;
        }
        onChange(value.filter((_, i) => i !== index));
    };

    const handleUpdate = (index: number, field: keyof Producer, fieldValue: string) => {
        const updated = value.map((producer, i) =>
            i === index ? { ...producer, [field]: fieldValue } : producer
        );
        onChange(updated);
    };

    // Cálculo de totais
    const totals = value.reduce((acc, producer) => {
        const quantidade = parseFloat(producer.quantidade) || 0;
        const area = parseFloat(producer.area) || 0;
        const recomendacao = parseFloat(producer.recomendacao) || 0;

        return {
            quantidade: acc.quantidade + quantidade,
            area: acc.area + area,
            recomendacao: acc.recomendacao + recomendacao
        };
    }, { quantidade: 0, area: 0, recomendacao: 0 });

    // Validação simples de CPF (formato)
    const validateCPF = (cpf: string): boolean => {
        const cleaned = cpf.replace(/\D/g, '');
        return cleaned.length === 11;
    };

    // Formatar CPF enquanto digita
    const formatCPF = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 11) {
            return cleaned
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        return value;
    };

    return (
        <div className="mb-4">

            <div className="table-responsive">
                <table className="table table-bordered table-hover" style={{ minWidth: '1400px' }}>
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '50px' }}>#</th>
                            <th style={{ width: '200px' }}>Nome/Beneficiário</th>
                            <th style={{ width: '140px' }}>CPF</th>
                            <th style={{ width: '100px' }}>Qtd. (ton)</th>
                            <th style={{ width: '110px' }}>Área de aplicação (ha)</th>
                            <th style={{ width: '120px' }}>Recomendação de Calagem (ton/ha)</th>
                            <th style={{ width: '150px' }}>Cadeia Produtiva</th>
                            <th style={{ width: '220px' }}>Nº Laudo/Laboratório - Análise solo</th>
                            <th style={{ width: '130px' }}>Data da Análise</th>
                            <th style={{ width: '60px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="text-center text-muted">
                                    Nenhum produtor adicionado. Clique em "+ Adicionar Produtor" para começar.
                                </td>
                            </tr>
                        ) : (
                            value.map((producer, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <span className="badge bg-secondary">{index + 1}</span>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={producer.nome}
                                            onChange={e => handleUpdate(index, 'nome', e.target.value)}
                                            placeholder="Ex: Fulano da Silva"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={`form-control form-control-sm ${producer.cpf && !validateCPF(producer.cpf) ? 'is-invalid' : ''}`}
                                            value={producer.cpf}
                                            onChange={e => handleUpdate(index, 'cpf', formatCPF(e.target.value))}
                                            placeholder="000.000.000-00"
                                            maxLength={14}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            value={producer.quantidade}
                                            onChange={e => handleUpdate(index, 'quantidade', e.target.value)}
                                            placeholder="10"
                                            min="0"
                                            step="0.1"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            value={producer.area}
                                            onChange={e => handleUpdate(index, 'area', e.target.value)}
                                            placeholder="5"
                                            min="0"
                                            step="0.1"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            value={producer.recomendacao}
                                            onChange={e => handleUpdate(index, 'recomendacao', e.target.value)}
                                            placeholder="2"
                                            min="0"
                                            step="0.1"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm"
                                            value={producer.cadeia}
                                            onChange={e => handleUpdate(index, 'cadeia', e.target.value)}
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Bovinocultura">Bovinocultura</option>
                                            <option value="Avicultura">Avicultura</option>
                                            <option value="Piscicultura">Piscicultura</option>
                                            <option value="Fruticultura">Fruticultura</option>
                                            <option value="Horticultura">Horticultura</option>
                                            <option value="Café">Café</option>
                                            <option value="Cacau">Cacau</option>
                                            <option value="Outras">Outras</option>
                                        </select>
                                        {producer.cadeia === 'Outras' && (
                                            <input
                                                type="text"
                                                className="form-control form-control-sm mt-1"
                                                value={producer.cadeiaOutras || ''}
                                                onChange={e => handleUpdate(index, 'cadeiaOutras', e.target.value)}
                                                placeholder="Especifique a cadeia produtiva..."
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={producer.laudo}
                                            onChange={e => handleUpdate(index, 'laudo', e.target.value)}
                                            placeholder="4417/22100 - Lab Solo Certo"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            value={producer.dataAnalise}
                                            onChange={e => handleUpdate(index, 'dataAnalise', e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemove(index)}
                                            title="Remover produtor"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        {value.length > 0 && (
                            <tr className="table-info fw-bold">
                                <td colSpan={3} className="text-end">TOTAL GERAL:</td>
                                <td>{totals.quantidade.toFixed(2)}</td>
                                <td>{totals.area.toFixed(2)}</td>
                                <td>{totals.recomendacao.toFixed(2)}</td>
                                <td colSpan={4}></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleAdd}
            >
                <i className="bi bi-plus-circle"></i> Adicionar Produtor
            </button>

            {value.length > 0 && (
                <div className="mt-2">
                    <small className="text-muted">
                        <i className="bi bi-info-circle"></i> Total de produtores: <strong>{value.length}</strong>
                    </small>
                </div>
            )}
        </div>
    );
}
