
import axios from 'axios';

const BASE_URL = 'https://nebimv3api.com';

export const fetchPrices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/prices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prices data:', error);
    throw error;
  }
};
