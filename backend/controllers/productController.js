// Mock DB until Supabase is connected
const products = [
    { id: 1, name: 'Garrafão Hydrate 20L', description: 'Garrafão Hydrate 20L (Retornável)', price: 12.0, stock_quantity: 450 },
    { id: 2, name: 'Garrafão Hydrate 10L', description: 'Garrafão Hydrate 10L (Retornável)', price: 9.0, stock_quantity: 200 },
    { id: 3, name: 'Caixa de Copos Hydrate 200ml', description: 'Caixa de Copos Hydrate 200ml (Fardo c/ 48 unidades)', price: 22.0, stock_quantity: 80 },
    { id: 4, name: 'Fardo de Água Hydrate 500ml', description: 'Fardo de Água Hydrate 500ml Descartável (c/ 12 unidades)', price: 14.5, stock_quantity: 150 }
];

export const getProducts = async (req, res) => {
    res.json(products);
};

export default { getProducts };
