import { commonQuestions } from './common';

// Formulário padrão completo (usado pela maioria das categorias)
export const defaultQuestions = [
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

    {
        id: "importancia_agricultura",
        label: "Grau de importância da agricultura familiar",
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

    {
        id: "organizados",
        label: "Agricultores organizados em comunidades?",
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
        id: "qtd_associacoes",
        label: "Quantidade de associações de produtores",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("associacoes")
    },
    {
        id: "qtd_cooperativas",
        label: "Quantidade de cooperativas de produtores",
        type: "number",
        group: 10,
        showIf: (answers: any) => answers.tipos_comunidades?.includes("cooperativas")
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
        id: "cadeias_valor",
        label: "Quais as principais cadeias de valor?",
        type: "checkbox-group",
        questionNumber: 11,
        group: 11,
        options: [
            { value: "leite", label: "Bovinocultura de leite" },
            { value: "corte", label: "Bovinocultura de corte" },
            { value: "avicultura", label: "Avicultura" },
            { value: "piscicultura", label: "Piscicultura" },
            { value: "agroindustria", label: "Agroindústria" },
            { value: "fruticultura", label: "Fruticultura (banana, cacau, café, laranja, limão, maracujá, outros)" },
            { value: "horticultura", label: "Horticultura (alface, tomate, repolho, cheiro verde, rúcula)" },
            { value: "cafe", label: "Café" },
            { value: "cacau", label: "Cacau" },
            { value: "extrativismo", label: "Extrativismo" },
            { value: "outras", label: "Outras" }
        ]
    },

    {
        id: "politicas_publicas",
        label: "O proponente executa políticas públicas de apoio à agricultura familiar?",
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

    {
        id: "possui_profissionais",
        label: "O proponente possui quadro de profissionais que atuam junto aos agricultores familiares?",
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


    // Pergunta 14 - Principais dificuldades da proponente
    {
        id: "dificuldades_proponente",
        label: "Principais dificuldades da proponente",
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
        label: "Principais desafios enfrentados pelos agricultores familiares locais",
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
            { value: "acesso_agua_seca", label: "Em anos de seca extrema, os produtores têm dificuldade em acesso à água, para consumo nos afazeres doméstico e dos animais" },
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
        label: "Qual a capacidade da proponente para atender as demandas da agricultura familiar",
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
        label: "O público a ser atendido com os bens solicitados serão da agricultura familiar?",
        type: "radio",
        questionNumber: 17,
        group: 17,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },

    // Pergunta 18 - Identificação do perfil do público beneficiário
    {
        id: "beneficiarios",
        label: "Identificação do perfil do público beneficiário, local de execução, e as cadeias de valores",
        type: "beneficiary-list",
        questionNumber: 18,
        group: 18
    },

    // Pergunta 19 - Metas e cronograma de execução
    {
        id: "metas_cronograma",
        label: "Metas e cronograma de execução",
        type: "radio",
        questionNumber: 19,
        group: 19,
        options: [
            {
                value: "demanda_espontanea",
                label: "A utilização do bem será por ordem de demanda espontânea, registrada pelos agricultores familiares, de acordo a sazonalidade das culturas e a capacidade de atendimento disponível, respeitando critérios técnicos e de eficiência operacional estabelecidos pelo proponente."
            },
            {
                value: "nao_se_aplica",
                label: "Tendo em vista que o presente processo se refere à doação de máquinas pesadas ou veículos utilitários, o item 'Metas e Cronograma de Execução' do Plano de Uso não se aplica devido às finalidades."
            },
            {
                value: "outro",
                label: "Outro"
            }
        ]
    },
    {
        id: "metas_cronograma_outro",
        label: "Descreva as metas e cronograma de execução",
        type: "textarea",
        group: 19,
        showIf: (answers: any) => answers.metas_cronograma === "outro"
    },

    // Pergunta 20 - Compromisso de gestão
    {
        id: "compromisso_gestao",
        label: "O proponente se compromete pela gestão administrativa e operacional do(s) bem(ns) requerido?",
        type: "radio",
        questionNumber: 20,
        group: 20,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },

    // Pergunta 21 - Local de armazenamento
    {
        id: "local_armazenamento",
        label: "O proponente possui local adequado e seguro para armazenamento do(s) bem(ns) requerido?",
        type: "radio",
        questionNumber: 21,
        group: 21,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" }
        ]
    },
    {
        id: "responsabiliza_custos",
        label: "O proponente se responsabiliza pelos custos de manutenção (reposição de peças, revisões, outros), operacionais do uso (combustível, troca de óleo, outros) e operador capacitado, assegurando o funcionamento adequado do(s) bem(ns)?",
        type: "radio",
        questionNumber: 22,
        group: 22,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
            { value: "parcial", label: "Parcial" }
        ]
    },
    {
        id: "responsabiliza_custos_descricao",
        label: "Descrever quais? E como?",
        type: "textarea",
        group: 22,
        showIf: (answers: any) => answers.responsabiliza_custos === "parcial"
    },
    {
        id: "monitoramento_atividades",
        label: "O proponente realizará monitoramento das atividades desenvolvidas pelo bem requerido, contendo informações sobre as áreas beneficiadas, operação executada e o agricultor atendido?",
        type: "radio",
        questionNumber: 23,
        group: 23,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
            { value: "parcial", label: "Parcial" }
        ]
    },
    {
        id: "monitoramento_atividades_descricao",
        label: "Descrever o que será feito? E como?",
        type: "textarea",
        group: 23,
        showIf: (answers: any) => answers.monitoramento_atividades === "parcial"
    },
    {
        id: "relatorio_anual",
        label: "O proponente se compromete em apresentar anualmente relatório consolidado, contendo os registros operacionais, evidências da utilização do(s) bem(ns) doado (como fotos com georeferenciamento), relação de produtores atendidos, as operações realizadas, a área mecanizada e a eficiência na produtividade das unidades familiares?",
        type: "radio",
        questionNumber: 24,
        group: 24,
        options: [
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
            { value: "parcial", label: "Parcial" }
        ]
    },
    {
        id: "relatorio_anual_descricao",
        label: "Descrever como será feito o relatório e quais informações serão disponibilizadas",
        type: "textarea",
        group: 24,
        showIf: (answers: any) => answers.relatorio_anual === "parcial"
    },

    // Pergunta 25 - Declaração
    {
        id: "declaracao_veracidade",
        label: "Declaramos, conforme as normativas legais em vigor, que elaboramos a presente proposta, assumindo integral responsabilidade pela veracidade, precisão e atualização das informações e documentos que a acompanha, assegurando sua autenticidade, regularidade e fidedignidade das comprovações apresentadas.",
        type: "checkbox",
        questionNumber: 25,
        group: 25,
        required: true
    },

    // Pergunta 26 - Local e Data
    {
        id: "local_proposta",
        label: "Local",
        type: "text",
        questionNumber: 26,
        group: 26,
        required: true,
        columnClass: "col-md-4"
    },
    {
        id: "data_proposta",
        label: "Data",
        type: "date",
        group: 26,
        required: true,
        columnClass: "col-md-3"
    },

    // Pergunta 27 - Responsáveis
    {
        id: "responsavel_tecnico",
        label: "Responsável técnico",
        type: "text",
        questionNumber: 27,
        group: 27,
        required: true,
        columnClass: "col-md-4"
    },
    {
        id: "gestor",
        label: "Nome do Gestor",
        type: "text",
        group: 27,
        required: true,
        columnClass: "col-md-4"
    }
];
