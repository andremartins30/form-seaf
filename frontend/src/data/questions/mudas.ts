import { commonQuestions } from './common';

// Formulário específico para Insumos/Mudas
export const mudasQuestions = [
    ...commonQuestions,

    // Select principal
    {
        id: "categoria",
        label: "Solicitação",
        type: "select",
        questionNumber: 7,
        group: 7,
    },

    // Subselect dinâmico
    {
        id: "item",
        label: "Item solicitado",
        type: "select",
        group: 7,
        showIf: (answers: any) => !!answers.categoria,
    },

    // Pergunta 8 - Possui agricultores familiares
    {
        id: "possui_agricultores",
        label: "Possui agricultores familiares no município?",
        type: "radio",
        questionNumber: 8,
        group: 8,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },
    {
        id: "quantidade_agricultores",
        label: "Quantidade de famílias",
        type: "number",
        group: 8,
        showIf: (answers: any) => answers.possui_agricultores === "sim"
    },

    // Pergunta 9 - Importância da agricultura familiar
    {
        id: "importancia_agricultura",
        label: "Qual o grau de importância da agricultura familiar municipal com relação à economia local:",
        type: "radio",
        questionNumber: 9,
        group: 9,
        options: [
            { value: "alto", label: "Alto" },
            { value: "medio", label: "Médio" },
            { value: "baixo", label: "Baixo" },
            { value: "inexistente", label: "Inexistente" }
        ]
    },

    // Pergunta 10 - Organizados em comunidades
    {
        id: "organizados",
        label: "Os agricultores familiares são organizados em comunidades, assentamento, entre outros:",
        type: "radio",
        questionNumber: 10,
        group: 10,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },
    {
        id: "tipos_comunidades",
        label: "Selecione os tipos de comunidades existentes:",
        type: "checkbox-group",
        group: 10,
        showIf: (answers: any) => answers.organizados === "sim",
    },
    {
        id: "qtd_comunidades_tradicionais",
        label: "Quantidade de comunidades tradicionais",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("comunidades_tradicionais")
    },
    {
        id: "qtd_comunidades_indigenas",
        label: "Quantidade de comunidades indígenas",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("comunidades_indigenas")
    },
    {
        id: "qtd_quilombolas",
        label: "Quantidade de comunidades quilombolas",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("quilombolas")
    },
    {
        id: "qtd_assentamentos",
        label: "Quantidade de assentamentos",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("assentamentos")
    },
    {
        id: "descricao_comunidades_outras",
        label: "Descreva o tipo de comunidade",
        type: "text",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("comunidades_outras")
    },
    {
        id: "qtd_comunidades_outras",
        label: "Quantidade de comunidades outras",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("comunidades_outras")
    },
    {
        id: "qtd_associacoes",
        label: "Quantidade de associações de produtores rurais",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("associacoes")
    },
    {
        id: "qtd_cooperativas",
        label: "Quantidade de cooperativas de produtores rurais",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("cooperativas")
    },

    // Pergunta 11 - Cadeias de valor (com mercados para cada)
    {
        id: "cadeias_valor",
        label: "Quais as principais cadeias de valor:",
        type: "checkbox-group",
        questionNumber: 11,
        group: 11,
        options: [
            { value: "leite", label: "Bovinocultura de leite" },
            { value: "corte", label: "Bovinocultura de corte" },
            { value: "avicultura", label: "Avicultura" },
            { value: "piscicultura", label: "Piscicultura" },
            { value: "agroindustria", label: "Agroindústria" },
            { value: "fruticultura", label: "Fruticultura (Banana, Cacau, Café, Laranja, Limão, Maracujá, Outros)" },
            { value: "horticultura", label: "Horticultura (Alface, Tomate, Repolho, Cheiro Verde, Rúcula)" },
            { value: "cafe", label: "Café" }
        ]
    },
    // Mercados para cada cadeia de valor selecionada
    {
        id: "mercados_leite",
        label: "Mercados acessados - Bovinocultura de leite:",
        type: "checkbox-group",
        group: 11,
        showIf: (answers: any) => answers.cadeias_valor?.includes("leite"),
        options: [
            { value: "pnae", label: "PNAE" },
            { value: "paa", label: "PAA" },
            { value: "feiras_locais", label: "Feiras Locais" },
            { value: "mercados_privados", label: "Mercados Privados" },
            { value: "varejo_informal", label: "Varejo/Informal" },
            { value: "export_intermunicipal", label: "Export. Intermunicipal" },
            { value: "export_interestadual", label: "Export. Interestadual" },
            { value: "export_internacional", label: "Export. Internacional" }
        ]
    },
    {
        id: "mercados_corte",
        label: "Mercados acessados - Bovinocultura de corte:",
        type: "checkbox-group",
        group: 11,
        showIf: (answers: any) => answers.cadeias_valor?.includes("corte"),
        options: [
            { value: "pnae", label: "PNAE" },
            { value: "paa", label: "PAA" },
            { value: "feiras_locais", label: "Feiras Locais" },
            { value: "mercados_privados", label: "Mercados Privados" },
            { value: "varejo_informal", label: "Varejo/Informal" },
            { value: "export_intermunicipal", label: "Export. Intermunicipal" },
            { value: "export_interestadual", label: "Export. Interestadual" },
            { value: "export_internacional", label: "Export. Internacional" }
        ]
    },
    {
        id: "mercados_avicultura",
        label: "Mercados acessados - Avicultura:",
        type: "checkbox-group",
        group: 11,
        showIf: (answers: any) => answers.cadeias_valor?.includes("avicultura"),
        options: [
            { value: "pnae", label: "PNAE" },
            { value: "paa", label: "PAA" },
            { value: "feiras_locais", label: "Feiras Locais" },
            { value: "mercados_privados", label: "Mercados Privados" },
            { value: "varejo_informal", label: "Varejo/Informal" },
            { value: "export_intermunicipal", label: "Export. Intermunicipal" },
            { value: "export_interestadual", label: "Export. Interestadual" },
            { value: "export_internacional", label: "Export. Internacional" }
        ]
    },
    {
        id: "mercados_piscicultura",
        label: "Mercados acessados - Piscicultura:",
        type: "checkbox-group",
        group: 11,
        showIf: (answers: any) => answers.cadeias_valor?.includes("piscicultura"),
        options: [
            { value: "pnae", label: "PNAE" },
            { value: "paa", label: "PAA" },
            { value: "feiras_locais", label: "Feiras Locais" },
            { value: "mercados_privados", label: "Mercados Privados" },
            { value: "varejo_informal", label: "Varejo/Informal" },
            { value: "export_intermunicipal", label: "Export. Intermunicipal" },
            { value: "export_interestadual", label: "Export. Interestadual" },
            { value: "export_internacional", label: "Export. Internacional" }
        ]
    },
    {
        id: "mercados_agroindustria",
        label: "Mercados acessados - Agroindústria:",
        type: "checkbox-group",
        group: 11,
        showIf: (answers: any) => answers.cadeias_valor?.includes("agroindustria"),
        options: [
            { value: "pnae", label: "PNAE" },
            { value: "paa", label: "PAA" },
            { value: "feiras_locais", label: "Feiras Locais" },
            { value: "mercados_privados", label: "Mercados Privados" },
            { value: "varejo_informal", label: "Varejo/Informal" },
            { value: "export_intermunicipal", label: "Export. Intermunicipal" },
            { value: "export_interestadual", label: "Export. Interestadual" },
            { value: "export_internacional", label: "Export. Internacional" }
        ]
    },
    {
        id: "mercados_fruticultura",
        label: "Mercados acessados - Fruticultura:",
        type: "checkbox-group",
        group: 11,
        showIf: (answers: any) => answers.cadeias_valor?.includes("fruticultura"),
        options: [
            { value: "pnae", label: "PNAE" },
            { value: "paa", label: "PAA" },
            { value: "feiras_locais", label: "Feiras Locais" },
            { value: "mercados_privados", label: "Mercados Privados" },
            { value: "varejo_informal", label: "Varejo/Informal" },
            { value: "export_intermunicipal", label: "Export. Intermunicipal" },
            { value: "export_interestadual", label: "Export. Interestadual" },
            { value: "export_internacional", label: "Export. Internacional" }
        ]
    },
    {
        id: "mercados_horticultura",
        label: "Mercados acessados - Horticultura:",
        type: "checkbox-group",
        group: 11,
        showIf: (answers: any) => answers.cadeias_valor?.includes("horticultura"),
        options: [
            { value: "pnae", label: "PNAE" },
            { value: "paa", label: "PAA" },
            { value: "feiras_locais", label: "Feiras Locais" },
            { value: "mercados_privados", label: "Mercados Privados" },
            { value: "varejo_informal", label: "Varejo/Informal" },
            { value: "export_intermunicipal", label: "Export. Intermunicipal" },
            { value: "export_interestadual", label: "Export. Interestadual" },
            { value: "export_internacional", label: "Export. Internacional" }
        ]
    },

    // Pergunta 12 - Políticas públicas
    {
        id: "politicas_publicas",
        label: "O proponente executa políticas públicas de apoio à agricultura familiar:",
        type: "radio",
        questionNumber: 12,
        group: 12,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },
    {
        id: "quais_politicas",
        label: "Citar quais políticas públicas",
        type: "textarea",
        group: 12,
        showIf: (answers: any) => answers.politicas_publicas === "sim"
    },

    // Pergunta 13 - Profissionais
    {
        id: "possui_profissionais",
        label: "O proponente possui quadro de profissionais que atuam junto aos agricultores familiares:",
        type: "radio",
        questionNumber: 13,
        group: 13,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },
    {
        id: "tipos_profissionais",
        label: "Selecione os tipos de profissionais:",
        type: "checkbox-group",
        group: 13,
        showIf: (answers: any) => answers.possui_profissionais === "sim",
        options: [
            { value: "gestor", label: "Gestor (Secretário ou Presidente de OSCs)" },
            { value: "engenheiro_agronomo", label: "Engenheiro Agrônomo/Áreas afins" },
            { value: "medico_veterinario", label: "Médico Veterinário" },
            { value: "engenheiro_florestal", label: "Engenheiro Florestal/Áreas afins" },
            { value: "tecnico_agricola", label: "Técnico Agrícola/Agropecuário" },
            { value: "diretor_tecnico", label: "Diretor Técnico" },
            { value: "assistente_social", label: "Assistente Social" },
            { value: "motorista", label: "Motorista" },
            { value: "administrativo", label: "Administrativo" },
            { value: "operador_maquina", label: "Operador de Máquina" },
            { value: "outro_profissional", label: "Outro" }
        ]
    },
    {
        id: "qtd_engenheiro_agronomo",
        label: "Quantidade de Engenheiro Agrônomo/Áreas afins",
        type: "number",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("engenheiro_agronomo")
    },
    {
        id: "instituicao_engenheiro_agronomo",
        label: "Instituição de origem do servidor - Engenheiro Agrônomo",
        type: "text",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("engenheiro_agronomo")
    },
    {
        id: "qtd_medico_veterinario",
        label: "Quantidade de Médico Veterinário",
        type: "number",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("medico_veterinario")
    },
    {
        id: "instituicao_medico_veterinario",
        label: "Instituição de origem do servidor - Médico Veterinário",
        type: "text",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("medico_veterinario")
    },
    {
        id: "qtd_engenheiro_florestal",
        label: "Quantidade de Engenheiro Florestal/Áreas afins",
        type: "number",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("engenheiro_florestal")
    },
    {
        id: "instituicao_engenheiro_florestal",
        label: "Instituição de origem do servidor - Engenheiro Florestal",
        type: "text",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("engenheiro_florestal")
    },
    {
        id: "qtd_tecnico_agricola",
        label: "Quantidade de Técnico Agrícola/Agropecuário",
        type: "number",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("tecnico_agricola")
    },
    {
        id: "instituicao_tecnico_agricola",
        label: "Instituição de origem do servidor - Técnico Agrícola",
        type: "text",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("tecnico_agricola")
    },
    {
        id: "qtd_diretor_tecnico",
        label: "Quantidade de Diretor Técnico",
        type: "number",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("diretor_tecnico")
    },
    {
        id: "instituicao_diretor_tecnico",
        label: "Instituição de origem do servidor - Diretor Técnico",
        type: "text",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("diretor_tecnico")
    },
    {
        id: "qtd_assistente_social",
        label: "Quantidade de Assistente Social",
        type: "number",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("assistente_social")
    },
    {
        id: "instituicao_assistente_social",
        label: "Instituição de origem do servidor - Assistente Social",
        type: "text",
        group: 13,
        showIf: (answers: any) => answers.tipos_profissionais?.includes("assistente_social")
    },

    // Pergunta 14 - Principais dificuldades da proponente
    {
        id: "dificuldades_proponente",
        label: "Principais dificuldades da proponente:",
        type: "checkbox-group",
        questionNumber: 14,
        group: 14,
        options: [
            { value: "mecanizacao_agricola", label: "Mecanização agrícola compatível à demanda, para prestação de serviços aos agricultores familiares" },
            { value: "mecanizacao_infraestrutura", label: "Mecanização de infraestrutura para abertura, recuperação e manutenção de estradas vicinais" },
            { value: "mecanizacao_construcao", label: "Mecanização para construção de tanques de piscicultura, curvas de nível, entre outros" },
            { value: "veiculos_deslocamento", label: "Veículos para deslocamento dos profissionais (equipe técnica, operadores de máquinas, gestor, entre outros)" },
            { value: "veiculos_carga", label: "Veículos de carga para transporte produtos, insumos, máquinas, equipamentos e implementos" },
            { value: "veiculo_producao", label: "Veículo de carga adequado para transporte da produção dos produtores da agricultura familiar" },
            { value: "veiculo_agua", label: "Veículo adequado para transporte de água, para combater incêndios, transportar água para comunidades e famílias rurais quando necessário" },
            { value: "outras_dificuldades", label: "Outros" }
        ]
    },
    {
        id: "outras_dificuldades_descricao",
        label: "Descrever outras dificuldades existentes",
        type: "textarea",
        group: 14,
        showIf: (answers: any) => answers.dificuldades_proponente?.includes("outras_dificuldades")
    },

    // Pergunta 15 - Principais desafios dos agricultores
    {
        id: "desafios_agricultores",
        label: "Principais desafios enfrentados pelos agricultores familiares locais:",
        type: "checkbox-group",
        questionNumber: 15,
        group: 15,
        options: [
            { value: "acesso_assistencia_tecnica", label: "Acesso à assistência técnica" },
            { value: "acesso_propriedades", label: "Acesso às propriedades" },
            { value: "acesso_insumos", label: "Acesso à insumos como calcário, mudas, sêmen bovino, entre outros" },
            { value: "transporte_insumos_producao", label: "Transporte de insumos e produção" },
            { value: "irrigacao", label: "Irrigação" },
            { value: "equipamentos_leite", label: "Equipamentos adequados para armazenamento de leite in natura" },
            { value: "equipamentos_ordenha", label: "Equipamentos adequados para ordenhar as vacas leiteiras" },
            { value: "outros_desafios", label: "Outros" }
        ]
    },
    {
        id: "outros_desafios_descricao",
        label: "Descrever outros desafios existentes",
        type: "textarea",
        group: 15,
        showIf: (answers: any) => answers.desafios_agricultores?.includes("outros_desafios")
    },

    // Pergunta 16 - Capacidade da proponente
    {
        id: "capacidade_atendimento",
        label: "Qual a capacidade da proponente para atender as demandas da agricultura familiar:",
        type: "checkbox-group",
        questionNumber: 16,
        group: 16,
        options: [
            { value: "trator_75_80", label: "Trator 75/80 CV" },
            { value: "trator_100_110", label: "Trator 100/110 CV" },
            { value: "grade_aradora", label: "Grade aradora" },
            { value: "grade_niveladora", label: "Grade niveladora" },
            { value: "distribuidor_calcario", label: "Distribuidor de calcário" },
            { value: "carreta_agricola", label: "Carreta agrícola" },
            { value: "ensiladeria", label: "Ensiladeria" },
            { value: "colhedora_milho", label: "Colhedora de milho" },
            { value: "plantadeira_graos", label: "Plantadeira de grãos" },
            { value: "plantadeira_mandioca", label: "Plantadeira de rama de mandioca" },
            { value: "plantadeira_abacaxi", label: "Plantadeira de abacaxi" },
            { value: "rocadeira_hidraulica", label: "Roçadeira hidráulica" },
            { value: "veiculo", label: "Veículo" },
            { value: "caminhao_bau", label: "Caminhão baú" },
            { value: "caminhao_bau_refrigerado", label: "Caminhão baú refrigerado" },
            { value: "caminhao_pipa", label: "Caminhão pipa" },
            { value: "caminhao_truck_basculante", label: "Caminhão truck basculante" },
            { value: "caminhao_cavalo_basculante", label: "Caminhão cavalo mecânico com semirreboque basculante" },
            { value: "caminhao_cavalo_prancha", label: "Caminhão cavalo mecânico com semirreboque prancha" },
            { value: "escavadeira_hidraulica", label: "Escavadeira hidráulica" },
            { value: "motoniveladora", label: "Motoniveladora" },
            { value: "pa_carregadeira", label: "Pá carregadeira" },
            { value: "retroescavadeira", label: "Retroescavadeira" },
            { value: "rolo_compactador", label: "Rolo compactador" },
            { value: "outros_equipamentos", label: "Outros" }
        ]
    },

    // Pergunta 17 - Público agricultura familiar
    {
        id: "publico_agricultura_familiar",
        label: "O público a ser atendido com os insumos solicitados serão da agricultura familiar:",
        type: "radio",
        questionNumber: 17,
        group: 17,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },

    // Pergunta 18 - Lista de produtores de mudas
    {
        id: "lista_produtores_mudas",
        label: "LISTA DE PRODUTORES – SOLICITAÇÃO DE MUDAS – SEAF/MT",
        type: "seedling-producer-list",
        questionNumber: 18,
        group: 18,
        required: true
    },

    // Pergunta 19 - Compromisso de relatório
    {
        id: "compromisso_relatorio",
        label: "Comprometemo-nos a enviar à Secretaria de Estado de Agricultura Familiar de Mato Grosso – SEAF, um Relatório de Prestação de Contas emitido por um responsável técnico, preferencialmente da EMPAER, após o recebimento e aplicação do insumo solicitado, que deverá ocorrer no máximo em 90 dias após a retirada das mudas.",
        type: "checkbox",
        questionNumber: 19,
        group: 19,
        required: true
    },

    // Pergunta 20 - Declaração
    {
        id: "declaracao_veracidade_mudas",
        label: "Declaramos, sob as penas da lei, a veracidade das informações contidas neste PROJETO BÁSICO e assumimos o compromisso de executar os serviços e fornecer os insumos propostos em estrita conformidade com as normas legais vigentes. Além disso, estamos plenamente cientes de que as mudas solicitadas não incluem frete, responsabilizando-nos integralmente pelos custos de transporte e distribuição do insumo. Comprometemo-nos também a utilizar o insumo exclusivamente para atender aos objetivos da Agricultura Familiar, assegurando que dispomos da capacidade técnica e operacional necessária para a plena execução deste projeto. Adicionalmente, comprometemo-nos a realizar a prestação de contas de todas as atividades executadas, garantindo total transparência e cumprimento das obrigações estabelecidas.",
        type: "checkbox",
        questionNumber: 20,
        group: 20,
        required: true
    },

    // Pergunta 21 - Local e Data
    {
        id: "local_proposta",
        label: "Local",
        type: "text",
        questionNumber: 21,
        group: 21,
        required: true,
        columnClass: "col-md-6"
    },
    {
        id: "data_proposta",
        label: "Data",
        type: "date",
        group: 21,
        required: true,
        columnClass: "col-md-6"
    },

    // Pergunta 22 - Assinaturas
    {
        id: "responsavel_tecnico",
        label: "Responsável técnico",
        type: "text",
        questionNumber: 22,
        group: 22,
        required: true,
        columnClass: "col-md-6"
    },
    {
        id: "autoridade_maxima",
        label: "Autoridade máxima do órgão/entidade",
        type: "text",
        group: 22,
        required: true,
        columnClass: "col-md-6"
    }
];

