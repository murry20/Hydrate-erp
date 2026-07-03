export const getDashboardData = async (req, res) => {
    res.json({
        totalSales: 4580.0,
        pendingOrders: 12,
        completedOrders: 45,
        topRegions: [
            { region: 'ZONA_SUL', count: 25 },
            { region: 'CENTRO', count: 15 },
            { region: 'ZONA_NORTE', count: 10 }
        ]
    });
};

export default { getDashboardData };
