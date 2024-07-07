// src/api/apiClient.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const updatePrice = async (productId, newPrice) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/products/update-price`, { id: productId, newPrice });
    return response.data;
  } catch (error) {
    console.error('Error updating price:', error);
    throw error;
  }
};
