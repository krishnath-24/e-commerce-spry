export const fetchProducts = async (pageNum, pageSize) => {

    try {
        const products = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${(pageNum - 1) * pageSize}`);

        if (!products.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await products.json();
        return {data : data.products || [],
            total: data.total || 0,
        };
        
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}

export const fetchCategories = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
}