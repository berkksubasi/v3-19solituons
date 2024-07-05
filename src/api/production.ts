// src/api/production.ts

// Üretim planlama
export const getProductionPlans = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/production-plans');
    
    // Dummy data
    return [
      { id: '1', name: 'Plan 1', status: 'Tamamlandı' },
      { id: '2', name: 'Plan 2', status: 'Devam Ediyor' },
    ];
  };
  
  // Malzeme ihtiyaç planlama (MRP)
  export const getMaterialRequirements = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/material-requirements');
    
    // Dummy data
    return [
      { id: '1', material: 'Hammadde 1', quantity: '1000' },
      { id: '2', material: 'Hammadde 2', quantity: '500' },
    ];
  };
  
  // Kalite kontrol
  export const getQualityControlReports = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/quality-control-reports');
    
    // Dummy data
    return [
      { id: '1', product: 'Ürün 1', result: 'Geçti' },
      { id: '2', product: 'Ürün 2', result: 'Kaldı' },
    ];
  };
  