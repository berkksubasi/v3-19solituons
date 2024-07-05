// src/api/finance.ts

// Gelir ve gider sorgulama
export const getIncomeAndExpenses = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/income-expenses');
    
    // Dummy data
    return [
      { id: '1', type: 'Gelir', amount: '10000 TL', description: 'Satış Geliri' },
      { id: '2', type: 'Gider', amount: '2000 TL', description: 'Kira Gideri' },
    ];
  };
  
  // Fatura ve ödeme sorgulama
  export const getInvoicesAndPayments = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/invoices-payments');
    
    // Dummy data
    return [
      { id: '1', type: 'Fatura', amount: '5000 TL', status: 'Ödendi' },
      { id: '2', type: 'Ödeme', amount: '3000 TL', status: 'Beklemede' },
    ];
  };
  
  // Bütçe sorgulama
  export const getBudget = async () => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get('/budget');
    
    // Dummy data
    return { id: '1', totalBudget: '50000 TL', spent: '20000 TL', remaining: '30000 TL' };
  };
  