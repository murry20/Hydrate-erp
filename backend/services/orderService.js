const regionTaxes = {
    ZONA_NORTE: 5.0,
    ZONA_SUL: 8.0,
    ZONA_LESTE: 6.0,
    ZONA_OESTE: 7.0,
    CENTRO: 3.0
};

export const calculateOrderOnly = async (items, region) => {
    const deliveryFee = regionTaxes[region] || 10.0;
    let itemsTotal = 0;
    const processedItems = items.map((item) => {
        const subtotal = item.quantity * item.unitPrice;
        itemsTotal += subtotal;
        return { ...item, subtotal };
    });
    return {
        itemsTotal,
        deliveryFee,
        totalAmount: itemsTotal + deliveryFee,
        processedItems
    };
};

export const calculateAndCreateOrder = async (customerId, items, region) => {
    const calc = await calculateOrderOnly(items, region);

    const mockOrder = {
        id: Math.floor(Math.random() * 10000),
        customerId,
        status: 'PENDING',
        itemsTotal: calc.itemsTotal,
        deliveryFee: calc.deliveryFee,
        totalAmount: calc.totalAmount,
        region,
        items: calc.processedItems,
        createdAt: new Date().toISOString()
    };
    return mockOrder;
};

export default { calculateOrderOnly, calculateAndCreateOrder };
