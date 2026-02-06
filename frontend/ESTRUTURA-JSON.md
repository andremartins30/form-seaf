# Estrutura do JSON do Formulário

Este documento descreve a estrutura do JSON gerado pelo formulário após formatação e tradução.

## Transformação Aplicada

A função `formatFormData()` em `src/utils/formatFormData.ts` realiza as seguintes transformações:

1. **Organização por seções lógicas** - Agrupa campos relacionados
2. **Tradução de valores** - Converte códigos em português legível
3. **Tipagem de dados** - Números convertidos corretamente
4. **Remoção de campos vazios** - Limpa campos null/undefined/vazios

## Estrutura do JSON

### 1. Informações de Contato (Perguntas 1-6)
```json
"informacoes_contato": {
  "nome_proponente": "string",
  "cnpj": "string",
  "municipio": "string",
  "telefone_1": "string",
  "telefone_2": "string",
  "email": "string"
}
```

### 2. Tipo de Formulário e Solicitação (Pergunta 7)
```json
"tipo_formulario": "Padrão | Calcário | Mudas",
"solicitacao": {
  "categoria": "string (nome da categoria)",
  "item": "string (item selecionado)"
}
```

### 3. Agricultores Familiares (Pergunta 8)
```json
"agricultores_familiares": {
  "possui": "Sim | Não",
  "quantidade_familias": number
}
```

### 4. Importância da Agricultura Familiar (Pergunta 9)
```json
"importancia_agricultura_familiar": "Alto | Médio | Baixo | Inexistente"
```

### 5. Organização em Comunidades (Pergunta 10)
```json
"organizacao_comunidades": {
  "organizados": "Sim | Não",
  "tipos_comunidades": [
    "Comunidades tradicionais",
    "Comunidades indígenas",
    "Quilombolas",
    "Assentamentos",
    "Associações de produtores",
    "Comunidades outras",
    "Cooperativas de produtores"
  ],
  "quantidades": {
    "comunidades_tradicionais": number,
    "comunidades_indigenas": number,
    "quilombolas": number,
    "assentamentos": number,
    "associacoes": number,
    "comunidades_outras": number,
    "cooperativas": number
  }
}
```

### 6. Cadeias de Valor Principais (Pergunta 11)
```json
"cadeias_valor_principais": {
  "tipos": [
    "Bovinocultura de leite",
    "Bovinocultura de corte",
    "Avicultura",
    "Piscicultura",
    "Agroindústria",
    "Fruticultura",
    "Horticultura",
    "Café",
    "Cacau",
    "Extrativismo",
    "Outras"
  ],
  "detalhes": [
    {
      "tipo": "Fruticultura",
      "produto": "Banana",
      "mercados": [
        "Consumo local (familiar)",
        "Município",
        "Região",
        "Estado",
        "País",
        "Exportação"
      ]
    }
  ]
}
```

### 7. Políticas Públicas (Pergunta 12)
```json
"politicas_publicas": {
  "executa": "Sim | Não",
  "quais": "string (descrição das políticas)"
}
```

### 8. Profissionais (Pergunta 13)
```json
"profissionais": {
  "possui_quadro": "Sim | Não",
  "tipos": [
    "Gestor (Secretário ou Presidente de OSCs)",
    "Engenheiro Agrônomo/Áreas afins",
    "Médico Veterinário",
    "Engenheiro Florestal/Áreas afins",
    "Técnico Agrícola/Agropecuário",
    "Diretor Técnico",
    "Assistente Social",
    "Motorista",
    "Administrativo",
    "Operador de Máquina",
    "Outro"
  ],
  "detalhes": [
    {
      "tipo": "Técnico Agrícola/Agropecuário",
      "instituicao": "string"
    }
  ]
}
```

### 9. Dificuldades do Proponente (Pergunta 14)
```json
"dificuldades_proponente": {
  "principais": [
    "Mecanização agrícola compatível à demanda",
    "Mecanização de infraestrutura para estradas vicinais",
    "Mecanização para construção de tanques, curvas de nível",
    "Veículos para deslocamento dos profissionais",
    "Veículos de carga para transporte",
    "Veículo para transporte da produção",
    "Veículo para transporte de água",
    "Outras dificuldades"
  ],
  "outras_descricao": "string"
}
```

### 10. Desafios dos Agricultores (Pergunta 15)
```json
"desafios_agricultores": {
  "principais": [
    "Acesso à assistência técnica",
    "Acesso às propriedades",
    "Acesso à insumos (calcário, mudas, sêmen bovino)",
    "Transporte de insumos e produção",
    "Irrigação",
    "Equipamentos para armazenamento de leite",
    "Equipamentos para ordenhar vacas",
    "Acesso à água em períodos de seca",
    "Outros desafios"
  ],
  "outros_descricao": "string"
}
```

### 11. Capacidade de Atendimento (Pergunta 16)
```json
"capacidade_atendimento": {
  "equipamentos": [
    "Trator 75/80 CV",
    "Distribuidor de calcário",
    "Outros equipamentos"
  ],
  "detalhes": [
    {
      "tipo": "Distribuidor de calcário",
      "nome": null,
      "quantidade": 1
    },
    {
      "tipo": "Outros equipamentos",
      "nome": "Colheitadeira",
      "quantidade": 1
    }
  ]
}
```

### 12. Público Agricultura Familiar (Pergunta 17)
```json
"publico_agricultura_familiar": "Sim | Não"
```

### 13. Lista de Produtores (Formulário de Mudas)
```json
"lista_produtores": [
  {
    "nome": "string",
    "cpf": "string",
    "area_hectares": number,
    "localizacao": "string"
  }
]
```

### 14. Lista de Produtores de Mudas (Formulário de Mudas)
```json
"lista_produtores_mudas": [
  {
    "nome": "string",
    "cpf": "string",
    "especie": "string",
    "quantidade_mudas": number
  }
]
```

### 15. Compromissos e Responsabilidades (Perguntas 20-24)
```json
"compromissos": {
  "gestao_administrativa_operacional": "Sim | Não",
  "local_armazenamento_adequado": "Sim | Não",
  "responsabiliza_custos": {
    "resposta": "Sim | Não | Parcial",
    "descricao": "string"
  },
  "monitoramento_atividades": {
    "resposta": "Sim | Não | Parcial",
    "descricao": "string"
  },
  "relatorio_anual": {
    "resposta": "Sim | Não | Parcial",
    "descricao": "string"
  }
}
```

### 16. Declaração de Veracidade (Pergunta 25)
```json
"declaracao_veracidade": true | false
```

### 17. Local e Data da Proposta (Pergunta 26)
```json
"local_data_proposta": {
  "local": "string",
  "data": "YYYY-MM-DD"
}
```

### 18. Responsáveis (Pergunta 27)
```json
"responsaveis": {
  "responsavel_tecnico": "string",
  "gestor": "string"
}
```

## Exemplo Completo

Veja o arquivo `exemplo-json-formatado.json` para um exemplo completo de JSON formatado.

## Uso no Código

```typescript
import { formatFormData } from '../utils/formatFormData';

// Dados brutos do formulário
const rawData = {
  formType: 'default',
  nome: 'teste',
  categoria: 'mecanizacao',
  // ... outros campos
};

// Formatar e traduzir
const formattedData = formatFormData(rawData);

// Enviar para API ou exibir
console.log(JSON.stringify(formattedData, null, 2));
```

## Validações no Backend

Ao receber esse JSON no backend, recomenda-se:

1. Validar estrutura com Zod/Yup
2. Verificar campos obrigatórios por tipo de formulário
3. Validar tipos de dados (números, datas, booleanos)
4. Sanitizar strings antes de persistir
