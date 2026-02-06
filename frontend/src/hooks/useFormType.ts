import { useState, useEffect, useRef } from 'react';

interface CategoriesData {
    categoryOptions: Array<{ value: string; label: string; formType: string }>;
    itemsMap: Record<string, Array<{ value: string; label: string }>>;
    communityTypeOptions: Array<{ value: string; label: string }>;
}

interface UseFormTypeReturn {
    formType: string;
    isChanging: boolean;
}

/**
 * Hook para detectar mudanças de formType quando categoria muda
 * Exibe confirmação antes de trocar e limpar dados
 */
export function useFormType(
    selectedCategory: string | undefined,
    categoriesData: CategoriesData | null,
    onFormTypeChange?: (newFormType: string) => void
): UseFormTypeReturn {
    const [formType, setFormType] = useState<string>('default');
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const previousCategoryRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (!categoriesData || !selectedCategory) {
            return;
        }

        // Buscar o formType da categoria selecionada
        const categoryOption = categoriesData.categoryOptions.find(
            cat => cat.value === selectedCategory
        );

        const newFormType = categoryOption?.formType || 'default';

        // Detectar mudança de categoria
        const categoryChanged = previousCategoryRef.current !== selectedCategory;
        const formTypeChanged = formType !== newFormType;

        if (categoryChanged && formTypeChanged && previousCategoryRef.current !== undefined) {
            setIsChanging(true);

            // Exibir confirmação ao usuário
            const confirmChange = window.confirm(
                'Ao mudar de categoria, todas as respostas do formulário serão perdidas, exceto os dados de contato (nome, CNPJ, município, telefones e e-mail).\n\nDeseja continuar?'
            );

            if (confirmChange) {
                setFormType(newFormType);
                onFormTypeChange?.(newFormType);
            } else {
                // Usuário cancelou a troca - não fazer nada
                // A categoria permanece mas o formType não muda
            }

            setIsChanging(false);
        } else if (!categoryChanged && formTypeChanged) {
            // Primeira seleção de categoria ou carregamento inicial
            setFormType(newFormType);
        }

        previousCategoryRef.current = selectedCategory;
    }, [selectedCategory, categoriesData, formType, onFormTypeChange]);

    return {
        formType,
        isChanging
    };
}
