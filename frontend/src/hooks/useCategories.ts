import { useEffect, useState } from 'react';

interface CategoryOption {
    value: string;
    label: string;
    formType: string;
}

interface ItemsMap {
    [key: string]: CategoryOption[];
}

interface CategoriesData {
    categoryOptions: CategoryOption[];
    itemsMap: ItemsMap;
    communityTypeOptions: CategoryOption[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useCategories() {
    const [data, setData] = useState<CategoriesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                setLoading(true);

                // Buscar categorias e tipos de comunidades em paralelo
                const [categoriesResponse, communityTypesResponse] = await Promise.all([
                    fetch(`${API_URL}/api/categories/form-data`),
                    fetch(`${API_URL}/api/community-types`)
                ]);

                if (!categoriesResponse.ok || !communityTypesResponse.ok) {
                    throw new Error('Erro ao buscar dados');
                }

                const categoriesResult = await categoriesResponse.json();
                const communityTypesResult = await communityTypesResponse.json();

                setData({
                    ...categoriesResult,
                    communityTypeOptions: communityTypesResult
                });
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
                console.error('Erro ao buscar dados:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return { data, loading, error };
}
