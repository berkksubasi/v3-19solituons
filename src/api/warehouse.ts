// src/api/warehouse.ts

// Depo bilgileri sorgulama
export const getWarehouseInfo = async (warehouseId: string) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get(`/warehouse/${warehouseId}`);
    
    // Dummy data
    return {
      warehouseId,
      location: 'A1',
      capacity: 1000,
      currentStock: 500,
    };
  };
  
  // Depo envanter kontrolü
  export const getWarehouseInventory = async (warehouseId: string) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get(`/warehouse/${warehouseId}/inventory`);
    
    // Dummy data
    return [
      { productId: '1', name: 'Pantolon', quantity: 100 },
      { productId: '2', name: 'Tunik', quantity: 200 },
      { productId: '3', name: 'Gömlek', quantity: 150 },
    ];
  };
  