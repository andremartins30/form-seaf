import { useState } from 'react';
import MapModal from '../MapModal';

export interface Beneficiary {
    identificacao: string;
    perfil: string;
    perfilOutros?: string;
    quantidadeFamilias: string;
    latitude: string;
    longitude: string;
    cadeiaValor: string[];
    cadeiaValorOutros?: string;
    principaisProdutos: string[];
    principaisProdutosOutros?: string;
    sistemaProducao: string;
    sistemaProducaoOutro?: string;
    mercadosAcessados: string[];
}

interface BeneficiaryListFieldProps {
    value: Beneficiary[];
    onChange: (value: Beneficiary[]) => void;
    disabled?: boolean;
}

const perfilOptions = [
    { value: "agricultores_tradicionais", label: "Agricultores Familiares Tradicionais" },
    { value: "assentados", label: "Assentados" },
    { value: "povos_indigenas", label: "Povos Indígenas" },
    { value: "povos_quilombolas", label: "Povos Quilombolas" },
    { value: "outros", label: "Outros" }
];

const cadeiaValorOptions = [
    { value: "leite", label: "Leite" },
    { value: "corte", label: "Corte" },
    { value: "fruticultura", label: "Fruticultura" },
    { value: "horticultura", label: "Horticultura" },
    { value: "cacau", label: "Cacau" },
    { value: "cafe", label: "Café" },
    { value: "mandioca", label: "Mandioca" },
    { value: "outros", label: "Outros" }
];

const produtosOptions = [
    { value: "leite", label: "Leite" },
    { value: "carne", label: "Carne" },
    { value: "banana", label: "Banana" },
    { value: "abacaxi", label: "Abacaxi" },
    { value: "alface", label: "Alface" },
    { value: "repolho", label: "Repolho" },
    { value: "couve", label: "Couve" },
    { value: "cacau", label: "Cacau" },
    { value: "cafe", label: "Café" },
    { value: "tomate", label: "Tomate" },
    { value: "outros", label: "Outros" }
];

const sistemaProducaoOptions = [
    { value: "convencional", label: "Convencional" },
    { value: "organico", label: "Orgânico" },
    { value: "outro", label: "Outro" }
];

const mercadosOptions = [
    { value: "pnae", label: "PNAE" },
    { value: "paa", label: "PAA" },
    { value: "feiras_locais", label: "Feiras Locais" },
    { value: "mercados_privados", label: "Mercados Privados" },
    { value: "varejo_informal", label: "Varejo/Informal" },
    { value: "export_intermunicipal", label: "Export. Intermunicipal" },
    { value: "export_interestadual", label: "Export. Interestadual" },
    { value: "export_internacional", label: "Export. Internacional" }
];

export default function BeneficiaryListField({ value, onChange, disabled = false }: BeneficiaryListFieldProps) {
    const [showMapModal, setShowMapModal] = useState(false);
    const [currentBeneficiaryIndex, setCurrentBeneficiaryIndex] = useState<number | null>(null);

    const addBeneficiary = () => {
        onChange([
            ...value,
            {
                identificacao: "",
                perfil: "",
                quantidadeFamilias: "",
                latitude: "",
                longitude: "",
                cadeiaValor: [],
                principaisProdutos: [],
                sistemaProducao: "",
                mercadosAcessados: []
            }
        ]);
    };

    const removeBeneficiary = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateBeneficiary = (index: number, field: keyof Beneficiary, fieldValue: string | string[]) => {
        onChange(
            value.map((ben, i) =>
                i === index ? { ...ben, [field]: fieldValue } : ben
            )
        );
    };

    const toggleCheckbox = (index: number, field: 'cadeiaValor' | 'principaisProdutos' | 'mercadosAcessados', checkValue: string) => {
        const beneficiary = value[index];
        const currentValues = beneficiary[field] || [];
        const newValues = currentValues.includes(checkValue)
            ? currentValues.filter(v => v !== checkValue)
            : [...currentValues, checkValue];
        updateBeneficiary(index, field, newValues);
    };

    const openMapModal = (index: number) => {
        setCurrentBeneficiaryIndex(index);
        setShowMapModal(true);
    };

    const handleMapConfirm = (lat: string, lng: string) => {
        if (currentBeneficiaryIndex !== null) {
            onChange(
                value.map((ben, i) =>
                    i === currentBeneficiaryIndex
                        ? { ...ben, latitude: lat, longitude: lng }
                        : ben
                )
            );
        }
    };

    return (
        <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label fw-semibold mb-0">Beneficiários</label>
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={addBeneficiary}
                    disabled={disabled}
                >
                    <i className="bi bi-plus-circle me-1"></i>
                    Adicionar Beneficiário
                </button>
            </div>

            {value.length === 0 && (
                <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    Clique em "Adicionar Beneficiário" para começar
                </div>
            )}

            {value.map((beneficiary, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Beneficiário {index + 1}</h6>
                        <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => removeBeneficiary(index)}
                            disabled={disabled}
                        >
                            <i className="bi bi-trash"></i> Remover
                        </button>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            {/* Identificação */}
                            <div className="col-md-6">
                                <label className="form-label small">
                                    Identificação (Comunidade, Assentamento, entre outros)
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={beneficiary.identificacao}
                                    onChange={e => updateBeneficiary(index, 'identificacao', e.target.value)}
                                    placeholder="Ex: Comunidade Rural São José"
                                    disabled={disabled}
                                />
                            </div>

                            {/* Perfil */}
                            <div className="col-md-6">
                                <label className="form-label small">Perfil dos Beneficiários</label>
                                <select
                                    className="form-select form-select-sm mb-2"
                                    value={beneficiary.perfil}
                                    onChange={e => updateBeneficiary(index, 'perfil', e.target.value)}
                                    disabled={disabled}
                                >
                                    <option value="">Selecione...</option>
                                    {perfilOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {beneficiary.perfil === 'outros' && (
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={beneficiary.perfilOutros || ''}
                                        onChange={e => updateBeneficiary(index, 'perfilOutros', e.target.value)}
                                        placeholder="Especifique o perfil"
                                        disabled={disabled}
                                    />
                                )}
                            </div>

                            {/* Quantidade de Famílias */}
                            <div className="col-md-4">
                                <label className="form-label small">Quantidade de Famílias</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={beneficiary.quantidadeFamilias}
                                    onChange={e => updateBeneficiary(index, 'quantidadeFamilias', e.target.value)}
                                    placeholder="0"
                                    disabled={disabled}
                                />
                            </div>

                            {/* Geolocalização */}
                            <div className="col-12">
                                <label className="form-label small fw-semibold">Geolocalização</label>
                                <div className="row g-2">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={beneficiary.latitude}
                                            onChange={e => updateBeneficiary(index, 'latitude', e.target.value)}
                                            placeholder="Latitude: Ex: -12.345678"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={beneficiary.longitude}
                                            onChange={e => updateBeneficiary(index, 'longitude', e.target.value)}
                                            placeholder="Longitude: Ex: -38.123456"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm w-100"
                                            onClick={() => openMapModal(index)}
                                            disabled={disabled}
                                        >
                                            <i className="bi bi-geo-alt-fill me-1"></i>
                                            Selecionar no Mapa
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Cadeia de Valor */}
                            <div className="col-md-6">
                                <label className="form-label small">Cadeia de Valor</label>
                                <div className="border rounded p-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    {cadeiaValorOptions.map(opt => (
                                        <div key={opt.value} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`cadeia_${index}_${opt.value}`}
                                                checked={beneficiary.cadeiaValor?.includes(opt.value) || false}
                                                onChange={() => toggleCheckbox(index, 'cadeiaValor', opt.value)}
                                                disabled={disabled}
                                            />
                                            <label className="form-check-label small" htmlFor={`cadeia_${index}_${opt.value}`}>
                                                {opt.label}
                                            </label>
                                        </div>
                                    ))}
                                    {beneficiary.cadeiaValor?.includes('outros') && (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={beneficiary.cadeiaValorOutros || ''}
                                                onChange={e => updateBeneficiary(index, 'cadeiaValorOutros', e.target.value)}
                                                placeholder="Especifique outras cadeias"
                                                disabled={disabled}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Principais Produtos */}
                            <div className="col-md-6">
                                <label className="form-label small">Principais Produtos</label>
                                <div className="border rounded p-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    {produtosOptions.map(opt => (
                                        <div key={opt.value} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`produto_${index}_${opt.value}`}
                                                checked={beneficiary.principaisProdutos?.includes(opt.value) || false}
                                                onChange={() => toggleCheckbox(index, 'principaisProdutos', opt.value)}
                                                disabled={disabled}
                                            />
                                            <label className="form-check-label small" htmlFor={`produto_${index}_${opt.value}`}>
                                                {opt.label}
                                            </label>
                                        </div>
                                    ))}
                                    {beneficiary.principaisProdutos?.includes('outros') && (
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={beneficiary.principaisProdutosOutros || ''}
                                                onChange={e => updateBeneficiary(index, 'principaisProdutosOutros', e.target.value)}
                                                placeholder="Especifique outros produtos"
                                                disabled={disabled}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sistema de Produção */}
                            <div className="col-md-6">
                                <label className="form-label small">Sistema de Produção</label>
                                <select
                                    className="form-select form-select-sm mb-2"
                                    value={beneficiary.sistemaProducao}
                                    onChange={e => updateBeneficiary(index, 'sistemaProducao', e.target.value)}
                                    disabled={disabled}
                                >
                                    <option value="">Selecione...</option>
                                    {sistemaProducaoOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {beneficiary.sistemaProducao === 'outro' && (
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={beneficiary.sistemaProducaoOutro || ''}
                                        onChange={e => updateBeneficiary(index, 'sistemaProducaoOutro', e.target.value)}
                                        placeholder="Especifique o sistema de produção"
                                        disabled={disabled}
                                    />
                                )}
                            </div>

                            {/* Mercados Acessados */}
                            <div className="col-md-6">
                                <label className="form-label small">Mercados Acessados</label>
                                <div className="border rounded p-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    {mercadosOptions.map(opt => (
                                        <div key={opt.value} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`mercado_${index}_${opt.value}`}
                                                checked={beneficiary.mercadosAcessados?.includes(opt.value) || false}
                                                onChange={() => toggleCheckbox(index, 'mercadosAcessados', opt.value)}
                                                disabled={disabled}
                                            />
                                            <label className="form-check-label small" htmlFor={`mercado_${index}_${opt.value}`}>
                                                {opt.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Modal de Mapa */}
            <MapModal
                show={showMapModal}
                onClose={() => setShowMapModal(false)}
                onConfirm={handleMapConfirm}
                initialLat={currentBeneficiaryIndex !== null ? value[currentBeneficiaryIndex]?.latitude : ''}
                initialLng={currentBeneficiaryIndex !== null ? value[currentBeneficiaryIndex]?.longitude : ''}
            />
        </div>
    );
}
