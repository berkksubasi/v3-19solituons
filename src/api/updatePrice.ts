
import axios from 'axios';

const BASE_URL = 'https://nebimv3api.com';

export const updatePrice = async (productId: string, newPrice: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/price/update`, { productId, newPrice });
    return response.data;
  } catch (error) {
    console.error('Error updating price:', error);
    throw error;
  }
};
