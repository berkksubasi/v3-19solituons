// src/api/reports.ts

// Örnek rapor verisi
export const getReportData = async (reportType: string) => {
    // Burada gerçek API çağrısı yapılacak
    // return await api.get(`/reports/${reportType}`);
    
    // Dummy data
    switch(reportType) {
      case 'sales':
        return [
          { id: '1', date: '2024-07-01', amount: 1000 },
          { id: '2', date: '2024-07-02', amount: 1500 },
        ];
      case 'inventory':
        return [
          { id: '1', item: 'Pantolon', stock: 50 },
          { id: '2', item: 'Tunik', stock: 20 },
        ];
      case 'finance':
        return [
          { id: '1', type: 'Income', amount: 2000 },
          { id: '2', type: 'Expense', amount: 500 },
        ];
      default:
        return [];
    }
  };
  