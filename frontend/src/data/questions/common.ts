// Perguntas comuns a todos os formulários (grupos 1-6: informações de contato)
export const commonQuestions = [
    {
        id: "nome",
        label: "Nome do proponente",
        type: "text",
        required: true,
        questionNumber: 1,
        group: 1
    },
    {
        id: "cnpj",
        label: "CNPJ",
        type: "text",
        required: true,
        questionNumber: 2,
        group: 2
    },
    {
        id: "municipio",
        label: "Município",
        type: "text",
        required: true,
        questionNumber: 3,
        group: 3
    },
    {
        id: "telefone1",
        label: "Telefone para contato 1",
        type: "text",
        questionNumber: 4,
        group: 4
    },
    {
        id: "telefone2",
        label: "Telefone para contato 2",
        type: "text",
        questionNumber: 5,
        group: 5
    },
    {
        id: "email",
        label: "E-mail",
        type: "text",
        questionNumber: 6,
        group: 6
    }
];
