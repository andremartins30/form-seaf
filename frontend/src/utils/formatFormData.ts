/**
 * Traduções de valores do formulário para português
 */
const translations: Record<string, string> = {
    // Sim/Não
    'sim': 'Sim',
    'nao': 'Não',
    'parcial': 'Parcial',

    // Grau de importância
    'alto': 'Alto',
    'medio': 'Médio',
    'baixo': 'Baixo',
    'inexistente': 'Inexistente',

    // Tipos de comunidades
    'comunidades_tradicionais': 'Comunidades tradicionais',
    'comunidades_indigenas': 'Comunidades indígenas',
    'quilombolas': 'Quilombolas',
    'assentamentos': 'Assentamentos',
    'associacoes': 'Associações de produtores',
    'comunidades_outras': 'Comunidades outras',
    'cooperativas': 'Cooperativas de produtores',

    // Cadeias de valor
    'leite': 'Bovinocultura de leite',
    'corte': 'Bovinocultura de corte',
    'avicultura': 'Avicultura',
    'piscicultura': 'Piscicultura',
    'agroindustria': 'Agroindústria',
    'fruticultura': 'Fruticultura',
    'horticultura': 'Horticultura',
    'cafe': 'Café',
    'cacau': 'Cacau',
    'extrativismo': 'Extrativismo',
    'outras': 'Outras',

    // Tipos de profissionais
    'gestor': 'Gestor (Secretário ou Presidente de OSCs)',
    'engenheiro_agronomo': 'Engenheiro Agrônomo/Áreas afins',
    'medico_veterinario': 'Médico Veterinário',
    'engenheiro_florestal': 'Engenheiro Florestal/Áreas afins',
    'tecnico_agricola': 'Técnico Agrícola/Agropecuário',
    'diretor_tecnico': 'Diretor Técnico',
    'assistente_social': 'Assistente Social',
    'motorista': 'Motorista',
    'administrativo': 'Administrativo',
    'operador_maquina': 'Operador de Máquina',
    'outro_profissional': 'Outro',

    // Dificuldades do proponente
    'mecanizacao_agricola': 'Mecanização agrícola compatível à demanda',
    'mecanizacao_infraestrutura': 'Mecanização de infraestrutura para estradas vicinais',
    'mecanizacao_construcao': 'Mecanização para construção de tanques, curvas de nível',
    'veiculos_deslocamento': 'Veículos para deslocamento dos profissionais',
    'veiculos_carga': 'Veículos de carga para transporte',
    'veiculo_producao': 'Veículo para transporte da produção',
    'veiculo_agua': 'Veículo para transporte de água',
    'outras_dificuldades': 'Outras dificuldades',

    // Desafios dos agricultores
    'acesso_assistencia_tecnica': 'Acesso à assistência técnica',
    'acesso_propriedades': 'Acesso às propriedades',
    'acesso_insumos': 'Acesso à insumos (calcário, mudas, sêmen bovino)',
    'transporte_insumos_producao': 'Transporte de insumos e produção',
    'irrigacao': 'Irrigação',
    'equipamentos_leite': 'Equipamentos para armazenamento de leite',
    'equipamentos_ordenha': 'Equipamentos para ordenhar vacas',
    'acesso_agua_seca': 'Acesso à água em períodos de seca',
    'outros_desafios': 'Outros desafios',

    // Equipamentos/Capacidade de atendimento
    'trator_75_80': 'Trator 75/80 CV',
    'trator_100_110': 'Trator 100/110 CV',
    'grade_aradora': 'Grade aradora',
    'grade_niveladora': 'Grade niveladora',
    'distribuidor_calcario': 'Distribuidor de calcário',
    'carreta_agricola': 'Carreta agrícola',
    'ensiladeria': 'Ensiladeria',
    'colhedora_milho': 'Colhedora de milho',
    'plantadeira_graos': 'Plantadeira de grãos',
    'plantadeira_mandioca': 'Plantadeira de rama de mandioca',
    'plantadeira_abacaxi': 'Plantadeira de abacaxi',
    'rocadeira_hidraulica': 'Roçadeira hidráulica',
    'veiculo': 'Veículo',
    'caminhao_bau': 'Caminhão baú',
    'caminhao_bau_refrigerado': 'Caminhão baú refrigerado',
    'caminhao_pipa': 'Caminhão pipa',
    'caminhao_truck_basculante': 'Caminhão truck basculante',
    'caminhao_cavalo_basculante': 'Caminhão cavalo mecânico com semirreboque basculante',
    'caminhao_cavalo_prancha': 'Caminhão cavalo mecânico com semirreboque prancha',
    'escavadeira_hidraulica': 'Escavadeira hidráulica',
    'motoniveladora': 'Motoniveladora',
    'pa_carregadeira': 'Pá carregadeira',
    'retroescavadeira': 'Retroescavadeira',
    'rolo_compactador': 'Rolo compactador',
    'outros_equipamentos': 'Outros equipamentos',

    // Mercados (cadeias de valor)
    'consumo_local': 'Consumo local (familiar)',
    'municipio': 'Município',
    'regiao': 'Região',
    'estado': 'Estado',
    'pais': 'País',
    'exportacao': 'Exportação',

    // Perfis de beneficiários
    'agricultores_tradicionais': 'Agricultores Familiares Tradicionais',
    'assentados': 'Assentados',
    'povos_indigenas': 'Povos Indígenas',
    'povos_quilombolas': 'Povos Quilombolas',
    'outros': 'Outros',

    // Sistema de produção
    'convencional': 'Convencional',
    'organico': 'Orgânico',
    'outro': 'Outro',

    // Mercados acessados
    'pnae': 'PNAE',
    'paa': 'PAA',
    'feiras_locais': 'Feiras Locais',
    'mercados_privados': 'Mercados Privados',
    'varejo_informal': 'Varejo/Informal',
    'export_intermunicipal': 'Export. Intermunicipal',
    'export_interestadual': 'Export. Interestadual',
    'export_internacional': 'Export. Internacional',

    // Cadeias de valor (beneficiários)
    'mandioca': 'Mandioca',

    // Metas e cronograma
    'demanda_espontanea': 'A utilização do bem será por ordem de demanda espontânea',
    'nao_se_aplica': 'Não se aplica devido às finalidades',

    // Form types
    'default': 'Padrão',
    'calcario': 'Calcário',
    'mudas': 'Mudas'
};

/**
 * Traduz um valor usando o dicionário de traduções
 */
function translateValue(value: string): string {
    return translations[value] || value;
}

/**
 * Traduz um array de valores
 */
function translateArray(values: string[]): string[] {
    return values.map(translateValue);
}

/**
 * Formata os dados do formulário em estrutura ordenada e traduzida
 */
export function formatFormData(rawData: any): any {
    const formatted: any = {
        // 1. Informações Básicas (Grupo 1-6)
        informacoes_contato: {
            nome_proponente: rawData.nome || '',
            cnpj: rawData.cnpj || '',
            municipio: rawData.municipio || '',
            telefone_1: rawData.telefone1 || '',
            telefone_2: rawData.telefone2 || '',
            email: rawData.email || ''
        }
    };

    // 2. Tipo de formulário e solicitação (Grupo 7)
    formatted.tipo_formulario = translateValue(rawData.formType || 'default');
    formatted.solicitacao = {
        categoria: rawData.categoria || '',
        item: rawData.item || ''
    };

    // 3. Agricultores Familiares (Grupo 8)
    if (rawData.possui_agricultores) {
        formatted.agricultores_familiares = {
            possui: translateValue(rawData.possui_agricultores),
            quantidade_familias: rawData.quantidade_agricultores || null
        };
    }

    // 4. Importância da Agricultura Familiar (Grupo 9)
    if (rawData.importancia_agricultura) {
        formatted.importancia_agricultura_familiar = translateValue(rawData.importancia_agricultura);
    }

    // 5. Organização em Comunidades (Grupo 10)
    if (rawData.organizados) {
        formatted.organizacao_comunidades = {
            organizados: translateValue(rawData.organizados),
            tipos_comunidades: rawData.tipos_comunidades ? translateArray(rawData.tipos_comunidades) : [],
            quantidades: {},
            comunidades_outras_descricao: rawData.descricao_comunidades_outras || null
        };

        // Adicionar quantidades específicas
        if (rawData.qtd_comunidades_tradicionais) {
            formatted.organizacao_comunidades.quantidades.comunidades_tradicionais = parseInt(rawData.qtd_comunidades_tradicionais);
        }
        if (rawData.qtd_comunidades_indigenas) {
            formatted.organizacao_comunidades.quantidades.comunidades_indigenas = parseInt(rawData.qtd_comunidades_indigenas);
        }
        if (rawData.qtd_quilombolas) {
            formatted.organizacao_comunidades.quantidades.quilombolas = parseInt(rawData.qtd_quilombolas);
        }
        if (rawData.qtd_assentamentos) {
            formatted.organizacao_comunidades.quantidades.assentamentos = parseInt(rawData.qtd_assentamentos);
        }
        if (rawData.qtd_associacoes) {
            formatted.organizacao_comunidades.quantidades.associacoes = parseInt(rawData.qtd_associacoes);
        }
        if (rawData.qtd_comunidades_outras) {
            formatted.organizacao_comunidades.quantidades.comunidades_outras = parseInt(rawData.qtd_comunidades_outras);
        }
        if (rawData.qtd_cooperativas) {
            formatted.organizacao_comunidades.quantidades.cooperativas = parseInt(rawData.qtd_cooperativas);
        }
    }

    // 6. Cadeias de Valor (Grupo 11)
    if (rawData.cadeias_valor) {
        formatted.cadeias_valor_principais = {
            tipos: translateArray(rawData.cadeias_valor),
            detalhes: []
        };

        // Adicionar detalhes das cadeias de valor (produtos e mercados)
        if (rawData.valueChains) {
            Object.entries(rawData.valueChains).forEach(([tipo, chains]: [string, any]) => {
                const tipoTraduzido = translateValue(tipo);
                (chains as any[]).forEach((chain: any) => {
                    formatted.cadeias_valor_principais.detalhes.push({
                        tipo: tipoTraduzido,
                        produto: chain.produto,
                        mercados: chain.mercados ? translateArray(chain.mercados) : []
                    });
                });
            });
        }
    }

    // 7. Políticas Públicas (Grupo 12)
    if (rawData.politicas_publicas) {
        formatted.politicas_publicas = {
            executa: translateValue(rawData.politicas_publicas),
            quais: rawData.quais_politicas || null
        };
    }

    // 8. Profissionais (Grupo 13)
    if (rawData.possui_profissionais) {
        formatted.profissionais = {
            possui_quadro: translateValue(rawData.possui_profissionais),
            tipos: rawData.tipos_profissionais ? translateArray(rawData.tipos_profissionais) : [],
            detalhes: []
        };

        // Adicionar detalhes dos profissionais
        if (rawData.professionals) {
            Object.entries(rawData.professionals).forEach(([tipo, profs]: [string, any]) => {
                const tipoTraduzido = translateValue(tipo);
                (profs as any[]).forEach((prof: any) => {
                    formatted.profissionais.detalhes.push({
                        tipo: tipoTraduzido,
                        instituicao: prof.institution
                    });
                });
            });
        }
    }

    // 9. Dificuldades do Proponente (Grupo 14)
    if (rawData.dificuldades_proponente) {
        formatted.dificuldades_proponente = {
            principais: translateArray(rawData.dificuldades_proponente),
            outras_descricao: rawData.outras_dificuldades_descricao || null
        };
    }

    // 10. Desafios dos Agricultores (Grupo 15)
    if (rawData.desafios_agricultores) {
        formatted.desafios_agricultores = {
            principais: translateArray(rawData.desafios_agricultores),
            outros_descricao: rawData.outros_desafios_descricao || null
        };
    }

    // 11. Capacidade de Atendimento (Grupo 16)
    if (rawData.capacidade_atendimento) {
        formatted.capacidade_atendimento = {
            equipamentos: translateArray(rawData.capacidade_atendimento),
            detalhes: []
        };

        // Adicionar detalhes dos equipamentos
        if (rawData.equipments) {
            Object.entries(rawData.equipments).forEach(([tipo, equips]: [string, any]) => {
                const tipoTraduzido = translateValue(tipo);
                (equips as any[]).forEach((equip: any) => {
                    formatted.capacidade_atendimento.detalhes.push({
                        tipo: tipoTraduzido,
                        nome: equip.name || null,
                        quantidade: parseInt(equip.quantity) || 0
                    });
                });
            });
        }
    }

    // 12. Público Agricultura Familiar (Grupo 17)
    if (rawData.publico_agricultura_familiar) {
        formatted.publico_agricultura_familiar = translateValue(rawData.publico_agricultura_familiar);
    }

    // 13. Identificação do Perfil do Público Beneficiário (Grupo 18)
    if (rawData.beneficiaries && rawData.beneficiaries.length > 0) {
        formatted.perfil_publico_beneficiario = rawData.beneficiaries.map((b: any) => ({
            identificacao: b.identificacao || '',
            perfil_beneficiarios: translateValue(b.perfil) || '',
            quantidade_familias: parseInt(b.quantidadeFamilias) || 0,
            geolocalizacao: {
                latitude: b.latitude || '',
                longitude: b.longitude || ''
            },
            cadeia_valor: b.cadeiaValor ? translateArray(b.cadeiaValor) : [],
            principais_produtos: b.principaisProdutos ? translateArray(b.principaisProdutos) : [],
            sistema_producao: translateValue(b.sistemaProducao) || '',
            mercados_acessados: b.mercadosAcessados ? translateArray(b.mercadosAcessados) : []
        }));
    }

    // 14. Metas e Cronograma de Execução (Grupo 19)
    if (rawData.metas_cronograma) {
        formatted.metas_cronograma_execucao = {
            opcao: translateValue(rawData.metas_cronograma),
            descricao: rawData.metas_cronograma_outro || null
        };
    }

    // 15. Lista de Produtores (se houver)
    if (rawData.producerList && rawData.producerList.length > 0) {
        formatted.lista_produtores = rawData.producerList.map((p: any) => ({
            nome: p.nome || '',
            cpf: p.cpf || '',
            quantidade_toneladas: parseFloat(p.quantidade) || 0,
            area_aplicacao_hectares: parseFloat(p.area) || 0,
            recomendacao_calagem_ton_ha: parseFloat(p.recomendacao) || 0,
            cadeia_produtiva: p.cadeia || '',
            cadeia_produtiva_outras: p.cadeiaOutras || null,
            laudo_analise_solo: p.laudo || '',
            data_analise_solo: p.dataAnalise || ''
        }));
    }

    // 16. Lista de Produtores de Mudas (se houver)
    if (rawData.seedlingProducerList && rawData.seedlingProducerList.length > 0) {
        formatted.lista_produtores_mudas = rawData.seedlingProducerList.map((p: any) => ({
            nome: p.nome || '',
            cpf: p.cpf || '',
            cadeia_valor: p.cadeiaValor || '',
            cadeia_valor_outras: p.cadeiaOutras || null,
            cultivar: p.cultivar || '',
            quantidade_unidades: parseInt(p.quantidade) || 0,
            area_implantacao_hectares: parseFloat(p.area) || 0,
            mercados_acessados: p.mercados || []
        }));
    }

    // 17. Compromissos e Responsabilidades (Grupos 20-24)
    formatted.compromissos = {
        gestao_administrativa_operacional: rawData.compromisso_gestao ? translateValue(rawData.compromisso_gestao) : null,
        local_armazenamento_adequado: rawData.local_armazenamento ? translateValue(rawData.local_armazenamento) : null,
        responsabiliza_custos: {
            resposta: rawData.responsabiliza_custos ? translateValue(rawData.responsabiliza_custos) : null,
            descricao: rawData.responsabiliza_custos_descricao || null
        },
        monitoramento_atividades: {
            resposta: rawData.monitoramento_atividades ? translateValue(rawData.monitoramento_atividades) : null,
            descricao: rawData.monitoramento_atividades_descricao || null
        },
        relatorio_anual: {
            resposta: rawData.relatorio_anual ? translateValue(rawData.relatorio_anual) : null,
            descricao: rawData.relatorio_anual_descricao || null
        }
    };

    // 18. Declaração de Veracidade (Grupo 25)
    if (rawData.declaracao_veracidade) {
        formatted.declaracao_veracidade = rawData.declaracao_veracidade === 'true' || rawData.declaracao_veracidade === true;
    }

    // 19. Local e Data da Proposta (Grupo 26)
    formatted.local_data_proposta = {
        local: rawData.local_proposta || '',
        data: rawData.data_proposta || ''
    };

    // 20. Responsáveis (Grupo 27)
    formatted.responsaveis = {
        responsavel_tecnico: rawData.responsavel_tecnico || '',
        gestor: rawData.gestor || ''
    };

    // Remover campos vazios/null recursivamente
    return removeEmptyFields(formatted);
}

/**
 * Remove campos vazios, null ou arrays vazios de um objeto recursivamente
 */
function removeEmptyFields(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.length > 0 ? obj.map(removeEmptyFields).filter(item => item !== null) : undefined;
    }

    if (obj !== null && typeof obj === 'object') {
        const cleaned: any = {};
        Object.entries(obj).forEach(([key, value]) => {
            const cleanedValue = removeEmptyFields(value);
            if (
                cleanedValue !== null &&
                cleanedValue !== undefined &&
                cleanedValue !== '' &&
                !(Array.isArray(cleanedValue) && cleanedValue.length === 0) &&
                !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)
            ) {
                cleaned[key] = cleanedValue;
            }
        });
        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }

    return obj !== '' && obj !== null && obj !== undefined ? obj : undefined;
}
