// src/api/purchasing.ts

// Sipariş oluşturma
export const createOrder = async (orderData: any) => {
  // Burada gerçek API çağrısı yapılacak
  // return await api.post('/orders', orderData);
  
  // Dummy response
  return {
    success: true,
    message: 'Sipariş başarılı bir şekilde oluşturuldu',
  };
};

// Tedarikçileri sorgulama
export const getSuppliers = async () => {
  // Burada gerçek API çağrısı yapılacak
  // return await api.get('/suppliers');
  
  // Dummy data
  return [
    { id: '1', name: 'Tedarikçi A', performance: 'İyi' },
    { id: '2', name: 'Tedarikçi B', performance: 'Orta' },
  ];
};

// Fiyat ve iskonto sorgulama
export const getPricingAndDiscounts = async () => {
  // Burada gerçek API çağrısı yapılacak
  // return await api.get('/pricing-discounts');
  
  // Dummy data
  return [
    { id: '1', product: 'Ürün A', price: '100 TL', discount: '10%' },
    { id: '2', product: 'Ürün B', price: '200 TL', discount: '15%' },
  ];
};
