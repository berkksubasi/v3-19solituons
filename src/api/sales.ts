// src/api/sales.ts

// Satış işlemi oluşturma
export const createSale = async (saleData: any) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.post('/sales', saleData);
    
    // Dummy response
    return {
      success: true,
      message: 'Satış başarılı',
    };
  };
  
  // Promosyonları sorgulama
  export const getPromotions = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/promotions');
    
    // Dummy data
    return [
      { id: '1', name: 'Yılbaşı İndirimi', discount: '20%' },
      { id: '2', name: 'Sezon Sonu İndirimi', discount: '30%' },
    ];
  };
  
  // Müşteri bilgilerini sorgulama
  export const getCustomerInfo = async (customerId: string) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get(`/customers/${customerId}`);
    
    // Dummy data
    return {
      customerId,
      name: 'Ahmet Yılmaz',
      loyaltyPoints: 150,
    };
  };
  