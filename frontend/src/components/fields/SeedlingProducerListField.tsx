export interface SeedlingProducer {
    nome: string;
    cpf: string;
    cadeiaValor: string;
    cultivar: string;
    quantidade: string; // unidades
    area: string; // hectares
    cadeiaOutras?: string; // descrição quando cadeia = "Outras"
    mercados: string[]; // checkbox-group
}

interface SeedlingProducerListFieldProps {
    id: string;
    label: string;
    value: SeedlingProducer[];
    onChange: (value: SeedlingProducer[]) => void;
    required?: boolean;
}

const MERCADOS_OPTIONS = [
    { value: 'pnae', label: 'PNAE' },
    { value: 'paa', label: 'PAA' },
    { value: 'feiras_locais', label: 'Feiras Locais' },
    { value: 'mercados_privados', label: 'Mercados Privados' },
    { value: 'varejo_informal', label: 'Varejo/Informal' },
    { value: 'export_intermunicipal', label: 'Export. Intermunicipal' },
    { value: 'export_interestadual', label: 'Export. Interestadual' },
    { value: 'export_internacional', label: 'Export. Internacional' }
];

export default function SeedlingProducerListField({
    id,
    label: _label,
    value = [],
    onChange,
    required
}: SeedlingProducerListFieldProps) {
    const handleAdd = () => {
        const newProducer: SeedlingProducer = {
            nome: '',
            cpf: '',
            cadeiaValor: '',
            cultivar: '',
            quantidade: '',
            cadeiaOutras: '',
            area: '',
            mercados: []
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

    const handleUpdate = (index: number, field: keyof SeedlingProducer, fieldValue: any) => {
        const updated = value.map((producer, i) =>
            i === index ? { ...producer, [field]: fieldValue } : producer
        );
        onChange(updated);
    };

    const handleMercadosChange = (index: number, mercado: string, checked: boolean) => {
        const producer = value[index];
        const updatedMercados = checked
            ? [...producer.mercados, mercado]
            : producer.mercados.filter(m => m !== mercado);
        handleUpdate(index, 'mercados', updatedMercados);
    };

    // Cálculo de totais
    const totals = value.reduce((acc, producer) => {
        const quantidade = parseFloat(producer.quantidade) || 0;
        const area = parseFloat(producer.area) || 0;

        return {
            quantidade: acc.quantidade + quantidade,
            area: acc.area + area
        };
    }, { quantidade: 0, area: 0 });

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
                            <th style={{ width: '40px' }}>#</th>
                            <th style={{ width: '200px' }}>Nome/Beneficiário</th>
                            <th style={{ width: '130px' }}>CPF</th>
                            <th style={{ width: '150px' }}>Cadeia de Valor</th>
                            <th style={{ width: '150px' }}>Cultivar</th>
                            <th style={{ width: '120px' }}>Qtd. (unid.)</th>
                            <th style={{ width: '110px' }}>Área de implantação (ha)</th>
                            <th style={{ width: '350px' }}>Mercados a serem Acessados</th>
                            <th style={{ width: '70px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center text-muted">
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
                                        <select
                                            className="form-select form-select-sm"
                                            value={producer.cadeiaValor}
                                            onChange={e => handleUpdate(index, 'cadeiaValor', e.target.value)}
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Banana">Banana</option>
                                            <option value="Cacau">Cacau</option>
                                            <option value="Café">Café</option>
                                            <option value="Laranja">Laranja</option>
                                            <option value="Limão">Limão</option>
                                            <option value="Maracujá">Maracujá</option>
                                            <option value="Alface">Alface</option>
                                            <option value="Tomate">Tomate</option>
                                            <option value="Repolho">Repolho</option>
                                            <option value="Cheiro Verde">Cheiro Verde</option>
                                            <option value="Rúcula">Rúcula</option>
                                            <option value="Outras">Outras</option>
                                        </select>
                                        {producer.cadeiaValor === 'Outras' && (
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
                                            value={producer.cultivar}
                                            onChange={e => handleUpdate(index, 'cultivar', e.target.value)}
                                            placeholder="Ex: Terra Anã"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            value={producer.quantidade}
                                            onChange={e => handleUpdate(index, 'quantidade', e.target.value)}
                                            placeholder="1666"
                                            min="0"
                                            step="1"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            value={producer.area}
                                            onChange={e => handleUpdate(index, 'area', e.target.value)}
                                            placeholder="1"
                                            min="0"
                                            step="0.1"
                                        />
                                    </td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-1" style={{ fontSize: '0.75rem' }}>
                                            {MERCADOS_OPTIONS.map(opt => (
                                                <div key={opt.value} className="form-check form-check-inline mb-0">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`${id}-${index}-${opt.value}`}
                                                        checked={producer.mercados.includes(opt.value)}
                                                        onChange={e => handleMercadosChange(index, opt.value, e.target.checked)}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`${id}-${index}-${opt.value}`}
                                                        style={{ fontSize: '0.7rem' }}
                                                    >
                                                        {opt.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
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
                                <td colSpan={5} className="text-end">TOTAL GERAL:</td>
                                <td>{totals.quantidade.toFixed(0)}</td>
                                <td>{totals.area.toFixed(2)}</td>
                                <td colSpan={2}></td>
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
                <i className="bi bi-plus-circle"></i> + Adicionar Produtor
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
