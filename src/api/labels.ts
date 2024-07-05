
import axios from 'axios';

const BASE_URL = 'https://nebimv3api.com';

export const printLabel = async (labelData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/labels/print`, labelData);
    return response.data;
  } catch (error) {
    console.error('Error printing label:', error);
    throw error;
  }
};
