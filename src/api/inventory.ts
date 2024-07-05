// src/api/inventory.ts

// Stok durumu sorgulama
export const getStockStatus = async (productId: string) => {
  // Burada gerçek API çağrısı yapılacak
  // return await api.get(`/stock/${productId}`);
  
  // Dummy data
  return {
    productId,
    quantity: 100,
    warehouseLocation: 'A1-B2',
  };
};

// Depo transfer işlemleri
export const transferStock = async (productId: string, quantity: number, fromWarehouse: string, toWarehouse: string) => {
  // Burada gerçek API çağrısı yapılacak
  // return await api.post('/transfer', { productId, quantity, fromWarehouse, toWarehouse });
  
  // Dummy response
  return {
    success: true,
    message: 'Transfer başarılı',
  };
};
