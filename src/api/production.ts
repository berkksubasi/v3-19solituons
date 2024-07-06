import api from ".";


// Üretim planlama
export const getProductionPlans = async () => {
  try {
    const response = await api.get('/production-plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching production plans:', error);
    throw error;
  }
};

// Malzeme ihtiyaç planlama (MRP)
export const getMaterialRequirements = async () => {
  try {
    const response = await api.get('/material-requirements');
    return response.data;
  } catch (error) {
    console.error('Error fetching material requirements:', error);
    throw error;
  }
};

// Kalite kontrol
export const getQualityControlReports = async () => {
  try {
    const response = await api.get('/quality-control-reports');
    return response.data;
  } catch (error) {
    console.error('Error fetching quality control reports:', error);
    throw error;
  }
};
