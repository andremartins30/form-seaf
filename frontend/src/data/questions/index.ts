import { defaultQuestions } from './default';
import { calcarioQuestions } from './calcario';
import { mudasQuestions } from './mudas';

// Registry de formulários por formType
const questionsByFormType: Record<string, any[]> = {
    'default': defaultQuestions,
    'calcario': calcarioQuestions,
    'mudas': mudasQuestions
};

/**
 * Retorna o conjunto de perguntas baseado no formType
 * @param formType - Tipo de formulário ('default', 'calcario', 'mudas')
 * @returns Array de perguntas do formulário
 */
export function getQuestionsByFormType(formType: string = 'default'): any[] {
    return questionsByFormType[formType] || questionsByFormType.default;
}

// Exportar tudo para compatibilidade
export { defaultQuestions, calcarioQuestions, mudasQuestions };
